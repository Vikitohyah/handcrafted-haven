"use client";

import { useState } from "react";

interface Props {
  onUpload: (url: string) => void;
}

export default function ImageUpload({
  onUpload,
}: Props) {
  const [uploading, setUploading] = useState(false);

  async function uploadImage(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    setUploading(true);

    const formData = new FormData();

    formData.append("file", file);
    formData.append(
      "upload_preset",
      "handcrafted-haven"
    );

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dxzszqchq/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    onUpload(data.secure_url);

    setUploading(false);
  }

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={uploadImage}
      />

      {uploading && <p>Uploading...</p>}
    </div>
  );
}