export const dynamic = 'force-dynamic';
import Hero from "@/components/Hero/Hero";
import HeroStrap from "@/components/Hero/HeroStrap";
import RecruitmentBanner from "@/components/Home/RecruitmentBanner";
import AnnouncementsBanner from "@/components/Announcements/AnnouncementsBanner";
import FeaturesDashboard from "@/components/Features/FeaturesDashboard";
import EventsCarousel from "@/components/Events/EventsCarousel";
import TeamSection from "@/components/Team/TeamSection";
import Partners from '@/components/Partners/Partners';
import Mentors from '@/components/Mentors/Mentors';
import ChapterPhotos from '@/components/ChapterPhotos/ChapterPhotos';
import CTA from "@/components/CTA/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <HeroStrap />
      <RecruitmentBanner />
      <AnnouncementsBanner />
      <FeaturesDashboard />
      <EventsCarousel />
      <TeamSection />
      <Partners />
      <Mentors />
      <ChapterPhotos />
      <CTA />
    </>
  );
}
