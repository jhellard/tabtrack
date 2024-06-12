"use client";
import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const handleSignIn = async () => {
    try {
      const res = await signInWithEmailAndPassword(email, password);
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="grid place-items-center">
      <form className="flex flex-col items-center gap-4 p-4 mb-2">
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          required
          className="border border-blue-950 p-2 rounded"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          required
          className="border border-blue-950 p-2 rounded"
        />
      </form>
      <button
        className="border border-blue-950 py-2 px-4 rounded"
        onClick={() => handleSignIn()}
      >
        Sign In
      </button>

      <Link href="/sign-up">Need an account? Click here</Link>
    </section>
  );
};

export default SignIn;
