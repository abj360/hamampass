import HomePage from "@/components/pages/home";
import mixpanel from "@/utils/mixpanel";

export default function Home({ params }: any) {
  const { locale } = params;

  mixpanel.track("Home Page Viewed");

  return <HomePage locale={locale} />;
}
