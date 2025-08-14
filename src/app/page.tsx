import ArabSingersList from "@/components/ArabSingersList";
import { Suspense } from "react";

// Function to fetch Arab singers from our API
async function fetchArabSingers() {
  const response = await fetch(`http://localhost:3000/api/arab-singers`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Arab singers: ${response.status}`);
  }

  return response.json();
}
export default function Home() {
  const arabListPromise = fetchArabSingers();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-6xl font-bold text-center mb-8">Welcome to My App</h1>

      <div className="w-full">
        <Suspense
          fallback={<div className="text-center">Loading Arab singers...</div>}
        >
          <ArabSingersList arabListPromise={arabListPromise} />
        </Suspense>
      </div>
    </div>
  );
}
