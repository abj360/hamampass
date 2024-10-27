import ProfilePageComponent from "@/components/pages/profile";
import Header from "@/components/commons/new-header";

const Profile = async () => {
  return (
    <main>
      <Header variant="white" title="Profile" />
      <ProfilePageComponent />
    </main>
  );
};

export default Profile;
