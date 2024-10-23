import BannerSection from "./banner";
import HeroSection from "./hero";
import CardSection from "./card";

const HomePage = ({ locale }: { locale: string }) => {
  return (
    <div className="flex flex-col  min-h-svh ">
      <HeroSection locale={locale} />
      <BannerSection>
        <CardSection />
      </BannerSection>
    </div>
  );
};

export default HomePage;
