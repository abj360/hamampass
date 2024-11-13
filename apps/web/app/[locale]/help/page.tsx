import HelpPage from "@/components/pages/help";
import Header from "@/components/commons/new-header";

const Help = () => {
  return (
    <main className="min-h-screen">
      <Header variant="white" isHambuger={true} />
      <HelpPage />
    </main>
  );
};

export default Help;
