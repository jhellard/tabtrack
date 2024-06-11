"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";

const Home = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const userSession = sessionStorage.getItem("user");

  // TODO: Enable when finished
  // if (!user && !userSession) {
  //   router.push("/sign-up");
  // }

  return (
    <section>
      <h1>Homepage</h1>
      <button
        onClick={() => {
          signOut(auth);
          sessionStorage.removeItem("user");
        }}
      >
        Log Out
      </button>
    </section>
  );
};

export default Home;
