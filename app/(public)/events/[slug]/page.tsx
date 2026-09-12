import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
    Facebook,
    Twitter,
    Linkedin,
    Instagram,
} from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { EventDetail } from '@/types/event';
import StickyRSVPBar from '@/components/Events/StickyRSVPBar';

async function getEvent(slug: string): Promise<EventDetail> {
    const event = await prisma.event.findUnique({
        where: { slug },
        include: {
            tags: true,
            agendaItems: { orderBy: { order: 'asc' } },
            _count: { select: { registrations: true } },
        },
    });

    if (!event || !event.isPublished) {
        notFound();
    }

    return event as unknown as EventDetail;
}

interface EventSpeaker {
    name: string;
    role: string;
    organization: string;
    imageUrl: string;
    linkedin?: string;
}

const IGNORE_PATTERNS = [
    /panel/i,
    /committee/i,
    /teams?/i,
    /leadership/i,
    /arena/i,
    /mentors?/i,
    /organizing team/i,
    /core team/i,
    /campus leads?/i,
    /domain leads?/i,
    /raheem/i,
    /rahim/i,
    /adil/i
];

const KNOWN_MENTORS: Record<string, EventSpeaker> = {
    'farhan ashraf': {
        name: 'Farhan Ashraf',
        role: 'AI SecOps Engineer & GitHub Campus Expert',
        organization: 'Systems Limited',
        imageUrl: '/images/mentors/farhan_ashraf.png',
        linkedin: 'https://linkedin.com'
    },
    'dr. wasif': {
        name: 'Dr. Wasif Nisar',
        role: 'Faculty Advisor',
        organization: 'COMSATS University Wah',
        imageUrl: '/images/mentors/dr_wasif.png',
        linkedin: 'https://linkedin.com'
    },
    'muhammad adil': {
        name: 'Muhammad Adil',
        role: 'GitHub Campus Expert',
        organization: 'TechCre Solutions',
        imageUrl: '/images/mentors/muhammad_adil.png',
        linkedin: 'https://linkedin.com'
    },
    'munsif raza': {
        name: 'Munsif Raza',
        role: 'Mentor & Keynote Speaker',
        organization: 'GDGoC CUI Wah',
        imageUrl: '/images/mentors/munsif_raza.png',
        linkedin: 'https://linkedin.com'
    },
    'sumama zaeem': {
        name: 'Sumama Zaeem',
        role: 'Technical Speaker',
        organization: 'GDGoC CUI Wah',
        imageUrl: '/images/mentors/sumama_zaeem.png',
        linkedin: 'https://linkedin.com'
    }
};

function resolveEventSpeakers(agendaItems: { speaker: string | null; title: string }[], members: any[], slug?: string): EventSpeaker[] {
    if (slug === 'hack-the-vibe-2026') {
        return [
            KNOWN_MENTORS['munsif raza'],
            KNOWN_MENTORS['farhan ashraf']
        ].filter(Boolean);
    }

    if (slug === 'hack-data-v1') {
        return [
            KNOWN_MENTORS['farhan ashraf']
        ].filter(Boolean);
    }

    const resolved = new Map<string, EventSpeaker>();

    for (const item of agendaItems) {
        if (!item.speaker) continue;

        const noParens = item.speaker.replace(/\s*\([^)]*\)/g, '').trim();
        const parts = noParens.split(/\s*(&|\band\b)\s*/i).filter(p => p && p !== '&' && p.toLowerCase() !== 'and');

        for (const raw of parts) {
            const cleaned = raw.replace(/^mr\.?\s+/i, '').trim();
            if (!cleaned || cleaned.length < 3) continue;

            if (IGNORE_PATTERNS.some(pattern => pattern.test(cleaned))) continue;

            const lower = cleaned.toLowerCase();
            const key = lower.includes('ubaid') ? 'ubaid-ghazi' : lower.includes('ismail') ? 'muhammad-ismail' : lower.replace(/[^a-z0-9]/g, '');

            if (resolved.has(key)) continue;

            const mentorEntry = Object.entries(KNOWN_MENTORS).find(([mKey]) => lower.includes(mKey));
            if (mentorEntry) {
                resolved.set(key, mentorEntry[1]);
                continue;
            }

            const memberMatch = members.find(m => {
                const mLower = m.name.toLowerCase();
                if (lower.includes('ubaid') && mLower.includes('ubaid')) return true;
                if (lower.includes('ismail') && mLower.includes('ismail')) return true;
                return mLower.includes(lower) || lower.includes(mLower);
            });

            if (memberMatch) {
                resolved.set(key, {
                    name: memberMatch.name,
                    role: memberMatch.tagline || (memberMatch.role === 'admin' ? 'Faculty Head' : memberMatch.role === 'core' ? 'Core Lead' : 'Speaker'),
                    organization: 'GDGoC CUI Wah',
                    imageUrl: memberMatch.imageUrl || '/images/team/ubaid.png',
                    linkedin: memberMatch.linkedin || 'https://linkedin.com'
                });
                continue;
            }

            resolved.set(key, {
                name: cleaned,
                role: 'Speaker',
                organization: 'GDGoC CUI Wah',
                imageUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(cleaned)}&background=4285f4&color=fff&size=256`,
                linkedin: 'https://linkedin.com'
            });
        }
    }

    const speakerList = Array.from(resolved.values());

    if (speakerList.length === 0) {
        return [{
            name: 'Ubaid Ghazi',
            role: 'GDG on Campus Lead',
            organization: 'GDGoC CUI Wah',
            imageUrl: '/images/team/ubaid.png',
            linkedin: 'https://linkedin.com'
        }];
    }

    return speakerList;
}

export default async function EventDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params;
    const event = await getEvent(slug);

    let members: any[] = [];
    try {
        members = await prisma.member.findMany({
            where: { isActive: true },
            select: {
                id: true,
                name: true,
                slug: true,
                role: true,
                tagline: true,
                imageUrl: true,
                linkedin: true,
            },
        });
    } catch (e) {
        console.warn('Could not load members for event host resolution:', e);
    }

    const speakers = resolveEventSpeakers(event.agendaItems, members, slug);

    const startDate = new Date(event.date);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // 2 hours duration by default

    const formatDate = (date: Date) => 
        date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const formatTime = (date: Date) => 
        date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

    const dateRange = `${formatDate(startDate)}, ${formatTime(startDate)} – ${formatTime(endDate)}`;

    return (
        <div className="event-detail-root">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&display=swap');
                
                .event-detail-root {
                    font-family: 'Google Sans', sans-serif;
                    background-color: #ffffff;
                    color: #3c4043;
                    line-height: 1.5;
                    -webkit-font-smoothing: antialiased;
                }

                .container {
                    max-width: 1140px;
                    margin: 0 auto;
                    padding: 0 16px;
                }

                /* Banner Section */
                header.event-header {
                    padding-top: 32px;
                    margin-bottom: 48px;
                }

                .banner-container {
                    background-color: #0d1b2a;
                    border-radius: 12px;
                    overflow: hidden;
                    position: relative;
                    width: 100%;
                    max-width: 1140px;
                    aspect-ratio: 16 / 9;
                    max-height: 460px;
                    margin: 0 auto 32px auto;
                }

                /* Title and Metadata */
                .event-main-title { font-size: 36px; font-weight: 700; color: #202124; margin-bottom: 16px; letter-spacing: -0.01em; }
                .chapter-link { color: #1a73e8; text-decoration: none; font-size: 14px; font-weight: 500; display: block; margin-bottom: 8px; }
                .chapter-link:hover { text-decoration: underline; }
                .event-intro { color: #5f6368; font-size: 15px; max-width: 850px; margin-bottom: 24px; }
                .social-links { display: flex; gap: 12px; }
                .social-icon { width: 32px; height: 32px; border: 1px solid #dadce0; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #5f6368; text-decoration: none; font-size: 12px; transition: background-color 0.2s; }
                .social-icon:hover { background-color: #f8f9fa; }

                /* Main Content Layout */
                .content-grid { display: grid; grid-template-columns: 1fr 3fr; gap: 48px; padding: 48px 0; }

                /* Sidebar */
                .sidebar-title { font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 16px; color: #202124; }
                .theme-pill { border: 1px solid #dadce0; border-radius: 20px; padding: 6px 16px; font-size: 13.5px; display: inline-block; margin-bottom: 10px; color: #3c4043; margin-right: 8px; }

                /* About Section */
                .about-title { font-size: 36px; font-weight: 400; color: #202124; margin-bottom: 32px; }
                .about-text { color: #3c4043; font-size: 15px; line-height: 1.6; }
                .about-text p { margin-bottom: 24px; }

                /* Hosts Section */
                .hosts-section { padding-top: 48px; margin-bottom: 96px; border-top: 1px solid #f1f3f4; }
                .section-center-title { font-size: 36px; font-weight: 400; text-align: center; margin-bottom: 64px; }
                .hosts-flex { display: flex; justify-content: center; gap: 64px; flex-wrap: wrap; }
                .host-card { text-align: center; width: 220px; }
                .avatar-wrapper { position: relative; display: inline-block; margin-bottom: 16px; }
                .host-avatar { width: 140px; height: 140px; border-radius: 50%; object-fit: cover; border: 4px solid #fff; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
                .host-social-badge { position: absolute; bottom: 4px; right: 4px; background: white; border-radius: 50%; padding: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.15); display: flex; gap: 4px; }
                .host-social-badge i { font-size: 12px; }
                .host-name { font-size: 20px; font-weight: 700; color: #202124; margin-bottom: 4px; }
                .host-org { font-size: 13px; color: #5f6368; font-weight: 500; }
                .host-role { font-size: 13px; color: #80868b; }

                @media (max-width: 768px) {
                    .content-grid { grid-template-columns: 1fr; }
                    .banner-container { width: 100%; aspect-ratio: 16 / 9; height: auto; max-height: 280px; padding: 0; border-radius: 10px; margin-bottom: 20px; }
                    .banner-graphic { display: none; }
                    .event-main-title { font-size: 26px; }
                }
            `}</style>

            <header className="event-header">
                <div className="banner-container">
                    {event.imageUrl ? (
                        <img 
                            src={event.imageUrl} 
                            alt={event.title} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        />
                    ) : (
                        <div style={{ width: '100%', height: '100%', backgroundColor: '#0d1b2a' }} />
                    )}
                </div>

                <div className="container">
                    <h1 className="event-main-title">{event.title}</h1>
                    <Link href="/" className="chapter-link">GDG on Campus COMSATS University Wah - Wah Cantt, Pakistan</Link>
                    <p className="event-intro">
                        {event.description.substring(0, 200)}...
                    </p>
                </div>

                <div className="container" style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <div className="social-links">
                        {event.instagramUrl && (
                            <a href={event.instagramUrl} target="_blank" rel="noopener noreferrer" className="social-icon">
                                <Instagram size={16} />
                            </a>
                        )}
                        {event.linkedinUrl && (
                            <a href={event.linkedinUrl} target="_blank" rel="noopener noreferrer" className="social-icon">
                                <Linkedin size={16} />
                            </a>
                        )}
                    </div>
                </div>
            </header>

            <StickyRSVPBar slug={event.slug} dateRange={dateRange} />

            <main className="container content-grid">
                <aside>
                    <h3 className="sidebar-title">Key Themes</h3>
                    {event.tags.length > 0 ? (
                        event.tags.map(t => (
                            <div key={t.id} className="theme-pill">{t.tag}</div>
                        ))
                    ) : (
                        <div className="theme-pill">General Tech</div>
                    )}
                </aside>

                <article>
                    <section>
                        <h2 className="about-title">About this event</h2>
                        <div className="about-text">
                            <p>{event.description}</p>
                            
                            <div style={{ fontWeight: 700, color: '#202124', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                                ✨ Location: <span style={{ color: '#1a73e8' }}>{event.location}</span> ({event.locationType})
                            </div>

                            {event.agendaItems.length > 0 && (
                                <div style={{ borderTop: '1px solid #f1f3f4', paddingTop: '32px', marginTop: '32px' }}>
                                    <h3 style={{ fontWeight: 700, marginBottom: '24px', color: '#202124' }}>Event Agenda</h3>
                                    <ul style={{ listStyle: 'none', padding: 0 }}>
                                        {event.agendaItems.map((item) => (
                                            <li key={item.id} style={{ marginBottom: '20px', display: 'flex', gap: '20px' }}>
                                                <div style={{ minWidth: '80px', fontWeight: 700, color: '#1a73e8' }}>{item.time}</div>
                                                <div>
                                                    <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{item.title}</div>
                                                    <div style={{ color: '#5f6368', fontSize: '0.95rem' }}>{item.description}</div>
                                                    {item.speaker && <div style={{ fontSize: '0.85rem', color: '#1a73e8', fontWeight: 600, marginTop: '4px' }}>Speaker: {item.speaker}</div>}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <p style={{ fontSize: '14px', color: '#5f6368', paddingTop: '16px', borderTop: '1px solid #f1f3f4' }}>
                                To participate in this campaign, you are required to be a part of <strong>GDG on Campus, CUI Wah</strong>. Free membership can be obtained from our community page.
                            </p>
                        </div>
                    </section>

                    {/* Hosts Section */}
                    <section className="hosts-section">
                        <h2 className="section-center-title">Event Speakers & Hosts</h2>
                        <div className="hosts-flex">
                            {speakers.map((host, idx) => (
                                <div className="host-card" key={idx}>
                                    <div className="avatar-wrapper">
                                        <img src={host.imageUrl} className="host-avatar" alt={host.name} />
                                        {host.linkedin && (
                                            <a href={host.linkedin} target="_blank" rel="noopener noreferrer" className="host-social-badge" aria-label={`${host.name} LinkedIn`}>
                                                <Linkedin size={12} color="#0a66c2" />
                                            </a>
                                        )}
                                    </div>
                                    <h4 className="host-name">{host.name}</h4>
                                    <p className="host-org">{host.organization}</p>
                                    <p className="host-role">{host.role}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </article>
            </main>
        </div>
    );
}
