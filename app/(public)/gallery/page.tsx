"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, ZoomIn } from 'lucide-react';

const galleryPhotos = [
  {
    id: 1,
    title: "MTM AI Hackathon Winner Ceremony",
    category: "Awards & Ceremonies",
    src: "/images/chapter/mtm-winner.png",
  },
  {
    id: 2,
    title: "HackTheVibe Hackathon Team",
    category: "Hackathons",
    src: "/images/chapter/hackthevibe-team.png",
  },
  {
    id: 3,
    title: "Farhan Ashraf Keynote Speaker Session",
    category: "Speaker Sessions",
    src: "/images/chapter/keynote-speaker.png",
  },
  {
    id: 4,
    title: "HackData V1 Grand Championship Ceremony",
    category: "Hackathons",
    src: "/images/chapter/hackdata-winner.png",
  },
  {
    id: 5,
    title: "MTM AI Hackathon Shield Presentation",
    category: "Awards & Ceremonies",
    src: "/images/gallery/mtm_shield_presentation.png",
  },
  {
    id: 6,
    title: "HackData V1 Winning Teams & Faculty",
    category: "Awards & Ceremonies",
    src: "/images/gallery/hackdata_winning_team_certificates.png",
  },
  {
    id: 7,
    title: "GDGoC Chapter Organizing Team",
    category: "Awards & Ceremonies",
    src: "/images/chapter_photos/gdg_team_group.png",
  },
  {
    id: 8,
    title: "Faculty Patron Shield Presented to Dr. Wasif Nisar",
    category: "Awards & Ceremonies",
    src: "/images/gallery/hackdata_shield_dr_wasif.png",
  },
  {
    id: 9,
    title: "Auditorium Audience & Student Attendees",
    category: "Speaker Sessions",
    src: "/images/chapter_photos/audience_hall.png",
  },
  {
    id: 10,
    title: "Faculty & Industry Keynote Panel",
    category: "Speaker Sessions",
    src: "/images/gallery/faculty_industry_discussion.png",
  },
  {
    id: 11,
    title: "Annual Open House & Tech Career Fair",
    category: "Workshops",
    src: "/images/gallery/open_house_job_fair.png",
  },
  {
    id: 12,
    title: "MTM Hackathon Live Project Judging",
    category: "Hackathons",
    src: "/images/gallery/mtm_hackathon_judging.jpg",
  },
  {
    id: 13,
    title: "Munsif Raza Startup & Product Strategy Keynote",
    category: "Speaker Sessions",
    src: "/images/chapter_photos/munsif_raza.png",
  },
  {
    id: 14,
    title: "Sumama Zaeem Cloud Architecture & DevOps Session",
    category: "Speaker Sessions",
    src: "/images/chapter_photos/sumama_talk.png",
  },
  {
    id: 15,
    title: "Muhammad Adil Developer Visibility Workshop",
    category: "Workshops",
    src: "/images/chapter_photos/muhammad_adil.png",
  },
  {
    id: 16,
    title: "Annual GDG Merit Award Ceremony",
    category: "Awards & Ceremonies",
    src: "/images/chapter/gdg-award-ceremony.png",
  },
  {
    id: 17,
    title: "Community Day Certificate Presentation",
    category: "Awards & Ceremonies",
    src: "/images/gallery/community_day_certificate_presentation.png",
  },
  {
    id: 18,
    title: "Executive Committee & Chapter Delegation",
    category: "Speaker Sessions",
    src: "/images/gallery/formal_organizing_committee.png",
  },
  {
    id: 19,
    title: "MTM AI Hackathon Runner-Up Award",
    category: "Awards & Ceremonies",
    src: "/images/chapter_photos/mtm_runnerup.png",
  },
  {
    id: 20,
    title: "HackData V1 Runner-Up Celebration",
    category: "Awards & Ceremonies",
    src: "/images/chapter_photos/hackdata_runnerup.png",
  },
  {
    id: 21,
    title: "Campus Lead Address at Hackathon Opening",
    category: "Speaker Sessions",
    src: "/images/chapter/workshop-speaker.png",
  },
  {
    id: 22,
    title: "Women in Tech & GenAI Presentation",
    category: "Speaker Sessions",
    src: "/images/chapter_photos/fatima_maleeha_session.png",
  },
  {
    id: 23,
    title: "Student Mentorship & Coaching Session",
    category: "Workshops",
    src: "/images/gallery/student_mentorship_session.jpg",
  },
  {
    id: 24,
    title: "Tech Workshop Interactive Cohort",
    category: "Workshops",
    src: "/images/gallery/tech_workshop_audience.jpg",
  },
  {
    id: 25,
    title: "HackData V1 Certificate Recognition Ceremony",
    category: "Awards & Ceremonies",
    src: "/images/gallery/hackdata_cert_award_3.png",
  },
  {
    id: 26,
    title: "Guest Speaker Appreciation Shield Handover",
    category: "Awards & Ceremonies",
    src: "/images/gallery/hackdata_shield_handover.png",
  },
  {
    id: 27,
    title: "Abdul Raheem AI Engineering Workshop",
    category: "Workshops",
    src: "/images/gallery/lead_hackathon_address.jpg",
  },
  {
    id: 28,
    title: "HackData V1 Certificate Distribution",
    category: "Awards & Ceremonies",
    src: "/images/gallery/hackdata_cert_distribution_1.png",
  },
  {
    id: 29,
    title: "HackData V1 Participant Recognition",
    category: "Awards & Ceremonies",
    src: "/images/gallery/hackdata_cert_distribution_2.png",
  },
  {
    id: 30,
    title: "GDGoC Celebration Photo Frame Booth",
    category: "Awards & Ceremonies",
    src: "/images/gallery/gdg_photo_frame_booth.png",
  },
  {
    id: 31,
    title: "Code War 4.0: AI Model Training Champions (Ubaid, Adeel & Ismail)",
    category: "Awards & Ceremonies",
    src: "/images/gallery/codewar_ai_model_training_winner.png",
  },
  {
    id: 32,
    title: "Code War 4.0: Website Dev Champions (Zohaib, Abdul Ahad & Qazi Hammad)",
    category: "Awards & Ceremonies",
    src: "/images/gallery/codewar_website_dev_winner.png",
  },
  {
    id: 33,
    title: "CUI Tech Fest: Agentic AI Arena Winner Cheque Ceremony (Ubaid & Fatima)",
    category: "Awards & Ceremonies",
    src: "/images/gallery/cui_techfest_agentic_ai_winner.png",
  },
  {
    id: 34,
    title: "Innovators Challenge 2026 IST Islamabad: Team DataSaurs 6th Position (Aroosa & Akif)",
    category: "Awards & Ceremonies",
    src: "/images/gallery/innovators_challenge_datasaurs.jpg",
  },
];

const categories = ["All", "Speaker Sessions", "Workshops", "Hackathons", "Awards & Ceremonies"];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeImage, setActiveImage] = useState<any | null>(null);

  const filteredPhotos = selectedCategory === "All"
    ? galleryPhotos
    : galleryPhotos.filter(p => p.category === selectedCategory);

  return (
    <div className="gallery-root">
      <style>{`
        .gallery-root {
          color: #3c4043;
          font-family: 'Google Sans Text', 'Roboto', sans-serif;
          min-height: 100vh;
          background: #ffffff;
        }

        .hero {
          padding: 8rem 1.5rem 4rem 1.5rem;
          position: relative;
          overflow: hidden;
          background: white;
          border-bottom: 1px solid #e0e0e0;
        }

        .hero::before {
          content: "";
          position: absolute;
          top: -150px;
          right: -100px;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(66, 133, 244, 0.15) 0%, transparent 70%);
          z-index: 0;
          border-radius: 50%;
          pointer-events: none;
        }

        .hero-content {
          position: relative;
          z-index: 1;
          max-width: 1100px;
          margin: 0 auto;
          text-align: left;
        }

        .hero-breadcrumb {
          display: flex;
          gap: 8px;
          align-items: center;
          font-size: 0.85rem;
          font-weight: 500;
          color: #5f6368;
          margin-bottom: 1.25rem;
        }

        .hero-breadcrumb .dot-sep {
          width: 4px;
          height: 4px;
          background: #dadce0;
          border-radius: 50%;
        }

        .hero-title {
          font-family: 'Product Sans', 'Google Sans', sans-serif;
          font-size: clamp(2.2rem, 5vw, 3.5rem);
          line-height: 1.1;
          margin-bottom: 1rem;
          color: #202124;
          letter-spacing: -0.02em;
        }

        .hero-title span {
          color: #4285F4;
        }

        .hero-subtitle {
          font-size: 1.15rem;
          color: #5f6368;
          max-width: 650px;
          margin-bottom: 2rem;
          line-height: 1.5;
        }

        .main-container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 48px 24px 80px 24px;
        }

        .filter-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 40px;
          justify-content: center;
        }

        .filter-btn {
          padding: 8px 20px;
          border-radius: 100px;
          font-size: 0.95rem;
          font-weight: 500;
          border: 1px solid #dadce0;
          background: #ffffff;
          color: #5f6368;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .filter-btn:hover {
          background: #f8f9fa;
          color: #202124;
          border-color: #bdc1c6;
        }

        .filter-btn.active {
          background: #e8f0fe;
          color: #1a73e8;
          border-color: #d2e3fc;
          font-weight: 600;
        }

        .photo-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        @media (max-width: 900px) {
          .photo-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
        }

        @media (max-width: 600px) {
          .photo-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }

        .photo-card {
          border-radius: 8px;
          overflow: hidden;
          background-color: #f1f3f4;
          position: relative;
          cursor: pointer;
        }

        .image-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          overflow: hidden;
        }

        .photo-image {
          object-fit: cover;
          transition: transform 0.35s ease, opacity 0.35s ease;
        }

        .photo-card:hover .photo-image {
          transform: scale(1.04);
          opacity: 0.95;
        }

        .overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.35);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 20px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .photo-card:hover .overlay {
          opacity: 1;
        }

        .overlay-title {
          color: #ffffff;
          font-weight: 600;
          font-size: 1.05rem;
          margin: 0 0 4px 0;
        }

        .overlay-category {
          color: rgba(255, 255, 255, 0.85);
          font-size: 0.85rem;
          font-weight: 500;
        }

        .zoom-icon {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 50%;
          padding: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #202124;
        }

        /* Modal Lightbox */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.85);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          backdrop-filter: blur(4px);
        }

        .modal-content {
          position: relative;
          max-width: 90vw;
          max-height: 85vh;
          width: 1000px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .modal-image-container {
          position: relative;
          width: 100%;
          max-height: 75vh;
          height: 600px;
          border-radius: 8px;
          overflow: hidden;
        }

        .modal-image {
          object-fit: contain;
        }

        .modal-close-btn {
          position: absolute;
          top: -48px;
          right: 0;
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          padding: 8px;
          border-radius: 50%;
          cursor: pointer;
          transition: background 0.2s;
        }

        .modal-close-btn:hover {
          background: rgba(255, 255, 255, 0.4);
        }

        .modal-caption {
          margin-top: 16px;
          color: white;
          text-align: center;
        }

        .modal-caption h3 {
          font-size: 1.25rem;
          margin: 0 0 4px 0;
          font-weight: 600;
        }

        .modal-caption p {
          font-size: 0.95rem;
          color: #dadce0;
          margin: 0;
        }
      `}</style>

      <header className="hero">
        <div className="hero-content">
          <nav className="hero-breadcrumb">
            <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>GDGoC</Link>
            <span className="dot-sep" />
            <span style={{ color: "#4285F4" }}>Gallery</span>
          </nav>
          <h1 className="hero-title">Our <span>Gallery</span> in Action.</h1>
          <p className="hero-subtitle">Explore real moments captured from workshops, tech talks, hackathons, and celebrations at GDGoC.</p>
        </div>
      </header>

      <main className="main-container">
        <div className="filter-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="photo-grid">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              className="photo-card"
              onClick={() => setActiveImage(photo)}
            >
              <div className="image-wrapper">
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  className="photo-image"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="overlay">
                  <div className="zoom-icon">
                    <ZoomIn size={16} />
                  </div>
                  <h3 className="overlay-title">{photo.title}</h3>
                  <span className="overlay-category">{photo.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Lightbox Modal */}
      {activeImage && (
        <div className="modal-overlay" onClick={() => setActiveImage(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setActiveImage(null)}>
              <X size={24} />
            </button>
            <div className="modal-image-container">
              <Image
                src={activeImage.src}
                alt={activeImage.title}
                fill
                className="modal-image"
              />
            </div>
            <div className="modal-caption">
              <h3>{activeImage.title}</h3>
              <p>{activeImage.category}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
