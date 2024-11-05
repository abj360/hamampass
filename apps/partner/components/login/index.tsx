"use client"; // This is a client component
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const LoginPage = () => {
  const router = useRouter();
  const [partnerId, setPartnerId] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("partnerId")) {
      router.push("/");
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Store the partnerId in sessionStorage
    sessionStorage.setItem("partnerId", partnerId);

    // Redirect to the Home page
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Login Page</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-3">
        <label htmlFor="partnerId" className="font-semibold">
          Partner ID:
        </label>
        <input
          type="text"
          id="partnerId"
          value={partnerId}
          onChange={(e) => setPartnerId(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="mt-3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
