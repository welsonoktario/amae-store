import { formatRupiah } from '@/lib/utils';
import Image from 'next/image';
import { useAuth } from 'reactfire';

export default function MenuProfile() {
  const auth = useAuth();
  const balance = formatRupiah(20000);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between whitespace-nowrap p-4">
        <div className="inline-flex flex-row items-center gap-4">
          <div className="relative h-12 w-12 rounded-full bg-zinc-200">
            {auth.currentUser?.photoURL && (
              <Image
                src={auth.currentUser.photoURL}
                alt={auth.currentUser?.displayName!}
                fill
              />
            )}
          </div>
          <div className="flex flex-col">
            <p>{auth.currentUser?.displayName}</p>
            <div className="font-bold">Member Gold</div>
          </div>
        </div>
        <a href="#">
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            strokeWidth="2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            color="#000000"
          >
            <path
              d="M14.363 5.652l1.48-1.48a2 2 0 012.829 0l1.414 1.414a2 2 0 010 2.828l-1.48 1.48m-4.243-4.242l-9.616 9.615a2 2 0 00-.578 1.238l-.242 2.74a1 1 0 001.084 1.085l2.74-.242a2 2 0 001.24-.578l9.615-9.616m-4.243-4.242l4.243 4.242"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </a>
      </div>

      <div className="rounded-xl bg-white p-4">
        <div className="grid grid-cols-2 gap-2">
          <div className="col-span-full inline-flex flex-row gap-2 lg:col-auto">
            <svg
              className="h-5 w-5"
              strokeWidth="2"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              color="currentColor"
              stroke="currentColor"
            >
              <path
                d="M19 20H5a2 2 0 01-2-2V9a2 2 0 012-2h14a2 2 0 012 2v9a2 2 0 01-2 2z"
                strokeWidth="2"
              ></path>
              <path
                d="M16.5 14a.5.5 0 110-1 .5.5 0 010 1z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M18 7V5.603a2 2 0 00-2.515-1.932l-11 2.933A2 2 0 003 8.537V9"
                strokeWidth="2"
              ></path>
            </svg>
            <p className="text-sm">{auth.currentUser?.email}</p>
          </div>

          <div className="col-span-full inline-flex flex-row gap-2 justify-self-start lg:col-auto lg:justify-self-end">
            <svg
              className="h-5 w-5"
              strokeWidth="2"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              color="currentColor"
              stroke="currentColor"
            >
              <path
                d="M19 20H5a2 2 0 01-2-2V9a2 2 0 012-2h14a2 2 0 012 2v9a2 2 0 01-2 2z"
                strokeWidth="2"
              ></path>
              <path
                d="M16.5 14a.5.5 0 110-1 .5.5 0 010 1z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M18 7V5.603a2 2 0 00-2.515-1.932l-11 2.933A2 2 0 003 8.537V9"
                strokeWidth="2"
              ></path>
            </svg>
            <p className="text-sm">{auth.currentUser?.phoneNumber}</p>
          </div>
          <hr className="col-span-full my-3 divide-y " />
          <p className="col-span-full font-semibold">Saldo Amae Wallet</p>
          <div className="col-span-full inline-flex w-full flex-row items-center justify-between">
            <div className="inline-flex flex-row gap-2">
              <svg
                className="h-5 w-5"
                strokeWidth="2"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                color="currentColor"
                stroke="currentColor"
              >
                <path
                  d="M19 20H5a2 2 0 01-2-2V9a2 2 0 012-2h14a2 2 0 012 2v9a2 2 0 01-2 2z"
                  strokeWidth="2"
                ></path>
                <path
                  d="M16.5 14a.5.5 0 110-1 .5.5 0 010 1z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M18 7V5.603a2 2 0 00-2.515-1.932l-11 2.933A2 2 0 003 8.537V9"
                  strokeWidth="2"
                ></path>
              </svg>
              <p className="text-sm font-bold">{balance}</p>
            </div>
            <button
              type="button"
              className="btn-sm btn border-0 bg-primary-3 capitalize"
            >
              Isi Saldo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
