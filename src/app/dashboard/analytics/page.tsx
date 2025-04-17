"use client";

import { useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

export default function AnalyticsPage() {
  const [userCount] = useState<number>(123);
  const [postsGenerated] = useState<number>(456);
  const [dailyConnections] = useState<number>(78);

  // Données pour le graphique en secteurs (Pie Chart)
  const pieData = {
    labels: ["Utilisateurs actifs", "Utilisateurs inactifs"],
    datasets: [
      {
        data: [userCount, 200 - userCount],
        backgroundColor: ["#4F46E5", "#D1D5DB"],
        hoverBackgroundColor: ["#6366F1", "#E5E7EB"],
      },
    ],
  };

  // Données pour le graphique en barres (Bar Chart)
  const barData = {
    labels: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"],
    datasets: [
      {
        label: "Connexions quotidiennes",
        data: [50, 78, 65, 90, 120, 80, dailyConnections],
        backgroundColor: "rgba(99, 102, 241, 0.8)",
        borderColor: "rgba(99, 102, 241, 1)",
        borderWidth: 1,
        borderRadius: 10,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-purple-400">
        Tableau de bord analytique
      </h1>

      {/* Cartes analytiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-white">Nombre d&apos;utilisateurs</h2>
          <p className="text-4xl font-extrabold mt-4">{userCount}</p>
        </div>
        <div className="bg-gradient-to-r from-pink-500 to-red-500 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-white">Posts générés</h2>
          <p className="text-4xl font-extrabold mt-4">{postsGenerated}</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-teal-400 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-white">Connexions aujourd&apos;hui</h2>
          <p className="text-4xl font-extrabold mt-4">{dailyConnections}</p>
        </div>
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Graphique en secteurs */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-purple-400 mb-4 text-center">
            Répartition des utilisateurs
          </h2>
          <Pie
            data={pieData}
            options={{
              plugins: {
                legend: {
                  position: "bottom",
                  labels: {
                    color: "#fff",
                  },
                },
              },
            }}
          />
        </div>

        {/* Graphique en barres */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-purple-400 mb-4 text-center">
            Connexions hebdomadaires
          </h2>
          <Bar
            data={barData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  ticks: {
                    color: "#fff",
                  },
                },
                y: {
                  ticks: {
                    color: "#fff",
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
