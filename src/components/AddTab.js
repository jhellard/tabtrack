import { useState } from "react";
import { doc, updateDoc, arrayUnion, getDoc, setDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "@/app/firebase/config";

const AddTab = () => {
  const [tabLink, setTabLink] = useState("");
  const [user] = useAuthState(auth);

  const addToDB = async () => {
    if (!user) {
      alert("You must be logged in to add a tab.");
      return;
    }

    const userDocRef = doc(db, "tabs", user.uid);

    try {
      const docSnapshot = await getDoc(userDocRef);
      if (docSnapshot.exists()) {
        await updateDoc(userDocRef, {
          links: arrayUnion(tabLink),
        });
      } else {
        await setDoc(userDocRef, {
          links: [tabLink],
        });
      }
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
