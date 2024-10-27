import MyBookingsPage from "@/components/pages/my-bookings";
import Header from "@/components/commons/new-header";

const MyBookings = () => {
  return (
    <main className="flex flex-col min-h-screen">
      <Header variant="white" title="Reservations" />
      <MyBookingsPage />
    </main>
  );
};

export default MyBookings;
