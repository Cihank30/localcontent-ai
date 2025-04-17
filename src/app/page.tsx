"use client";

import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-white">
      {/* En-tête */}
      <header className="w-full px-6 py-4 flex justify-between items-center bg-gray-900">
        <h1 className="text-xl font-bold text-purple-400">Local Content AI</h1>
        <nav className="flex space-x-4">
          <a href="/" className="text-gray-300 hover:text-white">Accueil</a>
          <a href="/dashboard" className="text-gray-300 hover:text-white">Dashboard</a>
          <a href="/dashboard/analytics" className="text-gray-300 hover:text-white">Analytics</a>
        </nav>
      </header>

      {/* Arrière-plan vidéo */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/background.mp4" type="video/mp4" />
        Votre navigateur ne supporte pas les vidéos HTML5.
      </video>

      {/* Overlay pour assombrir la vidéo */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>

      {/* Contenu principal */}
      <div className="relative z-10 text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-extrabold text-purple-400 drop-shadow-lg"
        >
          Bienvenue sur Local Content AI
        </motion.h1>
        <p className="text-lg md:text-xl mt-4 text-gray-300 drop-shadow-md">
          Créez du contenu local optimisé par l&apos;intelligence artificielle.
        </p>
        <a
          href="/dashboard"
          className="mt-8 inline-block px-8 py-4 bg-purple-500 text-white text-lg font-bold rounded-lg shadow-lg hover:bg-purple-600 transition duration-300"
        >
          Commencer maintenant
        </a>
      </div>
    </div>
  );
}