import React from 'react';
import Image from 'next/image';
import styles from './Partners.module.css';
import { prisma } from '@/lib/prisma';

const DEFAULT_PARTNERS = [
    {
        id: 'partner-1',
        name: 'GitHub',
        logoUrl: '/partners/github.png',
        websiteUrl: 'https://github.com/',
    },
    {
        id: 'partner-2',
        name: 'Algoligence',
        logoUrl: '/partners/algoligence.svg',
        websiteUrl: 'https://algoligence.com/',
    },
    {
        id: 'partner-3',
        name: 'DataCamp',
        logoUrl: '/partners/datacamp.png',
        websiteUrl: 'https://www.datacamp.com/',
    },
    {
        id: 'partner-4',
        name: 'KSL',
        logoUrl: '/partners/ksl.svg',
        websiteUrl: 'https://kslt20.com/',
    },
    {
        id: 'partner-5',
        name: 'Cheezious',
        logoUrl: '/partners/cheezious.svg',
        websiteUrl: 'https://cheezious.com/',
    },
    {
        id: 'partner-6',
        name: 'Korneez',
        logoUrl: '/partners/korneez.svg',
        websiteUrl: 'https://korneez.com/',
    },
];

async function getPartners() {
    try {
        const dbPartners = await prisma.partner.findMany({
            orderBy: { order: 'asc' },
        });
        if (dbPartners && dbPartners.length > 0) {
            return dbPartners;
        }
    } catch (error) {
        console.warn('⚠️ Could not fetch partners, using fallback partner logos.');
    }
    return DEFAULT_PARTNERS;
}

export default async function Partners() {
    const rawPartners = await getPartners();
    const partners = rawPartners.length > 0 ? rawPartners : DEFAULT_PARTNERS;

    return (
        <section className={styles.partnersSection} data-aos="fade-up">
            <div className={styles.container}>
                <h2 className={styles.title}>Partners</h2>

                <div className={styles.logoGrid}>
                    {partners.map((partner) => (
                        <a
                            key={partner.id}
                            href={partner.websiteUrl || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.partnerCard}
                            title={partner.name}
                        >
                            <div className={styles.logoWrapper}>
                                {partner.logoUrl ? (
                                    <Image
                                        src={partner.logoUrl}
                                        alt={partner.name}
                                        fill
                                        className={styles.logoImage}
                                        sizes="(max-width: 768px) 240px, 320px"
                                    />
                                ) : (
                                    <div className={styles.placeholder}>{partner.name}</div>
                                )}
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
