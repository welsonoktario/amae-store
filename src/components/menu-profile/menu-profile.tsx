import { formatRupiah } from '@/lib/utils';
import Image from 'next/image';
import { useAuth, useUser } from 'reactfire';
import { Edit, Mail, Phone, Wallet } from 'lucide-react';
import { useStore } from '@/lib/store';

export default function MenuProfile({ close }: { close: () => void }) {
  const auth = useAuth();
  const [authUser] = useStore((state) => [state.authUser]);
  const { status: userStatus, data: user } = useUser();

  const logout = async () => {
    close();
    await auth.signOut();
  };

  return (
    <div className="flex w-full flex-col items-center">
      {userStatus === 'error' && <p>Error</p>}
      {userStatus === 'success' && user && authUser && (
        <>
          <div className="flex w-full items-center justify-between whitespace-nowrap p-4">
            <div className="flex flex-row items-center space-x-4">
              <div className="relative h-12 w-12 rounded-full bg-zinc-200">
                {user.photoURL && (
                  <Image src={user.photoURL} alt={authUser.nama} fill />
                )}
              </div>
              <div className="flex flex-col">
                <p>{authUser.nama}</p>
                <p className="font-bold">Member {authUser.membership}</p>
              </div>
            </div>
            <a href="#">
              <Edit className="aspect-square" height={20} width={20} />
            </a>
          </div>

          <div className="w-full rounded-xl bg-white p-4">
            <div className="flex md:flex-col md:space-x-8 lg:flex-row lg:justify-between">
              <div className="flex flex-row space-x-2 lg:col-auto">
                <Mail className="aspect-square" size={20} />
                <p className="text-sm">{user?.email}</p>
              </div>

              <div className="flex flex-row space-x-2 justify-self-start lg:col-auto lg:justify-self-end">
                <Phone className="aspect-square" size={18} />
                <p className="text-sm">{authUser.hp}</p>
              </div>
            </div>
            <hr className="my-3 w-full divide-y " />
            <p className="font-semibold">Saldo Amae Wallet</p>
            <div className="mt-2 flex w-full flex-row items-center justify-between">
              <div className="flex flex-row space-x-2">
                <Wallet className="aspect-square" size={20} />
                <p className="text-sm">{formatRupiah(authUser.saldo)}</p>
              </div>
              <button
                type="button"
                className="btn-sm btn border-0 bg-primary-3 capitalize"
                onClick={close}
              >
                Isi Saldo
              </button>
            </div>
            <div className="mt-4 flex w-full justify-center">
              <button
                onClick={logout}
                className="btn-ghost btn-sm btn text-error hover:bg-error hover:bg-opacity-20"
              >
                Logout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
