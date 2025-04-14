'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import {
  onAuthStateChanged,
  signOut
} from 'firebase/auth';
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
  deleteDoc,
  doc
} from 'firebase/firestore';
import { model } from '@/lib/gemini';

export default function DashboardPage() {
  const router = useRouter();
  const [domaine, setDomaine] = useState('');
  const [resultat, setResultat] = useState('');
  const [loading, setLoading] = useState(false);
  const [historique, setHistorique] = useState([]);
  const [userUID, setUserUID] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/login');
      } else {
        setUserUID(user.uid);
        chargerHistorique(user.uid);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const chargerHistorique = async (uid) => {
    try {
      const q = query(
        collection(db, 'posts'),
        where('uid', '==', uid),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const posts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHistorique(posts);
    } catch (error) {
      console.error('Erreur chargement historique:', error);
    }
  };

  const genererAvecGemini = async () => {
    if (!domaine) return alert('Entre un secteur !');
    setLoading(true);
    try {
      const prompt = `Génère un post engageant pour une entreprise dans ce secteur : ${domaine}. Sois original et professionnel.`;
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      setResultat(text);

      if (userUID) {
        await addDoc(collection(db, 'posts'), {
          uid: userUID,
          domaine,
          texte: text,
          createdAt: new Date(),
        });
        chargerHistorique(userUID);
      }
    } catch (error) {
      console.error('Erreur génération :', error);
      setResultat('Erreur lors de la génération.');
    }
    setLoading(false);
  };

  const supprimerPost = async (postId) => {
    try {
      await deleteDoc(doc(db, 'posts', postId));
      alert("Post supprimé !");
      if (userUID) chargerHistorique(userUID);
    } catch (error) {
      console.error("Erreur suppression :", error);
    }
  };

  const logout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="w-full px-6 py-4 flex justify-between items-center border-b border-gray-800 bg-gray-900">
        <h1 className="text-xl md:text-2xl font-bold text-purple-400">LocalContent AI</h1>
        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded text-sm"
        >
          Se déconnecter
        </button>
      </header>

      {/* Main content */}
      <main className="flex flex-col items-center px-4 py-10">
        <input
          type="text"
          placeholder="Ex: pizzeria, coiffeur, garage..."
          className="p-2 border border-gray-600 bg-gray-800 text-white rounded w-full max-w-md mb-4"
          value={domaine}
          onChange={(e) => setDomaine(e.target.value)}
        />

        <button
          onClick={genererAvecGemini}
          disabled={loading}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          {loading ? 'Génération en cours...' : 'Générer un post avec Gemini'}
        </button>

        {resultat && (
          <div className="bg-gray-800 text-white p-4 mt-6 rounded max-w-2xl w-full relative">
            <h2 className="text-xl font-bold mb-2">Post généré :</h2>
            <p>{resultat}</p>
            <button
              onClick={() => {
                navigator.clipboard.writeText(resultat);
                alert("Contenu copié !");
              }}
              className="absolute top-2 right-2 bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 text-xs rounded"
            >
              Copier
            </button>
          </div>
        )}

        {/* Historique */}
        <div className="mt-10 max-w-2xl w-full">
          <h2 className="text-2xl font-bold text-white mb-4">📚 Historique des posts</h2>
          {historique.length === 0 ? (
            <p className="text-gray-400">Aucun post généré pour l’instant.</p>
          ) : (
            <ul className="space-y-4">
              {historique.map((post) => (
                <li key={post.id} className="bg-gray-900 text-white p-4 rounded shadow relative">
                  <strong className="text-purple-300">{post.domaine}</strong>
                  <p className="mt-2 text-sm">{post.texte}</p>

                  <div className="absolute top-2 right-2 space-x-2">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(post.texte);
                        alert("Contenu copié !");
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 text-xs rounded"
                    >
                      Copier
                    </button>
                    <button
                      onClick={() => supprimerPost(post.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 text-xs rounded"
                    >
                      Supprimer
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
const genererAvecGemini = async () => {
  if (!domaine) return alert('Entre un secteur !');
  if (!userUID) return;

  setLoading(true);

  try {
    // 🔥 Récupère le nombre de posts existants
    const q = query(
      collection(db, 'posts'),
      where('uid', '==', userUID)
    );
    const snap = await getDocs(q);

    // 💡 Limite gratuite : 3 posts max
    const limiteGratuite = 3;
    if (snap.size >= limiteGratuite) {
      alert("Tu as atteint la limite gratuite (3 posts). Passe au plan Pro pour continuer !");
      setLoading(false);
      return;
    }

    // 🔮 Génération IA
    const prompt = `Génère un post engageant pour une entreprise dans ce secteur : ${domaine}. Sois original et professionnel.`;
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    setResultat(text);

    // 💾 Sauvegarde
    await addDoc(collection(db, 'posts'), {
      uid: userUID,
      domaine,
      texte: text,
      createdAt: new Date(),
    });

    chargerHistorique(userUID);
  } catch (error) {
    console.error('Erreur génération :', error);
    setResultat('Erreur lors de la génération.');
  }

  setLoading(false);
};
