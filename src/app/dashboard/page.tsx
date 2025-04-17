"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

// Définition des types pour les posts
interface Post {
  id: string;
  domaine: string;
  texte: string;
  createdAt: Date;
  scheduledDate?: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [domaine, setDomaine] = useState<string>("");
  const [resultat, setResultat] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [historique, setHistorique] = useState<Post[]>([]);
  const [userUID, setUserUID] = useState<string | null>(null);
  const [scheduledDate, setScheduledDate] = useState<string>("");
  // Removed unused selectedPost state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserUID(user.uid);
        chargerHistorique(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const chargerHistorique = async (uid: string) => {
    try {
      const q = query(
        collection(db, "posts"),
        where("uid", "==", uid),
        orderBy("createdAt", "desc"),
      );
      const querySnapshot = await getDocs(q);
      const posts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[];
      setHistorique(posts);
    } catch (error) {
      console.error("Erreur chargement historique:", error);
    }
  };

  const genererPost = async () => {
    if (!domaine) return alert("Veuillez entrer un domaine !");

    setLoading(true);

    try {
      const generatedText = `✨ **Bienvenue chez ${domaine.toUpperCase()} !** ✨\n\n🍕 **Découvrez nos services exceptionnels dans le domaine de ${domaine} !**\n\n🌟 **Pourquoi nous choisir ?**\n✅ **Qualité garantie**\n✅ **Service rapide et fiable**\n✅ **Satisfaction client assurée**\n\n📅 **Planifiez votre visite dès aujourd'hui et profitez de nos offres exclusives !**`;

      setResultat(generatedText);

      await addDoc(collection(db, "posts"), {
        uid: userUID,
        domaine,
        texte: generatedText,
        createdAt: new Date(),
        scheduledDate,
      });

      chargerHistorique(userUID!);
    } catch (error) {
      console.error("Erreur lors de la génération du post :", error);
      alert("Une erreur est survenue lors de la génération.");
    }

    setLoading(false);
  };

  const supprimerPost = async (postId: string) => {
    try {
      await deleteDoc(doc(db, "posts", postId));
      alert("Post supprimé avec succès.");
      chargerHistorique(userUID!);
    } catch (error) {
      console.error("Erreur lors de la suppression du post :", error);
    }
  };

  const logout = async () => {
    await signOut(auth);
    router.push("/"); // Redirection vers la page d'accueil après déconnexion
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="w-full px-6 py-4 flex justify-between items-center border-b border-gray-800 bg-gray-900">
        <h1 className="text-xl md:text-2xl font-bold text-purple-400">
          LocalContent AI
        </h1>
        <nav className="flex space-x-4">
          <a
            href="/pricing"
            className="text-purple-400 hover:underline text-sm"
          >
            Tarifs
          </a>
          <a
            href="/dashboard/analytics"
            className="text-purple-400 hover:underline text-sm"
          >
            Analytics
          </a>
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded text-sm"
          >
            Se déconnecter
          </button>
        </nav>
      </header>

      {/* Main content */}
      <main className="px-4 py-10">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Générer un nouveau post
        </h2>
        <div className="flex flex-col items-center">
          <input
            type="text"
            placeholder="Ex: pizzeria, coiffeur, garage..."
            className="p-2 border border-gray-600 bg-gray-800 text-white rounded w-full max-w-md mb-4"
            value={domaine}
            onChange={(e) => setDomaine(e.target.value)}
          />

          <input
            type="datetime-local"
            className="p-2 border border-gray-600 bg-gray-800 text-white rounded w-full mb-4"
            value={scheduledDate}
            onChange={(e) => setScheduledDate(e.target.value)}
          />

          <button
            onClick={genererPost}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-2"
          >
            {loading ? "Génération en cours..." : "Générer un post"}
          </button>
        </div>

        {resultat && (
          <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white p-6 mt-6 rounded-lg shadow-lg max-w-2xl w-full mx-auto">
            <h2 className="text-3xl font-extrabold mb-4 text-center">
              🎉 Votre Post Généré 🎉
            </h2>
            <p className="whitespace-pre-line text-lg leading-relaxed font-medium">
              {resultat}
            </p>
          </div>
        )}

        <h2 className="text-2xl font-bold mt-10 mb-6 text-center">
          Historique des posts
        </h2>
        <div className="space-y-4">
          {historique.map((post) => (
            <div
              key={post.id}
              className="bg-gray-800 p-4 rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-bold">{post.domaine}</h3>
                <p className="text-sm text-gray-400">{post.texte}</p>
              </div>
              <button
                onClick={() => supprimerPost(post.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded text-sm"
              >
                Supprimer
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
