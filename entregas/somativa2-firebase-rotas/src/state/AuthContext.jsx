import { useEffect, useMemo, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { AuthContext } from "./auth-context";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (!firebaseUser) {
        setProfile(null);
        setLoadingAuth(false);
        return;
      }

      try {
        const profileRef = doc(db, "usuarios", firebaseUser.uid);
        const profileSnap = await getDoc(profileRef);
        setProfile(profileSnap.exists() ? profileSnap.data() : null);
      } catch (error) {
        console.error("Erro ao buscar perfil no Firestore:", error);
        setProfile(null);
      } finally {
        setLoadingAuth(false);
      }
    });

    return unsubscribe;
  }, []);

  const value = useMemo(
    () => ({ user, profile, loadingAuth, setProfile }),
    [user, profile, loadingAuth],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
