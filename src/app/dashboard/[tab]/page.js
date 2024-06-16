"use client";
import { useState } from "react";
import { getFirestore, doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { app, auth } from "../../firebase/config";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const Page = ({ params }) => {
  const [user] = useAuthState(auth);
  // TODO: Add error handling
  const [value, loading, error] = useDocument(
    user ? doc(getFirestore(app), "tabs", user.uid) : null,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const [progress, setProgress] = useState(0);

  const tab = value?.data()?.links[params.tab]?.url || [];

  const handleProgress = (prog) => {
    setProgress(prog.played.toFixed(2) * 100); // Convert to percentage
  };

  return (
    <section>
      <div className="relative pt-[56.25%] mb-4">
        <ReactPlayer
          className="absolute top-0 left-0"
          url={tab}
          controls={true}
          width="100%"
          height="100%"
          onProgress={handleProgress}
        />
      </div>

      <div className="w-full h-2 bg-gray-200">
        <div
          className="h-full bg-blue-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </section>
  );
};

export default Page;
