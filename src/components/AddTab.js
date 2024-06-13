import { useState, useEffect } from "react";
import { doc, updateDoc, arrayUnion, getDoc, setDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "@/app/firebase/config";

const AddTab = () => {
  const [tabLink, setTabLink] = useState("");
  const [user] = useAuthState(auth);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const fetchLinks = async () => {
      if (user) {
        const userDocRef = doc(db, "tabs", user.uid);
        const docSnapshot = await getDoc(userDocRef);
        if (docSnapshot.exists()) {
          setLinks(docSnapshot.data().links || []);
        }
      }
    };
    fetchLinks();
  }, [user]);

  const addToDB = async () => {
    if (!user) {
      alert("You must be logged in to add a tab.");
      return;
    }

    if (!tabLink.includes("https://www.youtube.com/watch?v=")) {
      alert("Please enter a valid YouTube link.");
      return;
    }

    const userDocRef = doc(db, "tabs", user.uid);

    try {
      const newLink = { url: tabLink, index: links.length };
      const updatedLinks = [...links, newLink];

      if (links.length > 0) {
        await updateDoc(userDocRef, {
          links: arrayUnion(newLink),
        });
      } else {
        await setDoc(userDocRef, {
          links: updatedLinks,
        });
      }
      setLinks(updatedLinks); // Update the local state
      setTabLink(""); // Clear the input field after adding the link
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input
        value={tabLink}
        onChange={(e) => setTabLink(e.target.value)}
        type="text"
        required
        placeholder="Enter YouTube link..."
      />
      <button onClick={addToDB}>Add</button>
    </form>
  );
};

export default AddTab;
