import Header from "@/components/commons/header";
import { SignIn } from "@/components/auth/sign-in";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Header />
      <h1>Admin Page</h1>
      <SignIn />
    </div>
  );
}
