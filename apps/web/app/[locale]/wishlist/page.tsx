import WishlistPage from "@/components/pages/wishlist";
import Header from "@/components/commons/new-header";

const wishlist = () => {
  return (
    <main className="flex flex-col min-h-screen">
      <Header variant="white" title="Wishlist" />
      <WishlistPage />
    </main>
  );
};
export default wishlist;
