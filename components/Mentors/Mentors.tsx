"use client";

import React from 'react';
import Image from 'next/image';
import styles from './Mentors.module.css';

export interface Mentor {
  id: string;
  name: string;
  role: string;
  tag?: string;
  tagType?: 'github' | 'aws' | 'faculty';
  image: string;
}

const MENTORS: Mentor[] = [
  {
    id: 'dr-wasif',
    name: 'Dr. Wasif Nisar',
    role: 'Chairperson',
    tag: 'Department of Computer Science',
    tagType: 'faculty',
    image: '/images/mentors/dr_wasif_rect_v2.png',
  },
  {
    id: 'farhan-ashraf',
    name: 'Farhan Ashraf',
    role: 'AI SecOps Engineer, Systems Limited',
    tag: 'GitHub Campus Expert',
    tagType: 'github',
    image: '/images/mentors/farhan_ashraf_rect.png',
  },
  {
    id: 'abdul-raheem',
    name: 'Abdul Raheem',
    role: 'AI & LLM Engineer, BetterData',
    tag: 'GitHub Campus Expert',
    tagType: 'github',
    image: '/images/mentors/abdul_raheem_rect_v2.png',
  },
  {
    id: 'muhammad-adil',
    name: 'Muhammad Adil',
    role: 'Founder',
    tag: 'GitHub Campus Expert',
    tagType: 'github',
    image: '/images/mentors/muhammad_adil_rect.png',
  },
  {
    id: 'munsif-raza',
    name: 'Munsif Raza',
    role: 'Founder @ HyperNeuron',
    tag: 'GitHub Campus Expert',
    tagType: 'github',
    image: '/images/mentors/munsif_raza_rect_v2.png',
  },
  {
    id: 'sumama-zaeem',
    name: 'Sumama Zaeem',
    role: 'Senior DevOps Engineer, Tkxel',
    tag: 'AWS Community Builder',
    tagType: 'aws',
    image: '/images/mentors/sumama_zaeem_rect_v2.png',
  },
];

export default function Mentors() {
  return (
    <section className={styles.mentorsSection} data-aos="fade-up" id="mentors">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Mentors</h2>
          <p className={styles.subtitle}>
            Industry leaders, tech entrepreneurs, and esteemed faculty guiding GDGoC CUI Wah developers towards excellence.
          </p>
        </div>

        <div className={styles.mentorGrid}>
          {MENTORS.map((mentor) => (
            <div key={mentor.id} className={styles.mentorCard}>
              <div className={styles.imageWrapper}>
                <Image
                  src={mentor.image}
                  alt={mentor.name}
                  fill
                  className={styles.mentorImage}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              <div className={styles.cardBody}>
                <h3 className={styles.name}>{mentor.name}</h3>
                <p className={styles.role}>{mentor.role}</p>

                {mentor.tag && (
                  <div className={styles.tagWrapper}>
                    <span
                      className={`${styles.tag} ${
                        mentor.tagType === 'github'
                          ? styles.tagGithub
                          : mentor.tagType === 'aws'
                          ? styles.tagAws
                          : styles.tagFaculty
                      }`}
                    >
                      {mentor.tagType === 'github' && (
                        <svg
                          className={styles.tagIcon}
                          viewBox="0 0 16 16"
                          width="12"
                          height="12"
                          fill="currentColor"
                        >
                          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                        </svg>
                      )}
                      {mentor.tagType === 'aws' && (
                        <svg
                          className={styles.tagIcon}
                          viewBox="0 0 24 24"
                          width="12"
                          height="12"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
                        </svg>
                      )}
                      {mentor.tagType === 'faculty' && (
                        <svg
                          className={styles.tagIcon}
                          viewBox="0 0 24 24"
                          width="12"
                          height="12"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                          <path d="M6 12v5c3 3 9 3 12 0v-5" />
                        </svg>
                      )}
                      {mentor.tag}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
