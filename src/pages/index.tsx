import { AuthUser, useStore } from '@/lib/store';
import Home from '@/pages/home/home';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { useFirestore, useUser } from 'reactfire';

export default function Index() {
  const firestore = useFirestore();
  const [authUser, setAuthUser] = useStore((state) => [
    state.authUser,
    state.setAuthUser,
  ]);
  const { data: user } = useUser();

  useEffect(() => {
    const loadUsers = async () => {
      if (!authUser) {
        if (user) {
          const userRef = doc(firestore, 'Users', user.uid);
          const userDoc = await getDoc(userRef);

          setAuthUser(userDoc.data() as AuthUser);
        }
      }
    };

    loadUsers();
  }, [user]);

  return <Home />;
}
