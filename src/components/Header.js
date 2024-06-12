"use client";
import Link from "next/link";
import { auth } from "@/app/firebase/config";
import { useSignOut, useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";

const Header = () => {
  const [signOut] = useSignOut(auth);
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  return (
    <header className="m-4 flex justify-between">
      <span>
        <Link href="/" className="text-xl font-bold">
          TabTrack
        </Link>
      </span>
      <nav>
        <ul className="flex gap-4">
          <li className="hover:cursor-pointer">
            <Link href="/dashboard">Dashboard</Link>
          </li>
          {!loading && !user ? (
            <li className="hover:cursor-pointer">
              <Link href="/sign-in">Sign In</Link>
            </li>
          ) : (
            <li>
              <button
                onClick={async () => {
                  const success = await signOut();
                  if (success) {
                    router.push("/");
                  }
                }}
              >
                Sign out
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
