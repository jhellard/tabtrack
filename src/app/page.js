"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";

const Home = () => {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  return (
    <section>
      <h1>Homepage</h1>
    </section>
  );
};

export default Home;
