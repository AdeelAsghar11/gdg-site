import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Sparkles, ArrowRight, Calendar, Users, Clock } from 'lucide-react';
import styles from './RecruitmentBanner.module.css';

export default async function RecruitmentBanner() {
  try {
    const [statusRow, messageRow, deadlineRow, eligibilityRow, interviewRow] = await Promise.all([
      prisma.siteSetting.findUnique({ where: { key: 'recruitment_status' } }).catch(() => null),
      prisma.siteSetting.findUnique({ where: { key: 'recruitment_message' } }).catch(() => null),
      prisma.siteSetting.findUnique({ where: { key: 'recruitment_deadline' } }).catch(() => null),
      prisma.siteSetting.findUnique({ where: { key: 'recruitment_eligibility' } }).catch(() => null),
      prisma.siteSetting.findUnique({ where: { key: 'recruitment_interview_date' } }).catch(() => null),
    ]);

    const isOpen = statusRow ? statusRow.value === 'open' : true;
    if (!isOpen) {
      return null;
    }

    const message = messageRow?.value?.trim() || 'Registrations Open: 11 Sep – 14 Sep | Interviews: 15 Sep | Open for 1st & 2nd Semester Students!';
    const deadline = deadlineRow?.value?.trim() || '2026-09-14T23:59:59.000Z';
    const eligibility = eligibilityRow?.value?.trim() || '1st & 2nd Semester Students';
    const interviewDate = interviewRow?.value?.trim() || '15 Sep 2026';

    const formattedDeadline = deadline
      ? new Date(deadline).toLocaleDateString('en-PK', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
      : 'Sep 14, 2026';

    return (
      <section className={styles.bannerWrapper} aria-label="Recruitment Announcement">
        <div className={styles.bannerCard} data-aos="fade-up">
          <div className={styles.contentLeft}>
            <div className={styles.badgeRow}>
              <span className={styles.liveBadge}>
                <span className={styles.pulseDot} />
                Registrations Open (11–14 Sep)
              </span>
              <span className={styles.eligibilityTag}>
                <Users size={13} />
                {eligibility}
              </span>
              <span className={styles.deadlineToTag}>
                <Calendar size={13} />
                Interviews: {interviewDate}
              </span>
            </div>

            <h2 className={styles.bannerTitle}>
              Join GDGoC CUI Wah Chapter &amp; Clubs!
            </h2>

            <p className={styles.bannerMessage}>
              {message}
            </p>
          </div>

          <div className={styles.actionsRight}>
            <Link href="/join" className={styles.applyBtn}>
              <span>Apply Now (1st &amp; 2nd Sem)</span>
              <ArrowRight size={17} />
            </Link>
            <Link href="/clubs" className={styles.clubsBtn}>
              Explore Clubs
            </Link>
          </div>
        </div>
      </section>
    );
  } catch (err) {
    console.warn('⚠️ Could not load recruitment banner:', err);
    return null;
  }
}

