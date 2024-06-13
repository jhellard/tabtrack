"use client";
import VideoCard from "@/components/VideoCard";
import { getFirestore, doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { app, auth } from "../firebase/config";

import AddTab from "@/components/AddTab";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [value, loading, error] = useDocument(
    user ? doc(getFirestore(app), "tabs", user.uid) : null,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const links = value?.data()?.links || [];

  return (
    <section className="p-4">
      <h1 className="mb-2">Your Tabs:</h1>
      <ul className="flex gap-4 flex-wrap mb-4">
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Loading DB...</span>}
        {!loading && !error && links.length === 0 && (
          <span>No links found, are you signed in?</span>
        )}
        {links.map((url, key) => (
          <VideoCard url={url} key={key} />
        ))}
      </ul>
      <AddTab />
    </section>
  );
};

export default Dashboard;
