import {
  Carousel,
  CarouselContent,
} from "@hamampass/ui/primitives/carousel.tsx";

import CarouselCardItem from "./carousel-item";
import { TReview } from "@hamampass/db/types";
import { FaGreaterThan } from "react-icons/fa";
import { useTranslations } from "@hamampass/i18n";
import { request } from "@hamampass/services";
import { useEffect, useState } from "react";
import DrawerGeneral from "@/components/commons/drawer";
import ReviewsDrawerContent from "./drawer-content";

const Cards = ({ propertyId }: { propertyId: string }) => {
  const btn = useTranslations("single.review");
  const title = useTranslations("titles");

  const [reviews, setReviews] = useState<TReview[]>([]);
  useEffect(() => {
    const fetchReviews = async () => {
      const req = await request({
        type: "get",
        endpoint: `review/${propertyId}`,
        params: { limit: 10 },
      });

      setReviews(req.data.data);
    };
    fetchReviews();
  }, [propertyId]);
  return (
    <div className=" bg-primary-400 rotate-3 my-10  px-2 rounded w-[105vw] -ml-4 relative">
      <Carousel className="rounded-none py-5  -rotate-3  ">
        <CarouselContent className=" rotate-3  pl-6 gap-5  py-1">
          {reviews
            ?.slice(0, 3)
            .map((review: TReview) => (
              <CarouselCardItem key={review.id} review={review} />
            ))}
        </CarouselContent>
      </Carousel>

      <DrawerGeneral
        trigger={
          <div className="flex items-center gap-2 justify-end -rotate-3">
            <span className="text-xs font-semibold text-primary-950">
              {btn("see-all")}
            </span>
            <FaGreaterThan size={10} className="text-primary-950" />
          </div>
        }
        content={
          <div className="overflow-y-auto  flex-1">
            <ReviewsDrawerContent reviews={reviews} />
          </div>
        }
        title={title("review-title")}
        handleOnly={true}
        fullWidth={true}
      />
    </div>
  );
};

export default Cards;
