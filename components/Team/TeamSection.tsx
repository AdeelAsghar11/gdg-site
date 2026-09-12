"use client";

import React from 'react';
import Link from 'next/link';
import styles from './TeamSection.module.css';

const TeamSection = () => {
    const team = [
        {
            id: 1,
            name: "Dr. Kashif Ayyub",
            role: "Faculty Advisor",
            organization: "CUI Wah Chapter",
            image: "/images/team/kashif_ayub.png",
            slug: "kashif-ayub"
        },
        {
            id: 2,
            name: "Ubaid Ghazi",
            role: "Campus Lead",
            organization: "GDGoC CUI Wah",
            image: "/images/team/ubaid.png",
            slug: "ubaid"
        },
        {
            id: 3,
            name: "Alisha Fatima",
            role: "Campus Co-Lead",
            organization: "GDGoC CUI Wah",
            image: "/images/team/alisha_fatima.png",
            slug: "alisha-fatima"
        },
        {
            id: 4,
            name: "Laiba Faiz",
            role: "Chairperson",
            organization: "GDGoC CUI Wah",
            image: "/images/team/laiba_faiz.png",
            slug: "laiba-faiz"
        }
    ];

    return (
        <section className={styles.container} data-aos="fade-up">
            {/* Header Section */}
            <header className={styles.header}>
                <h2 className={styles.title}>Meet the Leadership</h2>
                <p className={styles.description}>
                    A diverse group of student developers, designers, and community builders at <span className={styles.brandName}>GDGoC</span> working together to bridge the gap between theory and industry-standard practice.
                </p>
            </header>

            {/* Team Grid */}
            <div className={styles.teamGrid}>
                {team.map((member) => (
                    <div key={member.id} className={styles.teamMemberItem}>
                        <div className={styles.avatarContainer}>
                            <img src={member.image} alt={member.name} className={styles.avatarImage} />
                        </div>
                        <h3 className={styles.memberName}>{member.name}</h3>
                        <p className={styles.memberRole}>{member.role}</p>
                        {member.organization && (
                            <p className={styles.memberOrg}>{member.organization}</p>
                        )}
                        <Link href={`/team`} className={styles.profileLink}>
                            View profile
                        </Link>
                    </div>
                ))}
            </div>

            {/* Indicator for detailed team page */}
            <div className={styles.contributorsSection}>
                <p className={styles.contributorsText}>And 12+ other amazing contributors</p>
                <Link href="/team" className={styles.viewAllLink}>
                    <span>View all members</span>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                </Link>
            </div>
        </section>
    );
};

export default TeamSection;
