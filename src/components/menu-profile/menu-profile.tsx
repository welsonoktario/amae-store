import { formatRupiah } from '@/lib/utils';
import Image from 'next/image';
import { useAuth, useUser } from 'reactfire';
import { Edit, Mail, Phone, Wallet } from 'lucide-react';
import { useStore } from '@/lib/store';

export default function MenuProfile() {
  const auth = useAuth();
  const [authUser] = useStore((state) => [state.authUser]);
  const { status: userStatus, data: user } = useUser();

  const logout = async () => await auth.signOut();

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
            <div className="grid grid-cols-2 space-x-2 space-y-2">
              <div className="col-span-full flex flex-row space-x-2 space-y-2 lg:col-auto">
                <Mail className="aspect-square" size={20} />
                <p className="text-sm">{user?.email}</p>
              </div>

              <div className="col-span-full flex flex-row space-x-2 space-y-2 justify-self-start lg:col-auto lg:justify-self-end">
                <Phone className="aspect-square" size={20} />
                <p className="text-sm">{authUser.hp}</p>
              </div>
              <hr className="col-span-full my-3 divide-y " />
              <p className="col-span-full font-semibold">Saldo Amae Wallet</p>
              <div className="col-span-full flex w-full flex-row items-center justify-between">
                <div className="flex flex-row space-x-2 space-y-2">
                  <Wallet className="aspect-square" size={20} />
                  <p className="text-sm font-bold">
                    {formatRupiah(authUser.saldo)}
                  </p>
                </div>
                <button
                  type="button"
                  className="btn-sm btn border-0 bg-primary-3 capitalize"
                >
                  Isi Saldo
                </button>
              </div>
            </div>
            <button
              onClick={logout}
              className="btn-ghost btn-sm btn mx-auto mt-2 text-error hover:bg-error hover:bg-opacity-20"
            >
              Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
