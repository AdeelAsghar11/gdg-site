'use client'

import React, { useState, useTransition, useActionState, useEffect } from 'react'
import { useFormStatus } from 'react-dom'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Trash2, Plus, Camera, Loader2, ArrowLeft } from 'lucide-react'
import { updateProfile, addSkill, removeSkill, addContribution, removeContribution, uploadAvatar, removeAvatar } from '@/app/actions/profile'

interface EditTabProps {
  member: any
  role: 'member' | 'core' | 'admin'
}

function SectionHeader({ title }: { title: string }) {
  return (
    <h3 style={{
      fontSize: '1.1rem', fontWeight: 800, marginBottom: 20,
      marginTop: 36, paddingBottom: 10, borderBottom: '1px solid #f0f0f0',
      color: '#202124', textTransform: 'uppercase', letterSpacing: '.04em'
    }}>
      {title}
    </h3>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label style={{
      fontSize: '0.75rem', fontWeight: 700,
      color: '#5F6368', display: 'block', marginBottom: 8,
      textTransform: 'uppercase', letterSpacing: '.04em'
    }}>
      {children}
    </label>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '12px 14px',
  border: '1px solid #dadce0', borderRadius: 10,
  fontSize: '0.95rem', boxSizing: 'border-box',
  fontFamily: 'inherit', outline: 'none'
}

export default function EditTab({ member, role }: EditTabProps) {
  const router = useRouter()
  const [result, dispatch, isPendingAction] = useActionState(updateProfile, undefined)
  const [isPending, startTransition] = useTransition()
  
  const [avatarUrl, setAvatarUrl] = useState<string | null>(member.imageUrl || null)
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false)
  const [photoFeedback, setPhotoFeedback] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const [newSkill, setNewSkill] = useState('')
  const [contriTitle, setContriTitle] = useState('')
  const [contriDesc, setContriDesc] = useState('')
  const [showContriForm, setShowContriForm] = useState(false)
  const [saved, setSaved] = useState(false)

  const isMember = role === 'member'

  useEffect(() => {
    if (result && result.includes('successfully')) {
      setSaved(true)
      const timer = setTimeout(() => setSaved(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [result])

  const handlePhotoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setPhotoFeedback({ type: 'error', text: 'Please choose an image file (PNG, JPG, or WEBP).' })
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setPhotoFeedback({ type: 'error', text: 'Image file must be under 5MB.' })
      return
    }

    setIsUploadingPhoto(true)
    setPhotoFeedback(null)

    const formData = new FormData()
    formData.append('avatar', file)

    try {
      const res = await uploadAvatar(formData)
      if (res.error) {
        setPhotoFeedback({ type: 'error', text: res.error })
      } else if (res.url) {
        setAvatarUrl(res.url)
        setPhotoFeedback({ type: 'success', text: 'Profile picture updated successfully!' })
        router.refresh()
        setTimeout(() => setPhotoFeedback(null), 4000)
      }
    } catch {
      setPhotoFeedback({ type: 'error', text: 'Failed to upload photo. Please try again.' })
    } finally {
      setIsUploadingPhoto(false)
      e.target.value = ''
    }
  }

  const handleRemovePhoto = async () => {
    if (!confirm('Are you sure you want to remove your profile picture?')) return
    setIsUploadingPhoto(true)
    setPhotoFeedback(null)
    try {
      const res = await removeAvatar()
      if (res?.error) {
        setPhotoFeedback({ type: 'error', text: res.error })
      } else {
        setAvatarUrl(null)
        setPhotoFeedback({ type: 'success', text: 'Profile picture removed.' })
        router.refresh()
        setTimeout(() => setPhotoFeedback(null), 4000)
      }
    } catch {
      setPhotoFeedback({ type: 'error', text: 'Failed to remove picture.' })
    } finally {
      setIsUploadingPhoto(false)
    }
  }

  const handleAddSkill = async () => {
    if (!newSkill.trim()) return
    startTransition(async () => {
      await addSkill(newSkill.trim())
      setNewSkill('')
    })
  }

  const handleRemoveSkill = async (skill: string) => {
    startTransition(async () => {
      await removeSkill(skill)
    })
  }

  const handleAddContribution = async () => {
    if (!contriTitle.trim()) return
    startTransition(async () => {
      await addContribution(contriTitle.trim(), contriDesc.trim())
      setContriTitle('')
      setContriDesc('')
      setShowContriForm(false)
    })
  }

  const handleRemoveContribution = async (id: string) => {
    startTransition(async () => {
      await removeContribution(id)
    })
  }

  return (
    <div style={{ maxWidth: 640 }}>
      <div style={{ marginBottom: 16 }}>
        <Link href="/dashboard/profile" style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          color: '#185FA5', fontSize: '0.875rem', fontWeight: 600,
          textDecoration: 'none'
        }}>
          <ArrowLeft size={16} /> Back to Profile
        </Link>
      </div>

      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 8, color: '#202124' }}>
        Edit Profile
      </h2>
      <p style={{ color: '#5F6368', marginBottom: 20, fontSize: '0.9rem' }}>
        Keep your information up to date to help other members and leadership find you.
      </p>

      {/* Section 0: Profile Picture */}
      <SectionHeader title="Profile Picture" />
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 24,
        padding: '20px 24px',
        background: '#f8f9fa',
        border: '1px solid #e8eaed',
        borderRadius: 14,
        marginBottom: 20,
        flexWrap: 'wrap'
      }}>
        <div style={{ position: 'relative', width: 92, height: 92, flexShrink: 0 }}>
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={member.name}
              style={{
                width: 92,
                height: 92,
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid #fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.12)'
              }}
            />
          ) : (
            <div style={{
              width: 92,
              height: 92,
              borderRadius: '50%',
              background: '#E8F0FE',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '2rem',
              color: '#185FA5',
              border: '3px solid #fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)'
            }}>
              {member.name.charAt(0)}
            </div>
          )}
          {isUploadingPhoto && (
            <div style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.75)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Loader2 size={24} color="#4285F4" style={{ animation: 'spin 1s linear infinite' }} />
            </div>
          )}
        </div>

        <div style={{ flex: 1, minWidth: 220 }}>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            <label style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: '#4285F4',
              color: '#fff',
              padding: '10px 18px',
              borderRadius: 8,
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: isUploadingPhoto ? 'not-allowed' : 'pointer',
              opacity: isUploadingPhoto ? 0.7 : 1,
              transition: 'background 0.2s',
            }}>
              <Camera size={16} />
              {isUploadingPhoto ? 'Uploading...' : 'Choose Photo'}
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp,image/jpg"
                onChange={handlePhotoSelect}
                disabled={isUploadingPhoto}
                style={{ display: 'none' }}
              />
            </label>

            {avatarUrl && (
              <button
                type="button"
                onClick={handleRemovePhoto}
                disabled={isUploadingPhoto}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  background: '#fff',
                  color: '#EA4335',
                  border: '1px solid #dadce0',
                  padding: '9px 16px',
                  borderRadius: 8,
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: isUploadingPhoto ? 'not-allowed' : 'pointer'
                }}
              >
                <Trash2 size={15} />
                Remove
              </button>
            )}
          </div>

          <p style={{ margin: '8px 0 0', fontSize: '0.78rem', color: '#5F6368' }}>
            JPG, PNG, or WEBP up to 5MB. Square photo recommended.
          </p>

          {photoFeedback && (
            <p style={{
              margin: '8px 0 0',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: photoFeedback.type === 'error' ? '#EA4335' : '#34A853'
            }}>
              {photoFeedback.type === 'error' ? '⚠ ' : '✓ '}
              {photoFeedback.text}
            </p>
          )}
        </div>
      </div>

      <form action={dispatch}>
        {/* Section 1: Basic Info */}
        <SectionHeader title="Basic Info" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
          <div>
            <Label>Full Name</Label>
            <input name="name" type="text" defaultValue={member.name} required style={inputStyle} />
          </div>
          <div>
            <Label>Tagline</Label>
            <input name="tagline" type="text" defaultValue={member.tagline || ''} placeholder="e.g. Fullstack Developer" style={inputStyle} />
          </div>
        </div>
        <div style={{ marginBottom: 20 }}>
          <Label>Bio</Label>
          <textarea name="bio" defaultValue={member.bio || ''} placeholder="Write a short bio..." rows={4} style={{ ...inputStyle, resize: 'vertical' }} />
        </div>

        {/* Section 2: Academic */}
        <SectionHeader title="Academic" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
          <div>
            <Label>Department</Label>
            <input name="department" type="text" defaultValue={member.department || ''} disabled={isMember} style={{ ...inputStyle, background: isMember ? '#f8f9fa' : '#fff' }} />
            {isMember && <p style={{ fontSize: '0.7rem', color: '#185FA5', marginTop: 4 }}>Contact Admin to change department</p>}
          </div>
          <div>
            <Label>Student ID</Label>
            <input name="studentId" type="text" defaultValue={member.studentId || ''} disabled={isMember} style={{ ...inputStyle, background: isMember ? '#f8f9fa' : '#fff' }} />
            {isMember && <p style={{ fontSize: '0.7rem', color: '#185FA5', marginTop: 4 }}>Contact Admin to change Student ID</p>}
          </div>
        </div>

        {/* Section 3: Social Links */}
        <SectionHeader title="Social Links" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
          <div>
            <Label>LinkedIn URL</Label>
            <input name="linkedin" type="url" defaultValue={member.linkedin || ''} style={inputStyle} />
          </div>
          <div>
            <Label>GitHub URL</Label>
            <input name="github" type="url" defaultValue={member.github || ''} style={inputStyle} />
          </div>
        </div>
        <div style={{ maxWidth: '50%' }}>
          <Label>Instagram URL</Label>
          <input name="instagram" type="url" defaultValue={member.instagram || ''} style={inputStyle} />
        </div>

        {saved && (
           <p style={{ color: '#34A853', fontSize: '0.9rem', fontWeight: 600, marginTop: 24, marginBottom: 0 }}>
             ✓ Profile updated successfully.
           </p>
        )}

        {result && !result.includes('successfully') && (
           <p style={{ color: '#EA4335', fontSize: '0.9rem', fontWeight: 600, marginTop: 24, marginBottom: 0 }}>
             ⚠ {result}
           </p>
        )}

        <button
          type="submit"
          disabled={isPendingAction}
          style={{
            background: '#34A853', color: '#fff', border: 'none',
            padding: '12px 32px', borderRadius: 8, fontWeight: 700,
            cursor: isPendingAction ? 'not-allowed' : 'pointer',
            opacity: isPendingAction ? 0.7 : 1, fontSize: '0.95rem',
            marginTop: 32, boxShadow: '0 4px 12px rgba(52, 168, 83, 0.2)'
          }}
        >
          {isPendingAction ? 'Saving...' : 'Save Changes'}
        </button>
      </form>

      {/* Section 4: Skills */}
      <SectionHeader title="Technical Expertise" />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
        {member.skills?.map((s: any) => (
          <span key={s.id} style={{
            background: '#E8F0FE', color: '#185FA5', padding: '6px 12px',
            borderRadius: 100, fontSize: '0.85rem', fontWeight: 500,
            display: 'flex', alignItems: 'center', gap: 6
          }}>
            {s.skill}
            <button onClick={() => handleRemoveSkill(s.skill)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, display: 'flex', color: '#185FA5' }}>
              <Trash2 size={14} />
            </button>
          </span>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 10, maxWidth: 400 }}>
        <input
          type="text"
          placeholder="Add skill (e.g. Next.js)"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
          style={inputStyle}
        />
        <button onClick={handleAddSkill} disabled={isPending} style={{ background: '#4285F4', color: '#fff', border: 'none', padding: '0 16px', borderRadius: 10, cursor: 'pointer' }}>
          <Plus size={18} />
        </button>
      </div>

      {/* Section 5: Contributions */}
      <SectionHeader title="Chapter Contributions" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
        {member.contributions?.map((c: any) => (
          <div key={c.id} style={{
            padding: '16px 20px', background: '#fafafa', border: '1px solid #f0f0f0',
            borderRadius: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'
          }}>
            <div>
              <h4 style={{ margin: '0 0 4px', fontSize: '1rem', fontWeight: 600, color: '#202124' }}>{c.title}</h4>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#5F6368' }}>{c.description}</p>
            </div>
            <button onClick={() => handleRemoveContribution(c.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EA4335', padding: 4 }}>
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      {!showContriForm ? (
        <button onClick={() => setShowContriForm(true)} style={{ background: '#fff', border: '1px solid #dadce0', color: '#3C4043', padding: '10px 20px', borderRadius: 8, fontWeight: 600, cursor: 'pointer' }}>
          + Add New Contribution
        </button>
      ) : (
        <div style={{ background: '#f8f9fa', border: '1px solid #dadce0', padding: 20, borderRadius: 12 }}>
          <div style={{ marginBottom: 12 }}>
            <Label>Title</Label>
            <input value={contriTitle} onChange={(e) => setContriTitle(e.target.value)} placeholder="Project lead, Speaker, etc." style={inputStyle} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <Label>Description</Label>
            <textarea value={contriDesc} onChange={(e) => setContriDesc(e.target.value)} placeholder="Briefly describe your impact..." rows={2} style={inputStyle} />
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={handleAddContribution} disabled={isPending} style={{ background: '#4285F4', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: 8, fontWeight: 600, cursor: 'pointer', flex: 1 }}>Save</button>
            <button onClick={() => setShowContriForm(false)} style={{ background: '#fff', border: '1px solid #dadce0', color: '#5f6368', padding: '10px 20px', borderRadius: 8, fontWeight: 600, cursor: 'pointer', flex: 1 }}>Cancel</button>
          </div>
        </div>
      )}
      <div style={{ height: 60 }} />
    </div>
  )
}
