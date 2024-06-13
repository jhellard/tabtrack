"use client";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

// TODO: Add skeleton for thumbnail card to avoid layout shift
const VideoCard = ({ data }) => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const continueTab = () => {
    router.push(`/dashboard/${data.index}`);
  };

  const removeVideo = async () => {
    if (!user) {
      alert("You must be logged in to remove a video.");
      return;
    }

    if (!window.confirm("Are you sure you want to remove this video?")) {
      return;
    }

    const userDocRef = doc(db, "tabs", user.uid);

    try {
      const docSnapshot = await getDoc(userDocRef);
      if (docSnapshot.exists()) {
        const links = docSnapshot.data().links || [];
        const updatedLinks = links.filter((link) => link.url !== data.url);

        await updateDoc(userDocRef, {
          links: updatedLinks,
        });

        alert("Video removed successfully.");
      } else {
        alert("No video links found to remove.");
      }
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };

  return (
    <div className="w-[202px] border border-black shadow-lg relative">
      {/* Div to block playing the video in 'thumbnail' form */}
      <div className="absolute w-[200px] h-[113px] z-10"></div>
      <ReactPlayer
        width="200px"
        height="113px"
        light
        playIcon={<span></span>}
        url={data.url}
      />
      <div className="flex gap-2">
        <button
          className="w-full bg-gray-500 text-white"
          onClick={() => continueTab()}
        >
          Continue
        </button>
        <button className="w-full bg-gray-500 text-white" onClick={removeVideo}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default VideoCard;
