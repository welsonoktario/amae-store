import Link from 'next/link';
import styles from './app-header.module.css';

import { Menu, Popover, Transition } from '@headlessui/react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Fragment } from 'react';

import UserIcon from '@/assets/icons/user.svg';
import logo from '@/assets/logo.png';
import { useAuth } from 'reactfire';

/*
  TODO:

  1. Migrate inline className ke CSS module.
  2. Refactor component jadi component independen (nav user dan menu)
*/
export default function AppNav() {
  const auth = useAuth();
  const MenuProfile = dynamic(
    () => import('@components/menu-profile/menu-profile'),
    { ssr: false },
  );

  const MenuAuth = dynamic(() => import('@components/menu-auth/menu-auth'), {
    ssr: false,
  });

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles['nav-wrapper']}>
          <Link href="/" className={styles['nav-logo']}>
            <Image
              className={styles['nav-logo-img']}
              src={logo}
              alt="Amae Group"
              fill
              priority
              sizes="10vw"
            />
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
              {() => (
                <>
                  <Popover.Button className={styles['nav-button']}>
                    <UserIcon className="h-6 w-6 stroke-2" />
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
                    <Popover.Panel className="absolute right-0 mt-2 min-w-[35vw] rounded-xl bg-primary-2 shadow-lg lg:min-w-[25vw]">
                      {auth.currentUser ? <MenuProfile /> : <MenuAuth />}
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
                            active ? 'bg-primary-1 text-white' : 'text-zinc-900'
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
                            active ? 'bg-primary text-white' : 'text-zinc-900'
                          } transition-color group mt-1 flex w-full items-center rounded-md px-2 py-2 text-sm duration-100`}
                          href="#"
                        >
                          Cek Transaksi
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          className={`${
                            active ? 'bg-primary text-white' : 'text-zinc-900'
                          } transition-color group mt-1 flex w-full items-center rounded-md px-2 py-2 text-sm duration-100`}
                          href="/news"
                        >
                          Berita & Promo
                        </Link>
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
