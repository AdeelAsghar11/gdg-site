import React from 'react';
import { prisma } from '@/lib/prisma';
import { Megaphone, Calendar } from 'lucide-react';
import styles from './AnnouncementsBanner.module.css';

async function getActiveAnnouncements() {
  try {
    return await prisma.announcement.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
      take: 3,
    });
  } catch (error) {
    console.warn('⚠️ Could not fetch announcements for home page.');
    return [];
  }
}

export default async function AnnouncementsBanner() {
  const announcements = await getActiveAnnouncements();

  if (!announcements || announcements.length === 0) {
    return null;
  }

  return (
    <section className={styles.announcementsSection} aria-label="Announcements">
      <div className={styles.container}>
        {announcements.map((announcement) => {
          const dateStr = new Date(announcement.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          });

          return (
            <div key={announcement.id} className={styles.announcementCard} data-aos="fade-up">
              <div className={styles.headerRow}>
                <div className={styles.badgeGroup}>
                  <span className={styles.badge}>
                    <span className={styles.liveDot} />
                    <Megaphone size={13} style={{ marginRight: 2 }} />
                    Announcement
                  </span>
                </div>
                <span className={styles.date}>
                  {dateStr}
                </span>
              </div>
              <h3 className={styles.title}>{announcement.title}</h3>
              <p className={styles.body}>{announcement.body}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
