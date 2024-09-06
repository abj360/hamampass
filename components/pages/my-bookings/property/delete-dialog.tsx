import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TBooking } from "@/types";
import moment from "moment";
import { useTranslations } from "next-intl";
import { toast } from "@/components/ui/use-toast";

export function DeleteDialog({
  trigger,
  booking,
}: {
  trigger: React.ReactNode;
  booking: TBooking;
}) {
  const t = useTranslations("home.product-type");

  const handleDelete = async () => {
    //
    //TODO: Implement the delete functionality here
    //

    toast({
      title: "Booking Cancelled",
      description: "Your booking has been cancelled",
      duration: 500,
    });
    window.location.reload();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="flex flex-col w-[90%] rounded-lg">
        <DialogHeader>
          <DialogTitle>Cancel Booking</DialogTitle>
          <DialogDescription>
            Are you sure you want to cancel this booking?
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-between">
          <p>{booking.property.title}</p>
          <p className="text-sm">{moment(booking.date).format("D MMM")}</p>
        </div>
        <div>
          {Object.entries(booking.products).map(([key, value]) => {
            return (
              <div key={key} className="flex justify-between">
                <p>{t(key.toString())}</p>
                <p>
                  {value.count} x {value.price}TL
                </p>
              </div>
            );
          })}
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button onClick={handleDelete} type="button" variant="secondary">
              Yes Cancel Booking
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
