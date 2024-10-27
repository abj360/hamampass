import HelpPage from "@/components/pages/help";
import Header from "@/components/commons/new-header";

const Help = () => {
  return (
    <main className="min-h-screen">
      <Header variant="white" title="Help" />
      <HelpPage />
    </main>
  );
};

export default Help;
