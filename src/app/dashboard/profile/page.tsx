"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/app/header.css";

export default function ProfilePage() {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProfile() {
      try {
        const response = await fetch("/api/seller/profile");

        if (!response.ok) return;

        const data = await response.json();

        setProfileImage(data.profileImage || "");
        setBio(data.bio || "");
        setLocation(data.location || "");
      } catch (err) {
        console.error(err);
      } finally {
        setFetching(false);
      }
    }

    loadProfile();
  }, []);

  async function handleSave() {
    try {
      setLoading(true);
      setMessage("");
      setError("");

      const response = await fetch("/api/sellers/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profileImage,
          bio,
          location,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to save profile");
        return;
      }

      setMessage("Profile updated successfully!");
      setTimeout(() => {
        router.push("/seller/dashboard");
      }, 1000);
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (fetching) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
        <p>Loading your profile...</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="profile-page">
        <section className="hero">
          <h1>Edit Seller Profile</h1>
          <p>
            Showcase your craft and help buyers learn more
          about your handmade creations.
        </p>
        </section>

        <div className="content-grid">
          {/* Preview Card */}
          <aside className="preview-card">
            <h2>Profile Preview</h2>

            <div className="avatar-wrapper">
              {profileImage ? (
                <Image
                  src={profileImage}
                  alt="Profile"
                  fill
                  className="avatar"
                />
              ) : (
                <div className="placeholder-avatar">
                  No Image
                </div>
              )}
            </div>

            <h3>Artisan Seller</h3>

            <p className="preview-location">
              📍 {location || "Your location"}
            </p>

            <p className="preview-bio">
              {bio ||
                "Your bio will appear here so buyers can learn more about your work."}
            </p>
          </aside>

          {/* Form Card */}
          <section className="form-card">
            <h2>Seller Information</h2>

            {message && (
              <div className="success-message">
                {message}
              </div>
            )}

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <div className="form-group">
              <label>Profile Picture</label>

              <p className="hint">
                Paste a Cloudinary URL or your URL.
              </p>

              <input
                type="text"
                value={profileImage}
                onChange={(e) => setProfileImage(e.target.value)}
                placeholder="Paste profile image URL"
              />
            </div>

            <div className="form-group">
              <label>Location</label>

              <input
                type="text"
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value)
                }
                placeholder="e.g. Lagos, Nigeria"
              />
            </div>

            <div className="form-group">
              <label>Bio</label>

              <textarea
                value={bio}
                onChange={(e) =>
                  setBio(e.target.value)
                }
                placeholder="Tell buyers about your craft, experience, and creative process..."
              />
            </div>

            <button
              onClick={handleSave}
              disabled={loading}
              className="save-btn"
            >
              {loading
                ? "Saving Changes..."
                : "Save Profile"}
            </button>
          </section>
        </div>

        <style jsx>{`
          .profile-page {
            min-height: 100vh;
            background: #fdf8f0;
            padding: 2rem;
          }

          .hero {
            text-align: center;
            margin-bottom: 2rem;
          }

          .hero h1 {
            font-size: 2.5rem;
            color: #6b4f3b;
            margin-bottom: 0.5rem;
          }

          .hero p {
            color: #666;
            max-width: 650px;
            margin: 0 auto;
            line-height: 1.6;
          }

          .content-grid {
            display: grid;
            grid-template-columns: 320px 1fr;
            gap: 2rem;
            max-width: 1200px;
            margin: 0 auto;
          }

          .preview-card,
          .form-card {
            background: white;
            border-radius: 20px;
            padding: 2rem;
            box-shadow: 0 10px 30px
              rgba(0, 0, 0, 0.08);
          }

          .preview-card h2,
          .form-card h2 {
            margin-bottom: 1.5rem;
            color: #6b4f3b;
          }

          .preview-card {
            text-align: center;
            height: fit-content;
          }

          .preview-image {
            margin-bottom: 1rem;
          }

          .avatar-wrapper {
            width: 140px;
            height: 140px;
            position: relative;
            border-radius: 50%;
            overflow: hidden;
          }

          .avatar {
            object-fit: cover;
          }

          .placeholder-avatar {
            width: 140px;
            height: 140px;
            margin: 0 auto;
            border-radius: 50%;
            background: #eee;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #777;
          }

          .preview-location {
            color: #777;
            margin: 1rem 0;
          }

          .preview-bio {
            color: #666;
            line-height: 1.6;
          }

          .form-group {
            margin-bottom: 1.5rem;
          }

          label {
            display: block;
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: #444;
          }

          .hint {
            font-size: 0.85rem;
            color: #888;
            margin-bottom: 0.75rem;
          }

          input,
          textarea {
            width: 100%;
            padding: 14px;
            border: 1px solid #ddd;
            border-radius: 12px;
            font-size: 1rem;
            outline: none;
          }

          input:focus,
          textarea:focus {
            border-color: #c78d5d;
          }

          textarea {
            min-height: 140px;
            resize: vertical;
          }

          .save-btn {
            width: 100%;
            padding: 14px;
            background: #8b5e3c;
            color: white;
            border: none;
            border-radius: 12px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: 0.3s;
          }

          .save-btn:hover {
            background: #6f4729;
          }

          .save-btn:disabled {
            background: #ccc;
            cursor: not-allowed;
          }

          .success-message {
            background: #eafaf1;
            color: #1e8449;
            padding: 1rem;
            border-radius: 12px;
            margin-bottom: 1rem;
          }

          .error-message {
            background: #fdecea;
            color: #c0392b;
            padding: 1rem;
            border-radius: 12px;
            margin-bottom: 1rem;
          }

          .loading-screen {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: #fdf8f0;
          }

          .loader {
            width: 50px;
            height: 50px;
            border: 4px solid #ddd;
            border-top-color: #c78d5d;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 1rem;
          }

          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }

          @media (max-width: 900px) {
            .content-grid {
              grid-template-columns: 1fr;
            }

            .preview-card {
              order: -1;
            }
          }

          @media (max-width: 600px) {
            .profile-page {
              padding: 1rem;
            }

            .hero h1 {
              font-size: 2rem;
            }

            .preview-card,
            .form-card {
              padding: 1.5rem;
            }
          }
        `}</style>
      </main>
      <Footer />
    </>
  );
}