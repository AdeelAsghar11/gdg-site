"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X } from 'lucide-react';
import styles from './ChapterPhotos.module.css';

interface ChapterPhoto {
    id: number;
    title: string;
    src: string;
}

const photos: ChapterPhoto[] = [
    {
        id: 1,
        title: "HackTheVibe Team Photo",
        src: "/images/chapter/hackthevibe-team.png",
    },
    {
        id: 2,
        title: "Speaker Session",
        src: "/images/chapter_photos/speaker_2.jpg",
    },
    {
        id: 3,
        title: "MTM Winner Ceremony",
        src: "/images/chapter/mtm-winner.png",
    },
    {
        id: 4,
        title: "GDG Award Ceremony",
        src: "/images/chapter/gdg-award-ceremony.png",
    },
    {
        id: 5,
        title: "HackData V1 Winners",
        src: "/images/chapter/hackdata-winner.png",
    },
    {
        id: 6,
        title: "Keynote Speaker",
        src: "/images/chapter/keynote-speaker.png",
    },
];

export default function ChapterPhotos() {
    const [selectedPhoto, setSelectedPhoto] = useState<ChapterPhoto | null>(null);

    return (
        <section className={styles.chapterPhotosSection} data-aos="fade-up">
            <div className={styles.container}>
                <h2 className={styles.title}>Chapter Photos</h2>

                <div className={styles.photoGrid}>
                    {photos.map((photo) => (
                        <div
                            key={photo.id}
                            className={styles.photoCard}
                            onClick={() => setSelectedPhoto(photo)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    setSelectedPhoto(photo);
                                }
                            }}
                            title={`View full photo: ${photo.title}`}
                        >
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={photo.src}
                                    alt={photo.title}
                                    fill
                                    className={styles.photoImage}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.viewGalleryWrapper}>
                    <Link href="/gallery" className={styles.viewGalleryLink}>
                        <span>View full gallery</span>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                        </svg>
                    </Link>
                </div>
            </div>

            {selectedPhoto && (
                <div
                    className={styles.modalOverlay}
                    onClick={() => setSelectedPhoto(null)}
                >
                    <div
                        className={styles.modalContent}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className={styles.modalClose}
                            onClick={() => setSelectedPhoto(null)}
                            aria-label="Close modal"
                        >
                            <X size={24} />
                        </button>
                        <div className={styles.modalImageWrapper}>
                            <Image
                                src={selectedPhoto.src}
                                alt={selectedPhoto.title}
                                fill
                                className={styles.modalImage}
                                sizes="90vw"
                                priority
                            />
                        </div>
                        <div className={styles.modalDetails}>
                            <h3 className={styles.modalTitle}>{selectedPhoto.title}</h3>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
