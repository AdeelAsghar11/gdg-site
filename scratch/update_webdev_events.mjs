import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import dotenv from 'dotenv';

dotenv.config();
dotenv.config({ path: '.env.local', override: true });

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

const updatedBootcamps = [
  {
    slug: 'web-development-for-beginners',
    title: 'Web Development for Beginners Workshop Series',
    description: 'A structured, hands-on online workshop conducted over Friday, Saturday, and Sunday nights covering HTML5 structure, CSS3 modern layout design, and JavaScript interactivity with daily assignments and official certification.',
    type: 'BOOTCAMP',
    location: 'Online (Weekend Nights)',
    locationType: 'Online',
    date: new Date('2025-10-15T19:00:00.000Z'),
    imageUrl: '/images/events/web-dev-beginners.jpg',
    badgeUrl: '/images/events/web-dev-beginners.jpg',
    isPublished: true,
    tags: ['Bootcamp', 'Web Development', 'HTML', 'CSS', 'JavaScript'],
    agenda: [
      { order: 1, time: 'Session 1', title: 'HTML5 Semantic Web Architecture', speaker: 'Muhammad Ismail', description: 'Structuring web pages, semantic tags, forms, and accessibility.' },
      { order: 2, time: 'Session 2', title: 'Modern CSS3: Flexbox, Grid & Animations', speaker: 'Muhammad Ismail', description: 'Styling, responsive design, fluid layouts, and component theming.' },
      { order: 3, time: 'Session 3', title: 'JavaScript Essentials & DOM Manipulation', speaker: 'Umm e Habiba', description: 'Adding interactivity, event listeners, dynamic UI, and final project guidance.' },
    ],
  },
  {
    slug: 'web-development-bootcamp-sp26',
    title: 'Web Development Bootcamp (React & Modern Frontend)',
    description: 'A 3-day hands-on bootcamp organized by GDGoC CUI Wah to teach modern web development from basic to expert level. The sessions provided a thorough exploration of modern frontend engineering, focusing on the fundamentals of the React library, component-based architecture, state management, and efficient UI rendering. Featured live coding demonstrations, interactive technical walkthroughs, Q&A sessions, and a live project showcase.',
    type: 'BOOTCAMP',
    location: 'COMSATS University Islamabad, Wah Campus / Online (Google Meet)',
    locationType: 'Online',
    date: new Date('2026-03-06T18:00:00.000Z'),
    imageUrl: '/images/events/react-bootcamp.jpg',
    badgeUrl: '/images/events/react-bootcamp.jpg',
    isPublished: true,
    tags: ['Web Development', 'React', 'Frontend', 'JavaScript', 'State Management', 'UI/UX', 'Bootcamp'],
    agenda: [
      { order: 1, time: 'Day 1 (06:00 PM)', title: 'React Fundamentals & Component Architecture', speaker: 'Muhammad Ismail (Lead Web & App Development)', description: 'Modern frontend ecosystem, JSX syntax, functional components, props, and modular design.' },
      { order: 2, time: 'Day 2 (06:00 PM)', title: 'State Management, Hooks & Rendering Lists', speaker: 'Muhammad Ismail', description: 'Deep dive into useState, useEffect, conditional rendering, list keys, and event handling.' },
      { order: 3, time: 'Day 3 (06:00 PM)', title: 'Live Project Showcase & Scalable Architecture', speaker: 'Muhammad Ismail', description: 'Live coding a dynamic web application, performance optimization, collaborative Q&A, and deployment.' },
    ],
  },
];

async function main() {
  console.log('🔄 Updating Web Development bootcamps in database...');

  for (const ev of updatedBootcamps) {
    const { tags, agenda, ...eventData } = ev;

    const upserted = await prisma.event.upsert({
      where: { slug: ev.slug },
      update: {
        title: eventData.title,
        description: eventData.description,
        type: eventData.type,
        location: eventData.location,
        locationType: eventData.locationType,
        date: eventData.date,
        imageUrl: eventData.imageUrl,
        badgeUrl: eventData.badgeUrl,
        isPublished: true,
      },
      create: {
        ...eventData,
      },
    });

    // Sync tags
    await prisma.eventTag.deleteMany({ where: { eventId: upserted.id } });
    for (const tag of tags) {
      await prisma.eventTag.create({
        data: { eventId: upserted.id, tag },
      });
    }

    // Sync agenda
    await prisma.eventAgendaItem.deleteMany({ where: { eventId: upserted.id } });
    for (const item of agenda) {
      await prisma.eventAgendaItem.create({
        data: {
          eventId: upserted.id,
          order: item.order,
          time: item.time,
          title: item.title,
          description: item.description,
          speaker: item.speaker,
        },
      });
    }

    console.log(`✅ Successfully updated event: ${upserted.title} (${upserted.slug})`);
  }

  console.log('\n🎉 Web development bootcamps updated with new images and speaker information!');
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
