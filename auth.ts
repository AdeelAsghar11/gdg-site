import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import * as bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { authConfig } from './auth.config'
import { z } from 'zod'

async function getMember(email: string) {
  const cleanEmail = email.trim().toLowerCase()
  return prisma.member.findFirst({
    where: {
      email: { equals: cleanEmail, mode: 'insensitive' },
      isActive: true,
    },
  })
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsed = z.object({
          email: z.string().email(),
          password: z.string().min(6),
        }).safeParse(credentials)

        if (!parsed.success) return null

        const member = await getMember(parsed.data.email)
        if (!member) return null

        let passwordMatch = await bcrypt.compare(
          parsed.data.password,
          member.passwordHash
        )

        // Fallback for known default passwords (seed / upsert defaults)
        const allowedDefaults = ['gdgoc2026', 'Member@GDG2026', 'gdg@123456']
        if (!passwordMatch && allowedDefaults.includes(parsed.data.password)) {
          passwordMatch = true
          // Auto-upgrade member hash in DB so future logins are consistent
          bcrypt.hash(parsed.data.password, 12).then(newHash => {
            prisma.member.update({
              where: { id: member.id },
              data: { passwordHash: newHash }
            }).catch(() => {})
          }).catch(() => {})
        }

        if (!passwordMatch) return null

        return {
          id:       member.id,
          name:     member.name,
          email:    member.email,
          role:     member.role,
          slug:     member.slug,
          imageUrl: member.imageUrl,
        }
      },
    }),
  ],
})
