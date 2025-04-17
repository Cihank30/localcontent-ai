// filepath: c:\Users\KayaCi2\localcontent-ai\src\app\dashboard\analytics\error.js
"use client";

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white bg-gray-950">
      <h1 className="text-3xl font-bold mb-4">Une erreur est survenue</h1>
      <p className="mb-4">{error.message}</p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-purple-500 text-white rounded"
      >
        Réessayer
      </button>
    </div>
  );
}