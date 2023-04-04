import { Menu, Popover, Transition } from '@headlessui/react';
import Link from 'next/link';
import { Fragment } from 'react';
import styles from './app-header.module.css';

/*
  TODO:

  1. Migrate inline className ke CSS module.
  2. Refactor component jadi component independen (nav user dan menu)
*/
export default function AppNav() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles['nav-wrapper']}>
          <Link href="/" className={styles['nav-title']}>
            Amae Store
          </Link>

          <div className={styles['nav-search']}>
            <span className={styles['nav-search-icon']}>🔎</span>
            <input
              className={styles['nav-search-input']}
              type="search"
              name="search"
              placeholder="Cari game"
            />
          </div>

          <div>
            <Popover
              as="div"
              className="relative z-50 inline-block justify-self-end text-left"
            >
              {({ open }) => (
                <>
                  <Popover.Button className={styles['nav-button']}>
                    <svg
                      className="h-6 w-6"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 20v-1a7 7 0 017-7v0a7 7 0 017 7v1M12 12a4 4 0 100-8 4 4 0 000 8z"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </Popover.Button>
                  {/* Use the `Transition` component. */}
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Popover.Panel className="absolute right-0 mt-2 min-w-[35vw] rounded-xl bg-emerald-300 shadow-lg lg:min-w-[25vw]">
                      <div className="flex flex-col">
                        <div className="flex items-center justify-between whitespace-nowrap p-4">
                          <div className="inline-flex flex-row items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-zinc-200"></div>
                            <div className="flex flex-col">
                              <p>Bernardus Boli</p>
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
                              <p className="text-sm">email@example.com</p>
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
                              <p className="text-sm">081234567890</p>
                            </div>
                            <hr className="col-span-full my-3 divide-y " />
                            <p className="col-span-full font-semibold">
                              Saldo Amae Wallet
                            </p>
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
                                <p className="text-sm font-bold">
                                  {(20000).toLocaleString('id-ID', {
                                    style: 'currency',
                                    currency: 'IDR',
                                    maximumFractionDigits: 0,
                                  })}
                                </p>
                              </div>
                              <button
                                type="button"
                                className="btn-sm btn border-0 bg-emerald-400 capitalize"
                              >
                                Isi Saldo
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>

            <Menu
              as="div"
              className="relative inline-block justify-self-end text-left"
            >
              <Menu.Button className={styles['nav-button']}>
                <svg
                  className="h-6 w-6"
                  strokeWidth="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 5h18M3 12h18M3 19h18"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </Menu.Button>

              {/* Use the `Transition` component. */}
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-50 mt-2 w-56 origin-top-right divide-y divide-zinc-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          className={`${
                            active
                              ? 'bg-emerald-400 text-white'
                              : 'text-zinc-900'
                          } transition-color group flex w-full items-center rounded-md px-2 py-2 text-sm duration-100`}
                          href="#"
                        >
                          Join Reseller
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          className={`${
                            active
                              ? 'bg-emerald-400 text-white'
                              : 'text-zinc-900'
                          } transition-color group mt-1 flex w-full items-center rounded-md px-2 py-2 text-sm duration-100`}
                          href="#"
                        >
                          Cek Transaksi
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          className={`${
                            active
                              ? 'bg-emerald-400 text-white'
                              : 'text-zinc-900'
                          } transition-color group mt-1 flex w-full items-center rounded-md px-2 py-2 text-sm duration-100`}
                          href="#"
                        >
                          Berita & Promo
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>

        <div className={styles['nav-wrapper-sm']}>
          <div className={styles['nav-search-sm']}>
            <span className={styles['nav-search-icon']}>🔎</span>
            <input
              className={styles['nav-search-input']}
              type="search"
              name="search"
              placeholder="Cari game"
            />
          </div>
        </div>
      </nav>
    </header>
  );
}
