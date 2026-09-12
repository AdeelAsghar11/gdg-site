"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Trophy, 
  Award, 
  Medal, 
  Sparkles, 
  Calendar, 
  Users, 
  Star, 
  X, 
  ZoomIn, 
  ArrowRight,
  ExternalLink,
  Crown
} from 'lucide-react';

interface Achievement {
  id: number;
  title: string;
  subtitle: string;
  competition: string;
  category: string;
  position: '1st Place' | 'Runner-Up' | 'Special Honor' | 'Faculty Recognition' | 'Chapter Milestone' | '6th Position';
  positionColor: 'gold' | 'silver' | 'blue' | 'green' | 'purple';
  date: string;
  prize?: string;
  teamOrPerson: string;
  project?: string;
  description: string;
  highlights: string[];
  imageUrl: string;
  secondaryImageUrl?: string;
}

const achievementsData: Achievement[] = [
  {
    id: 1,
    title: "HackData V1: 1st Place Champions",
    subtitle: "Predictive Health Diagnostics & Smart Telemedicine Solution",
    competition: "HackData V1: Online Solution Hackathon",
    category: "Hackathon Winners",
    position: "1st Place",
    positionColor: "gold",
    date: "April 22–23, 2026",
    prize: "Official Winner Shield & Excellence Certificates",
    teamOrPerson: "Team InsightCraft (Data Science & AI Club)",
    project: "AI-Powered Early Diagnostics System",
    description: "Developed an end-to-end predictive healthcare diagnostics engine using machine learning algorithms and real-time medical sensor telemetry. The team demonstrated superior model precision, intuitive clinical dashboard UI, and rapid cloud deployment.",
    highlights: [
      "Real-time patient risk stratification with 94.8% test accuracy",
      "Automated clinical summary report generator using Gemini models",
      "Secured 1st place among 25+ participating inter-department teams"
    ],
    imageUrl: "/images/chapter/hackdata-winner.png",
    secondaryImageUrl: "/images/gallery/hackdata_winning_team_certificates.png"
  },
  {
    id: 2,
    title: "MTM AI Hackathon: Grand Champion Plaque",
    subtitle: "Autonomous Edge-AI Robotic Vision & Navigation Pipeline",
    competition: "MTM (Mind-to-Machine) AI Hackathon",
    category: "Hackathon Winners",
    position: "1st Place",
    positionColor: "gold",
    date: "December 15, 2025",
    prize: "PKR 20,000 Cash Prize + Winner Shield Plaque",
    teamOrPerson: "Team NeuralCrafters",
    project: "Edge-AI Autonomous Robotic Navigation",
    description: "Engineered a low-latency edge computer vision pipeline running on embedded hardware, enabling real-time obstacle avoidance and autonomous mapping in unstructured indoor industrial environments.",
    highlights: [
      "Sub-20ms inference latency on low-power edge accelerators",
      "Custom SLAM and deep reinforcement learning navigation algorithm",
      "Awarded top honors and fast-tracked industry internship offers"
    ],
    imageUrl: "/images/chapter/mtm-winner.png",
    secondaryImageUrl: "/images/gallery/mtm_shield_presentation.png"
  },
  {
    id: 3,
    title: "HackData V1: Runner-Up Excellence Award",
    subtitle: "Automated Campus Energy Grid & Predictive Anomaly Detection",
    competition: "HackData V1: Online Solution Hackathon",
    category: "Hackathon Winners",
    position: "Runner-Up",
    positionColor: "silver",
    date: "April 22–23, 2026",
    prize: "Runner-Up Trophy + Merit Certificates",
    teamOrPerson: "Team DataForge",
    project: "Smart Campus Energy Optimization",
    description: "Constructed an IoT sensor analytics suite that monitors and forecasts university electricity consumption, detecting power anomalies and optimizing peak load distribution automatically.",
    highlights: [
      "Time-series energy forecasting reducing simulated idle waste by 28%",
      "Interactive Grafana-style responsive telemetry dashboard",
      "Honored with second place in the final jury review"
    ],
    imageUrl: "/images/chapter_photos/hackdata_runnerup.png",
    secondaryImageUrl: "/images/gallery/hackdata_cert_distribution_1.png"
  },
  {
    id: 4,
    title: "MTM AI Hackathon: Runner-Up Honors",
    subtitle: "Multilingual OCR & Speech-to-Text Accessibility Tool",
    competition: "MTM (Mind-to-Machine) AI Hackathon",
    category: "Hackathon Winners",
    position: "Runner-Up",
    positionColor: "silver",
    date: "December 15, 2025",
    prize: "PKR 10,000 Cash Prize + Silver Runner-Up Plaque",
    teamOrPerson: "Team Visionary Devs",
    project: "Multilingual Accessibility Transcriber",
    description: "Created an open-source assistive reading application leveraging vision-language models to transcribe and vocalize regional text into high-clarity synthesized speech for visually impaired students.",
    highlights: [
      "Urdu and English bi-directional neural optical character recognition",
      "Lightweight progressive web application with offline voice caching",
      "Awarded PKR 10,000 cash grant and technical commendation"
    ],
    imageUrl: "/images/chapter_photos/mtm_runnerup.png",
    secondaryImageUrl: "/images/gallery/mtm_hackathon_judging.jpg"
  },
  {
    id: 10,
    title: "Code War 4.0: AI Model Training Champions",
    subtitle: "Deep Learning Architecture, Model Training & Accuracy Optimization",
    competition: "Code War 4.0: AI/ML Model Training",
    category: "Hackathon Winners",
    position: "1st Place",
    positionColor: "gold",
    date: "Spring 2026",
    prize: "Official Winner Trophy Shield & Accolades",
    teamOrPerson: "Ubaid Ghazi, Adeel Asghar & Muhammad Ismail",
    project: "Deep Learning Model Training & Optimization",
    description: "Clinched 1st Place at Code War 4.0 in the intensive AI Model Training division. The team engineered high-performance machine learning model pipelines, optimized neural hyperparameters, and achieved state-of-the-art accuracy benchmarks during rapid real-time data challenges.",
    highlights: [
      "Designed and trained specialized neural networks with superior validation accuracy",
      "Optimized model inference latency and computational efficiency under tight time constraints",
      "Awarded 1st Place Winner Shield among competitive university-wide teams"
    ],
    imageUrl: "/images/gallery/codewar_ai_model_training_winner.png"
  },
  {
    id: 11,
    title: "Code War 4.0: Website Development Champions",
    subtitle: "Full-Stack Web Engineering, Responsive UX & Production Architecture",
    competition: "Code War 4.0: Web Development",
    category: "Hackathon Winners",
    position: "1st Place",
    positionColor: "gold",
    date: "Spring 2026",
    prize: "Winner Shield, Official Certificate of Achievement & Chapter Honors",
    teamOrPerson: "Zohaib Arif, Abdul Ahad & Qazi Hammad",
    project: "High-Performance Modern Web Platform",
    description: "Captured 1st Place at Code War 4.0 in the Web Development competition. Representing GDGoC CUI Wah in chapter colors, the team architected and deployed a responsive, full-stack web application featuring smooth interactivity, modern UX patterns, and robust backend integrations.",
    highlights: [
      "Architected clean, scalable full-stack web infrastructure with intuitive UI/UX design",
      "Demonstrated rapid prototype-to-production deployment in a pressurized sprint",
      "Awarded Official Winner Shield and Certificates of Technical Excellence"
    ],
    imageUrl: "/images/gallery/codewar_website_dev_winner.png"
  },
  {
    id: 12,
    title: "CUI Tech Fest: Agentic AI Arena Champions",
    subtitle: "Autonomous Multi-Agent Systems, Decision Workflows & LLM Orchestration",
    competition: "CUI Tech Fest: Agentic AI Arena",
    category: "Hackathon Winners",
    position: "1st Place",
    positionColor: "gold",
    date: "Spring 2026",
    prize: "Winner Cheque, Cash Prize & Grand Champion Recognition",
    teamOrPerson: "Ubaid Ghazi & Fatima Qureshi",
    project: "Autonomous Agentic AI Multi-System Pipeline",
    description: "Triumphant 1st Place Grand Champions at CUI Tech Fest in the Agentic AI Arena. Ubaid Ghazi and Fatima Qureshi designed autonomous multi-agent AI systems capable of complex reasoning, collaborative goal decomposition, and automated task execution, earning top honors from academic judges and campus dignitaries.",
    highlights: [
      "Built resilient multi-agent orchestration handling dynamic reasoning and tool execution",
      "Presented live to university faculty and industry leadership, winning top honors",
      "Awarded Official Competition Winner Cheque and Cash Prize grant"
    ],
    imageUrl: "/images/gallery/cui_techfest_agentic_ai_winner.png"
  },
  {
    id: 13,
    title: "Innovators Challenge 2026: 6th Position",
    subtitle: "AI & Autonomous Engineering Challenge at IST Islamabad",
    competition: "Innovators Challenge 2026 (IST Islamabad)",
    category: "Hackathon Winners",
    position: "6th Position",
    positionColor: "blue",
    date: "Spring 2026",
    prize: "6th Position Merit Certificate & Innovation Accolades",
    teamOrPerson: "Team DataSaurs (Aroosa Jabeen & Akif Naveed)",
    project: "Autonomous AI & Space Technology Solution",
    description: "Team DataSaurs, featuring GDGoC developers Aroosa Jabeen and Akif Naveed, achieved an impressive 6th Position at the nationwide Innovators Challenge 2026 hosted at the Institute of Space Technology (IST), Islamabad. Competing against premier university engineering teams across Pakistan, they delivered a high-impact technology solution praised for creative architecture and practical viability.",
    highlights: [
      "Secured 6th Position among 50+ inter-university engineering teams across Pakistan",
      "Developed an innovative technology prototype addressing modern engineering and computational challenges",
      "Commended by technical juries and university leadership at Institute of Space Technology (IST)"
    ],
    imageUrl: "/images/gallery/innovators_challenge_datasaurs.jpg"
  },
  {
    id: 7,
    title: "HackTheVibe 2026: Open Source Innovation Laurels",
    subtitle: "Distinguished Campus Expert & Tech Speakers Delegation",
    competition: "HackTheVibe 2026 Technical Summit",
    category: "Open Source & Contests",
    position: "Special Honor",
    positionColor: "green",
    date: "February 13–14, 2026",
    prize: "Innovation Plaque & GitHub Campus Expert Recognition",
    teamOrPerson: "GDGoC CUI Wah Executive Delegation & Industry Speakers",
    description: "HackTheVibe 2026 united distinguished GitHub Campus Experts and industry professionals across AI SecOps, DevOps, Personal Branding, and Open Source contributions, creating a landmark event for student open-source contributors.",
    highlights: [
      "120+ active student contributors engaged in live Git & PR challenges",
      "Merchandise and official GitHub perks distributed to top contributors",
      "Recognized by regional developer communities as a benchmark open source event"
    ],
    imageUrl: "/images/chapter/hackthevibe-team.png",
    secondaryImageUrl: "/images/chapter_photos/sumama_talk.png"
  }
];

const categories = [
  "All",
  "Hackathon Winners",
  "Open Source & Contests"
];

export default function AchievementsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeModal, setActiveModal] = useState<Achievement | null>(null);

  const filteredAchievements = selectedCategory === "All"
    ? achievementsData
    : achievementsData.filter(item => item.category === selectedCategory);

  return (
    <div className="achievements-root">
      <style>{`
        .achievements-root {
          color: #3c4043;
          font-family: 'Google Sans Text', 'Roboto', sans-serif;
          min-height: 100vh;
          background: #fdfdfd;
        }

        /* --- HERO SECTION --- */
        .hero {
          padding: 8rem 1.5rem 4.5rem 1.5rem;
          position: relative;
          overflow: hidden;
          background: #ffffff;
          border-bottom: 1px solid #e8eaed;
        }

        .hero::before {
          content: "";
          position: absolute;
          top: -160px;
          right: -80px;
          width: 550px;
          height: 550px;
          background: radial-gradient(circle, rgba(66, 133, 244, 0.12) 0%, rgba(251, 188, 4, 0.08) 50%, transparent 70%);
          z-index: 0;
          border-radius: 50%;
          pointer-events: none;
        }

        .hero-content {
          position: relative;
          z-index: 1;
          max-width: 1180px;
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
          font-size: clamp(2.3rem, 5.5vw, 3.8rem);
          line-height: 1.1;
          margin-bottom: 1rem;
          color: #202124;
          letter-spacing: -0.02em;
        }

        .hero-title .highlight-blue { color: #4285F4; }
        .hero-title .highlight-yellow { color: #FBBC04; }
        .hero-title .highlight-green { color: #34A853; }
        .hero-title .highlight-red { color: #EA4335; }

        .hero-subtitle {
          font-size: 1.15rem;
          color: #5f6368;
          max-width: 720px;
          margin-bottom: 2.5rem;
          line-height: 1.6;
        }

        /* --- STATS COUNTERS BAR --- */
        .stats-bar {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          background: #f8f9fa;
          border: 1px solid #e8eaed;
          border-radius: 16px;
          padding: 24px;
          margin-top: 1rem;
        }

        @media (max-width: 900px) {
          .stats-bar {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
        }

        @media (max-width: 500px) {
          .stats-bar {
            grid-template-columns: 1fr;
          }
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .stat-icon-wrapper {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .icon-blue { background: #e8f0fe; color: #1a73e8; }
        .icon-yellow { background: #fef7e0; color: #b06000; }
        .icon-green { background: #e6f4ea; color: #137333; }
        .icon-red { background: #fce8e6; color: #c5221f; }

        .stat-val {
          font-size: 1.6rem;
          font-weight: 700;
          color: #202124;
          font-family: 'Product Sans', 'Google Sans', sans-serif;
          line-height: 1.2;
        }

        .stat-lbl {
          font-size: 0.85rem;
          color: #5f6368;
          font-weight: 500;
        }

        /* --- MAIN SECTION --- */
        .main-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 48px 24px 80px 24px;
        }

        /* --- CATEGORY FILTERS --- */
        .filter-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 40px;
          justify-content: center;
        }

        .filter-btn {
          padding: 10px 20px;
          border-radius: 100px;
          font-size: 0.92rem;
          font-weight: 500;
          border: 1px solid #dadce0;
          background: #ffffff;
          color: #5f6368;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .filter-btn:hover {
          background: #f8f9fa;
          color: #202124;
          border-color: #bdc1c6;
        }

        .filter-btn.active {
          background: #1a73e8;
          color: #ffffff;
          border-color: #1a73e8;
          font-weight: 600;
          box-shadow: 0 4px 12px rgba(26, 115, 232, 0.25);
        }

        /* --- ACHIEVEMENTS GRID --- */
        .achievements-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 28px;
        }

        @media (max-width: 768px) {
          .achievements-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }

        /* --- CARD STYLING --- */
        .achievement-card {
          background: #ffffff;
          border: 1px solid #e8eaed;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 2px 6px rgba(0,0,0,0.04);
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          display: flex;
          flex-direction: column;
        }

        .achievement-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.08);
          border-color: #d2e3fc;
        }

        .card-image-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          background: #f1f3f4;
          cursor: pointer;
        }

        .card-img {
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .card-image-wrap:hover .card-img {
          transform: scale(1.04);
        }

        .card-badge-pos {
          position: absolute;
          top: 14px;
          left: 14px;
          padding: 6px 14px;
          border-radius: 100px;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          display: flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.18);
          z-index: 2;
        }

        .badge-gold {
          background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
          color: #202124;
        }

        .badge-silver {
          background: linear-gradient(135deg, #E0E0E0 0%, #BDBDBD 100%);
          color: #202124;
        }

        .badge-blue {
          background: linear-gradient(135deg, #4285F4 0%, #1a73e8 100%);
          color: #ffffff;
        }

        .badge-green {
          background: linear-gradient(135deg, #34A853 0%, #0d904f 100%);
          color: #ffffff;
        }

        .badge-purple {
          background: linear-gradient(135deg, #A142F4 0%, #8430CE 100%);
          color: #ffffff;
        }

        .card-zoom-btn {
          position: absolute;
          top: 14px;
          right: 14px;
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(4px);
          width: 34px;
          height: 34px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #202124;
          opacity: 0.9;
          transition: transform 0.2s, background 0.2s;
          z-index: 2;
        }

        .card-zoom-btn:hover {
          transform: scale(1.1);
          background: #ffffff;
        }

        .card-body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .card-meta-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.8rem;
          color: #70757a;
          margin-bottom: 12px;
        }

        .card-date {
          display: flex;
          align-items: center;
          gap: 5px;
          font-weight: 500;
        }

        .card-category-tag {
          background: #f1f3f4;
          color: #3c4043;
          padding: 3px 10px;
          border-radius: 100px;
          font-weight: 500;
          font-size: 0.75rem;
        }

        .card-title {
          font-family: 'Google Sans', 'Roboto', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: #202124;
          margin: 0 0 6px 0;
          line-height: 1.35;
        }

        .card-subtitle {
          font-size: 0.88rem;
          color: #4285F4;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .card-team {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          font-weight: 600;
          color: #3c4043;
          background: #f8f9fa;
          padding: 8px 12px;
          border-radius: 8px;
          border-left: 3px solid #1a73e8;
          margin-bottom: 14px;
        }

        .card-prize-box {
          background: #fef7e0;
          border: 1px dashed #f9ab00;
          color: #7c4a00;
          font-size: 0.84rem;
          font-weight: 600;
          padding: 8px 12px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 14px;
        }

        .card-desc {
          font-size: 0.88rem;
          color: #5f6368;
          line-height: 1.55;
          margin-bottom: 20px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          min-height: 4.6em;
        }

        .card-highlights {
          list-style: none;
          padding: 0;
          margin: 0 0 20px 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .card-highlights li {
          font-size: 0.82rem;
          color: #444746;
          display: flex;
          align-items: flex-start;
          gap: 6px;
          line-height: 1.4;
        }

        .card-highlights li::before {
          content: "✦";
          color: #34A853;
          font-size: 0.9rem;
          line-height: 1.2;
        }

        .card-action-btn {
          width: 100%;
          padding: 10px 16px;
          border-radius: 8px;
          background: #f1f3f4;
          color: #1a73e8;
          border: none;
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.2s, color 0.2s;
          margin-top: auto;
        }

        .card-action-btn:hover {
          background: #e8f0fe;
          color: #155724;
        }

        /* --- CTA SECTION --- */
        .cta-section {
          margin-top: 60px;
          background: linear-gradient(135deg, #1a73e8 0%, #0d47a1 100%);
          border-radius: 24px;
          padding: 56px 40px;
          color: #ffffff;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .cta-section::after {
          content: "";
          position: absolute;
          bottom: -80px;
          right: -80px;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%);
          border-radius: 50%;
        }

        .cta-title {
          font-family: 'Product Sans', 'Google Sans', sans-serif;
          font-size: clamp(1.8rem, 3.5vw, 2.5rem);
          font-weight: 700;
          margin-bottom: 12px;
        }

        .cta-desc {
          font-size: 1.05rem;
          max-width: 650px;
          margin: 0 auto 28px auto;
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.6;
        }

        .cta-buttons {
          display: flex;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .cta-btn-primary {
          background: #ffffff;
          color: #1a73e8;
          padding: 12px 28px;
          border-radius: 100px;
          font-weight: 600;
          font-size: 0.95rem;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .cta-btn-primary:hover {
          background: #f8f9fa;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0,0,0,0.2);
        }

        .cta-btn-secondary {
          background: rgba(255, 255, 255, 0.15);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.4);
          padding: 12px 28px;
          border-radius: 100px;
          font-weight: 600;
          font-size: 0.95rem;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s ease;
          backdrop-filter: blur(4px);
        }

        .cta-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.25);
          border-color: #ffffff;
        }

        /* --- LIGHTBOX MODAL --- */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.85);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          backdrop-filter: blur(6px);
        }

        .modal-card {
          background: #ffffff;
          border-radius: 20px;
          max-width: 800px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 24px 48px rgba(0,0,0,0.3);
        }

        .modal-close-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(0,0,0,0.6);
          color: #ffffff;
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: background 0.2s;
        }

        .modal-close-btn:hover {
          background: rgba(0,0,0,0.9);
        }

        .modal-image-container {
          position: relative;
          width: 100%;
          height: 380px;
          background: #111;
        }

        .modal-image {
          object-fit: contain;
        }

        .modal-content {
          padding: 32px;
        }

        .modal-title {
          font-family: 'Product Sans', 'Google Sans', sans-serif;
          font-size: 1.6rem;
          color: #202124;
          margin: 0 0 8px 0;
        }

        .modal-meta-bar {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 20px;
          align-items: center;
        }

        .modal-desc {
          font-size: 1rem;
          color: #444746;
          line-height: 1.65;
          margin-bottom: 20px;
        }

        .modal-highlights-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: #202124;
          margin-bottom: 10px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
      `}</style>

      {/* Hero Header */}
      <header className="hero">
        <div className="hero-content">
          <nav className="hero-breadcrumb">
            <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>GDGoC</Link>
            <span className="dot-sep" />
            <span style={{ color: "#4285F4" }}>Achievements & Honors</span>
          </nav>
          
          <h1 className="hero-title">
            Our <span className="highlight-yellow">Achievements</span> & <span className="highlight-blue">Honors</span>.
          </h1>
          
          <p className="hero-subtitle">
            Celebrating hackathon triumphs, competitive programming champions, innovative student projects, and prestigious milestones accomplished by the GDGoC CUI Wah chapter.
          </p>

          {/* Key Metrics Stats */}
          <div className="stats-bar">
            <div className="stat-item">
              <div className="stat-icon-wrapper icon-yellow">
                <Trophy size={24} />
              </div>
              <div>
                <div className="stat-val">20+</div>
                <div className="stat-lbl">Hackathon Champions</div>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-icon-wrapper icon-green">
                <Sparkles size={24} />
              </div>
              <div>
                <div className="stat-val">PKR 150K+</div>
                <div className="stat-lbl">Prizes & Cash Awards</div>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-icon-wrapper icon-blue">
                <Medal size={24} />
              </div>
              <div>
                <div className="stat-val">8+</div>
                <div className="stat-lbl">Major Tech Contests</div>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-icon-wrapper icon-red">
                <Award size={24} />
              </div>
              <div>
                <div className="stat-val">120+</div>
                <div className="stat-lbl">Deployed Student Projects</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="main-container">
        {/* Category Filters */}
        <div className="filter-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat === "All" && <Sparkles size={16} />}
              {cat === "Hackathon Winners" && <Trophy size={16} />}
              {cat === "Individual Awards & Honors" && <Award size={16} />}
              {cat === "Faculty & Mentors" && <Users size={16} />}
              {cat === "Open Source & Contests" && <Medal size={16} />}
              {cat === "Milestones & Launches" && <Crown size={16} />}
              {cat}
            </button>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="achievements-grid">
          {filteredAchievements.map((item) => (
            <div key={item.id} className="achievement-card">
              <div className="card-image-wrap" onClick={() => setActiveModal(item)}>
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="card-img"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {/* Position Badge */}
                <div className={`card-badge-pos badge-${item.positionColor}`}>
                  {item.position === '1st Place' && <Crown size={13} />}
                  {item.position === 'Runner-Up' && <Medal size={13} />}
                  {item.position === 'Faculty Recognition' && <Users size={13} />}
                  {item.position === 'Special Honor' && <Award size={13} />}
                  {item.position === 'Chapter Milestone' && <Star size={13} />}
                  {item.position === '6th Position' && <Award size={13} />}
                  {item.position}
                </div>

                <div className="card-zoom-btn" title="View Full Details">
                  <ZoomIn size={16} />
                </div>
              </div>

              <div className="card-body">
                <div className="card-meta-row">
                  <span className="card-date">
                    <Calendar size={13} /> {item.date}
                  </span>
                  <span className="card-category-tag">{item.category}</span>
                </div>

                <h3 className="card-title">{item.title}</h3>
                <div className="card-subtitle">{item.subtitle}</div>

                <div className="card-team">
                  <Users size={15} color="#1a73e8" />
                  <span>{item.teamOrPerson}</span>
                </div>

                {item.prize && (
                  <div className="card-prize-box">
                    <Trophy size={15} color="#f9ab00" />
                    <span>{item.prize}</span>
                  </div>
                )}

                <p className="card-desc">{item.description}</p>

                <button 
                  className="card-action-btn"
                  onClick={() => setActiveModal(item)}
                >
                  <span>View Full Story & Gallery</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Box */}
        <section className="cta-section">
          <h2 className="cta-title">Want to Be in Our Next Hall of Fame?</h2>
          <p className="cta-desc">
            Participate in upcoming GDGoC technical workshops, competitive hackathons, study jams, and project incubators. Build high-impact solutions, win prizes, and earn industry recognition.
          </p>
          <div className="cta-buttons">
            <Link href="/events" className="cta-btn-primary">
              <Calendar size={18} />
              Explore Upcoming Events
            </Link>
            <Link href="/clubs" className="cta-btn-secondary">
              <Users size={18} />
              Join a Technical Club
            </Link>
          </div>
        </section>
      </main>

      {/* Lightbox / Details Modal */}
      {activeModal && (
        <div className="modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setActiveModal(null)} aria-label="Close modal">
              <X size={20} />
            </button>

            <div className="modal-image-container">
              <Image
                src={activeModal.imageUrl}
                alt={activeModal.title}
                fill
                className="modal-image"
              />
            </div>

            <div className="modal-content">
              <div className="modal-meta-bar">
                <div className={`card-badge-pos badge-${activeModal.positionColor}`} style={{ position: 'static' }}>
                  {activeModal.position === '1st Place' && <Crown size={13} />}
                  {activeModal.position === 'Runner-Up' && <Medal size={13} />}
                  {activeModal.position === 'Faculty Recognition' && <Users size={13} />}
                  {activeModal.position === 'Special Honor' && <Award size={13} />}
                  {activeModal.position === 'Chapter Milestone' && <Star size={13} />}
                  {activeModal.position === '6th Position' && <Award size={13} />}
                  {activeModal.position}
                </div>
                <span className="card-category-tag">{activeModal.category}</span>
                <span className="card-date" style={{ color: '#5f6368' }}>
                  <Calendar size={14} /> {activeModal.date}
                </span>
              </div>

              <h2 className="modal-title">{activeModal.title}</h2>
              <div className="card-subtitle" style={{ fontSize: '1rem', marginBottom: '16px' }}>
                {activeModal.subtitle}
              </div>

              <div className="card-team" style={{ fontSize: '0.95rem', padding: '10px 14px' }}>
                <Users size={18} color="#1a73e8" />
                <span><strong>Awardee:</strong> {activeModal.teamOrPerson}</span>
              </div>

              {activeModal.prize && (
                <div className="card-prize-box" style={{ fontSize: '0.95rem', padding: '10px 14px' }}>
                  <Trophy size={18} color="#f9ab00" />
                  <span><strong>Prize & Honors:</strong> {activeModal.prize}</span>
                </div>
              )}

              {activeModal.project && (
                <div style={{ fontSize: '0.9rem', color: '#3c4043', marginBottom: '14px', background: '#f8f9fa', padding: '8px 12px', borderRadius: '8px', borderLeft: '3px solid #34a853' }}>
                  <strong>Project Domain:</strong> {activeModal.project}
                </div>
              )}

              <div className="modal-highlights-title" style={{ marginTop: '16px', marginBottom: '8px' }}>
                Full Story & Overview
              </div>
              <p className="modal-desc" style={{ marginBottom: '20px' }}>{activeModal.description}</p>

              {activeModal.highlights && activeModal.highlights.length > 0 && (
                <div>
                  <div className="modal-highlights-title">Key Accomplishments & Impact</div>
                  <ul className="card-highlights" style={{ fontSize: '0.92rem' }}>
                    {activeModal.highlights.map((hl, i) => (
                      <li key={i} style={{ fontSize: '0.92rem', marginBottom: '6px' }}>{hl}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
