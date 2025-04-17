export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">À propos de LocalContent AI</h1>
      <p className="text-lg text-center max-w-2xl">
        LocalContent AI est une plateforme conçue pour aider les entreprises locales à générer des contenus engageants pour leurs réseaux sociaux.
        Grâce à notre outil, vous pouvez créer des posts personnalisés en quelques clics, adaptés à votre secteur d'activité.
      </p>
      <p className="text-lg text-center max-w-2xl mt-4">
        Notre mission est de simplifier la création de contenu pour les petites entreprises et de leur permettre de se concentrer sur ce qu'elles font de mieux : servir leurs clients.
      </p>
      <a
        href="/about"
        className="text-purple-400 hover:underline text-sm"
      >
        À propos
      </a>
    </div>
  );
}