import { FaHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import { TProperty } from "@hamampass/db/types";
import { toast } from "@hamampass/ui/primitives/hooks/use-toast.ts";
import useTrack from "@/hooks/useTrack";
const HeartComponent = ({ property }: { property: TProperty }) => {
  const [isWishlist, setIsWishlist] = useState(false);
  const track = useTrack();

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

    const isExist = wishlist.find(
      (item: TProperty) => item.title === property.title
    );

    setIsWishlist(isExist);
  }, []);

  const handleWishlistClick = (e: any) => {
    e.stopPropagation();

    track({
      event: "wishlist heart click",
    });

    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    if (wishlist) {
      if (wishlist.find((item: TProperty) => item.title === property.title)) {
        const filteredWishlist = wishlist.filter(
          (item: TProperty) => item.title !== property.title
        );
        localStorage.setItem("wishlist", JSON.stringify(filteredWishlist));
        setIsWishlist(false);
      } else {
        localStorage.setItem(
          "wishlist",
          JSON.stringify([...wishlist, property])
        );
        setIsWishlist(true);
        toast({
          title: "Review submitted",
          className: "text-white bg-green-700 px-1 py-2",
          duration: 500,
        });
      }
    } else {
      localStorage.setItem("wishlist", JSON.stringify([property]));
      setIsWishlist(true);
      toast({
        title: "Review submitted",
        className: "text-white bg-green-700 px-1 py-2",
        duration: 500,
      });
    }
  };

  const cn = `w-6 h-6 ${isWishlist ? "text-red-600/90" : "text-black/30 "}`;
  return (
    <div className="p-3 bg-white absolute top-0 right-0 rounded-tr-md rounded-bl-3xl z-10">
      <FaHeart onClick={handleWishlistClick} className={cn} />
    </div>
  );
};

export default HeartComponent;
