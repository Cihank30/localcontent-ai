export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Tableau de bord analytique</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-purple-400">Nombre d'utilisateurs</h2>
          <p className="text-gray-300 text-2xl">123</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-purple-400">Posts générés</h2>
          <p className="text-gray-300 text-2xl">456</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-purple-400">Connexions aujourd'hui</h2>
          <p className="text-gray-300 text-2xl">78</p>
        </div>
      </div>
    </div>
  );
}import { Analytics } from "@vercel/analytics/react"