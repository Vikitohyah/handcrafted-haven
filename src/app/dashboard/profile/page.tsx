"use client";

import { useState } from "react";
import ImageUpload from "@/components/ImageUpload";

export default function ProfilePage() {
  const [profileImage, setProfileImage] =
    useState("");

  const [bio, setBio] = useState("");
  const [location, setLocation] =
    useState("");
  const [specialty, setSpecialty] =
    useState("");

  async function handleSave() {
    const response = await fetch(
      "/api/sellers/update",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          profileImage,
          bio,
          location,
          specialty,
        }),
      }
    );

    const data = await response.json();

    alert(data.message);
  }

  return (
    <main
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "2rem",
      }}
    >
      <h1>Edit Seller Profile</h1>

      <br />

      <ImageUpload
        onUpload={(url) =>
          setProfileImage(url)
        }
      />

      {profileImage && (
        <img
          src={profileImage}
          alt="Profile"
          width={200}
        />
      )}

      <br />

      <input
        placeholder="Specialty"
        value={specialty}
        onChange={(e) =>
          setSpecialty(e.target.value)
        }
      />

      <br />
      <br />

      <input
        placeholder="Location"
        value={location}
        onChange={(e) =>
          setLocation(e.target.value)
        }
      />

      <br />
      <br />

      <textarea
        placeholder="Bio"
        value={bio}
        onChange={(e) =>
          setBio(e.target.value)
        }
      />

      <br />
      <br />

      <button onClick={handleSave}>
        Save Profile
      </button>
    </main>
  );
}