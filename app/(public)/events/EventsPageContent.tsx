'use client';

import React, { useState, Suspense, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Trophy, Sparkles, Code, Calendar, MapPin, Users } from 'lucide-react';
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { EventSummary } from '@/types/event';
import { EventSearch } from '@/components/Events/EventSearch';
import { EventFilters } from '@/components/Events/EventFilters';
import { ActiveFilters } from '@/components/Events/ActiveFilters';
import { Pagination } from '@/components/Events/Pagination';

// Helper to determine if an event belongs to Hackathons vs Bootcamps
function isHackathon(ev: EventSummary): boolean {
  const type = (ev.type || '').toUpperCase();
  const slug = (ev.slug || '').toLowerCase();
  const title = (ev.title || '').toLowerCase();
  const hasTag = ev.tags?.some(t => {
    const tag = t.tag.toLowerCase();
    return tag.includes('hackathon') || tag.includes('competition') || tag.includes('contest');
  });

  return (
    type === 'HACKATHON' ||
    type === 'COMPETITION' ||
    hasTag ||
    slug.includes('hackathon') ||
    slug.includes('competition') ||
    slug.includes('visio-spark') ||
    slug.includes('algothon') ||
    title.includes('hackathon') ||
    title.includes('competition')
  );
}

// ─── Event List Item ────────────────────────────────────────────────────────

const EventListItem = ({ title, slug, date, location, type, tags, description, badgeUrl, imageUrl, _count }: EventSummary) => {
  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase();
  const year = dateObj.getFullYear();
  const isHack = isHackathon({ title, slug, date, location, type, tags, description, badgeUrl, imageUrl, _count } as EventSummary);

  const themeColor = isHack ? '#EA4335' : '#4285F4';

  return (
    <div className="event-card animate-fade-in" style={{ borderLeft: `4px solid ${themeColor}` }}>
      <div className="event-badge-wrapper">
        <div className="badge-outer" style={{ borderColor: `${themeColor}20` }}>
          <img
            src={imageUrl || badgeUrl || "https://fonts.gstatic.com/s/i/productlogos/googleg_standard/v9/64.png"}
            alt={title}
            className="badge-image"
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              (e.target as HTMLImageElement).src = 'https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png';
            }}
          />
        </div>
      </div>
      <div className="event-content">
        <div className="event-meta">
          <span className="meta-date">{formattedDate}, {year}</span>
          <span className="meta-sep">—</span>
          <span className="meta-type" style={{ color: themeColor, fontWeight: 700 }}>
            {isHack ? '🏆 HACKATHON / COMPETITION' : '⚡ BOOTCAMP / WORKSHOP'}
          </span>
          <span className="meta-sep">—</span>
          <span className="meta-loc">{location.toUpperCase()}</span>
          {dateObj < new Date() && (
            <span className="past-event-badge" style={{ 
              background: '#f8f9fa', 
              color: '#5f6368', 
              padding: '2px 10px', 
              borderRadius: 100, 
              fontSize: '11px', 
              border: '1px solid #dadce0',
              fontWeight: 600,
              textTransform: 'uppercase'
            }}>Past Event</span>
          )}
        </div>
        <h2 className="event-title">{title}</h2>
        <div className="tag-list">
          {tags.map((t, idx) => (
            <span key={idx} className="event-tag">{t.tag}</span>
          ))}
        </div>
        <p className="event-desc">{description}</p>

        {_count?.registrations > 0 && (
          <div style={{
            fontSize: '0.85rem',
            color: '#5F6368',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '1.5rem',
            fontWeight: 500
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#34A853' }} />
            {_count.registrations} registered
          </div>
        )}

        <Link href={`/events/${slug}`}>
          <button className="details-btn" style={{ backgroundColor: themeColor }}>View details</button>
        </Link>
      </div>
    </div>
  );
};

// ─── Calendar View (URL-driven) ─────────────────────────────────────────────

const CalendarView = ({ allEvents }: { allEvents: EventSummary[] }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());

  const selectedDate = searchParams.get('date') ?? '';

  // Build a set for O(1) lookup
  const eventDates = new Set(
    allEvents.map(e => {
      const d = new Date(e.date);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    })
  );

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const cells = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const monthLabel = new Date(viewYear, viewMonth).toLocaleString('en-PK', {
    month: 'long', year: 'numeric',
  });

  function changeMonth(offset: number) {
    const d = new Date(viewYear, viewMonth + offset, 1);
    setViewMonth(d.getMonth());
    setViewYear(d.getFullYear());
  }

  function selectDate(day: number) {
    const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const params = new URLSearchParams(searchParams.toString());
    if (selectedDate === dateStr) {
      params.delete('date');
    } else {
      params.set('date', dateStr);
    }
    params.delete('page');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="cal-container animate-fade-in">
      {/* Header */}
      <div className="cal-header">
        <div className="cal-month-nav">
          <button className="icon-btn" onClick={() => changeMonth(-1)}>
            <ChevronLeft size={20} />
          </button>
          <h3>{monthLabel}</h3>
          <button className="icon-btn" onClick={() => changeMonth(1)}>
            <ChevronRight size={20} />
          </button>
        </div>
        <button
          className="cal-today-btn"
          onClick={() => { setViewMonth(today.getMonth()); setViewYear(today.getFullYear()); }}
        >
          Today
        </button>
      </div>

      {/* Grid */}
      <div className="cal-grid">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
          <div key={d} className="cal-weekday">{d}</div>
        ))}

        {cells.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} className="cal-day empty" />;

          const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const hasEvent = eventDates.has(dateStr);
          const isToday = dateStr === todayStr;
          const isSelected = selectedDate === dateStr;

          return (
            <div
              key={day}
              className={`cal-day ${hasEvent ? 'has-ev' : ''} ${isSelected ? 'active' : ''}`}
              onClick={() => hasEvent && selectDate(day)}
              style={{ cursor: hasEvent ? 'pointer' : 'default' }}
              title={hasEvent ? 'Click to filter events for this date' : undefined}
            >
              <span className="day-num" style={{
                color: isSelected ? '#1a73e8' : isToday ? '#EA4335' : '#70757a',
                fontWeight: isToday || isSelected ? 700 : 500,
              }}>
                {day}
              </span>
              <div className="dot-box">
                {hasEvent && (
                  <div
                    className="ev-dot"
                    style={{ backgroundColor: isSelected ? '#1a73e8' : '#4285F4' }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ─── Main Page Content (client shell) ───────────────────────────────────────

const EventsPageContent = ({
  events,
  total,
  page,
  pages,
  meta,
  allEvents,
}: {
  events: EventSummary[]
  total: number
  page: number
  pages: number
  meta: { types: string[]; topics: string[] }
  allEvents: EventSummary[]
}) => {
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [selectedSection, setSelectedSection] = useState<'all' | 'hackathons' | 'bootcamps'>('all');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => { setIsMounted(true); }, []);

  const hackathons = events.filter(isHackathon);
  const bootcamps = events.filter(e => !isHackathon(e));

  return (
    <div className="events-root">
      <style>{`
        .event-card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
          border: 1px solid #f1f3f4;
          border-left-width: 4px;
        }

        .category-switcher {
          display: flex;
          gap: 12px;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .cat-tab {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 100px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          border: 1px solid #dadce0;
          background: white;
          color: #5f6368;
          transition: all 0.2s ease;
        }

        .cat-tab:hover {
          border-color: #202124;
          color: #202124;
        }

        .cat-tab.active-all {
          background: #202124;
          color: white;
          border-color: #202124;
        }

        .cat-tab.active-hack {
          background: #EA4335;
          color: white;
          border-color: #EA4335;
        }

        .cat-tab.active-boot {
          background: #4285F4;
          color: white;
          border-color: #4285F4;
        }

        .past-event-badge {
          margin-left: auto;
        }

        @media (max-width: 768px) {
          .event-card {
            padding: 16px !important;
            border-radius: 14px !important;
          }
          .past-event-badge {
            margin-left: 0;
          }
          .section-header-banner {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
            padding: 1rem;
          }
          .category-switcher {
            gap: 8px;
            margin-bottom: 1.25rem;
          }
          .cat-tab {
            padding: 8px 14px;
            font-size: 0.82rem;
          }
        }
      `}</style>

      {/* View switcher */}
      <nav className="view-switcher animate-fade-in">
        <div
          className={`view-tab ${viewMode === 'list' ? 'active' : ''}`}
          onClick={() => setViewMode('list')}
        >
          List View
        </div>
        <div
          className={`view-tab ${viewMode === 'calendar' ? 'active' : ''}`}
          onClick={() => setViewMode('calendar')}
        >
          Calendar View
        </div>
      </nav>

      {/* Filter bar */}
      <div className="filter-bar animate-fade-in">
        <Suspense fallback={null}>
          <EventSearch />
        </Suspense>
        <Suspense fallback={null}>
          <EventFilters types={meta.types} topics={meta.topics} />
        </Suspense>
      </div>

      {/* Active filter chips */}
      <Suspense fallback={null}>
        <ActiveFilters />
      </Suspense>

      {/* Category Section Switcher Tabs */}
      <div className="category-switcher animate-fade-in">
        <button
          className={`cat-tab ${selectedSection === 'all' ? 'active-all' : ''}`}
          onClick={() => setSelectedSection('all')}
        >
          <Sparkles size={16} /> All Events ({events.length})
        </button>
        <button
          className={`cat-tab ${selectedSection === 'hackathons' ? 'active-hack' : ''}`}
          onClick={() => setSelectedSection('hackathons')}
        >
          <Trophy size={16} /> Hackathons & Competitions ({hackathons.length})
        </button>
        <button
          className={`cat-tab ${selectedSection === 'bootcamps' ? 'active-boot' : ''}`}
          onClick={() => setSelectedSection('bootcamps')}
        >
          <Code size={16} /> Bootcamps & Workshops ({bootcamps.length})
        </button>
      </div>

      {/* Calendar view */}
      {viewMode === 'calendar' && (
        <Suspense fallback={<div style={{ textAlign: 'center', padding: 40, color: '#5f6368' }}>Loading calendar…</div>}>
          <CalendarView allEvents={allEvents} />
          {/* Show filtered events below the calendar when a date is selected */}
          {searchParams.get('date') && (
            <div className="event-list animate-fade-in" style={{ marginTop: 40 }}>
              <p style={{ fontSize: '0.9rem', color: '#5F6368', marginBottom: 24 }}>
                Showing {events.length} of {total} events
              </p>
              {events.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 0', color: '#5f6368' }}>
                  <p>No events on this date.</p>
                </div>
              ) : (
                events.map(ev => <EventListItem key={ev.slug} {...ev} />)
              )}
            </div>
          )}
        </Suspense>
      )}

      {/* List view with two dedicated sections: Hackathons & Bootcamps */}
      {viewMode === 'list' && (
        <div className="animate-fade-in">
          <div className="event-list">
            {/* ─── ALL EVENTS VIEW ─── */}
            {selectedSection === 'all' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: 56 }}>
                {events.map(ev => (
                  <EventListItem key={ev.slug} {...ev} />
                ))}
              </div>
            )}

            {/* ─── HACKATHONS SECTION ─── */}
            {selectedSection === 'hackathons' && hackathons.length > 0 && (
              <div className="section-group animate-fade-in" style={{ marginBottom: 56 }}>
                <div className="section-header-banner" style={{ background: '#fce8e6', borderLeft: '4px solid #EA4335' }}>
                  <div>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#c5221f', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Trophy size={22} color="#EA4335" /> Hackathons & Competitions
                    </h2>
                    <p style={{ margin: '4px 0 0', fontSize: '0.9rem', color: '#5f6368' }}>
                      High-stakes competitive innovation challenges, AI hackathons, and speed coding arenas
                    </p>
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#c5221f', background: 'white', padding: '4px 12px', borderRadius: 100 }}>
                    {hackathons.length} Events
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  {hackathons.map(ev => (
                    <EventListItem key={ev.slug} {...ev} />
                  ))}
                </div>
              </div>
            )}

            {/* ─── BOOTCAMPS SECTION ─── */}
            {selectedSection === 'bootcamps' && bootcamps.length > 0 && (
              <div className="section-group animate-fade-in" style={{ marginBottom: 56 }}>
                <div className="section-header-banner" style={{ background: '#e8f0fe', borderLeft: '4px solid #4285F4' }}>
                  <div>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#174ea6', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Code size={22} color="#4285F4" /> Bootcamps & Workshops
                    </h2>
                    <p style={{ margin: '4px 0 0', fontSize: '0.9rem', color: '#5f6368' }}>
                      Intensive hands-on training series, developer codelabs, masterclasses, and chapter sessions
                    </p>
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#174ea6', background: 'white', padding: '4px 12px', borderRadius: 100 }}>
                    {bootcamps.length} Events
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  {bootcamps.map(ev => (
                    <EventListItem key={ev.slug} {...ev} />
                  ))}
                </div>
              </div>
            )}

            {events.length === 0 && (
              <div style={{ textAlign: 'center', padding: '100px 0', color: '#5f6368' }}>
                <p>No events found matching your filters.</p>
                <Link
                  href="/events"
                  className="details-btn"
                  style={{ display: 'inline-block', marginTop: '1rem', textDecoration: 'none' }}
                >
                  Clear all filters
                </Link>
              </div>
            )}
          </div>

          {/* Pagination */}
          <Suspense fallback={null}>
            <Pagination currentPage={page} totalPages={pages} />
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default EventsPageContent;
