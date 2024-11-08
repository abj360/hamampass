"use client";

import { useState, useEffect, use } from "react";
import BannerSection from "./banner";
import HeroSection from "./hero";
import CardSection from "./card";
import StickyHeader from "./sticky-header";
import { useSearchParams } from "next/navigation";
import useTrack from "@/hooks/useTrack";

const HomePage = ({ locale }: { locale: string }) => {
  const [isStickyVisible, setIsStickyVisible] = useState(false);
  const searchParams = useSearchParams();
  const partnerParam = searchParams?.get("partner");
  const track = useTrack();

  track({ event: "home page loaded" });

  useEffect(() => {
    const handleScroll = () => {
      const dateFormElement = document.querySelector("#dateForm");
      if (dateFormElement) {
        const rect = dateFormElement.getBoundingClientRect();
        const isOutOfView = rect.bottom < 0;

        setIsStickyVisible(isOutOfView);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    partnerParam && sessionStorage.setItem("partnerId", partnerParam);
  }, [partnerParam]);

  return (
    <div className="flex flex-col min-h-svh">
      <HeroSection locale={locale} />
      {isStickyVisible && <StickyHeader />}
      <BannerSection>
        <CardSection />
      </BannerSection>
    </div>
  );
};

export default HomePage;
