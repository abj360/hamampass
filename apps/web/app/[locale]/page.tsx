import HomePage from "@/components/pages/home";
import mp from "@/utils/mixpanel";

export default function Home({ params }: any) {
  const { locale } = params;

  mp.track("Homepage Loaded");

  return <HomePage locale={locale} />;
}
