import Header from "@/components/commons/new-header";
import ShoppingCardPage from "@/components/pages/shopping-card";

const ShoppingCard = async () => {
  return (
    <main className="h-full flex flex-col">
      <Header variant="white" isHambuger={true} />
      <ShoppingCardPage />
    </main>
  );
};

export default ShoppingCard;
