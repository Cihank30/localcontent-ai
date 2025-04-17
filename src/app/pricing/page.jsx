export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-6">Nos Tarifs</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-purple-400 mb-4">Plan Gratuit</h2>
          <p className="text-gray-300 mb-4">Idéal pour les petites entreprises qui débutent.</p>
          <ul className="text-gray-400 mb-6 space-y-2">
            <li>✔ 15 posts par mois</li>
            <li>✔ Modèles de base</li>
            <li>✔ Assistance limitée</li>
          </ul>
          <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded w-full">
            Choisir
          </button>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-purple-400 mb-4">Plan Pro</h2>
          <p className="text-gray-300 mb-4">Pour les entreprises qui veulent aller plus loin.</p>
          <ul className="text-gray-400 mb-6 space-y-2">
            <li>✔ Posts illimités</li>
            <li>✔ Modèles personnalisés</li>
            <li>✔ Assistance prioritaire</li>
          </ul>
          <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded w-full">
            Acheter pour 19,99€/mois
          </button>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-purple-400 mb-4">Plan Entreprise</h2>
          <p className="text-gray-300 mb-4">Pour les grandes entreprises avec des besoins spécifiques.</p>
          <ul className="text-gray-400 mb-6 space-y-2">
            <li>✔ Tout inclus</li>
            <li>✔ Support dédié</li>
            <li>✔ Intégrations avancées</li>
          </ul>
          <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded w-full">
            Contactez-nous
          </button>
        </div>
      </div>
    </div>
  );
}