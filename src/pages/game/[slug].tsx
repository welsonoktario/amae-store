import Breadcrumbs, {
  BreadcrumbLink,
} from '@/components/breadcrumbs/breadcrumbs';
import CardGameInfo, {
  CardGameInfoProps,
} from '@/components/card-game-info/card-game-info';
import CardNominal, {
  CardNominalProps,
} from '@/components/card-nominal/card-nominal';
import CardPayment, {
  CardPaymentProps,
} from '@/components/card-payment/card-payment';
import FormInput from '@/components/form-input/form-input';
import FormSelect from '@/components/form-select/form-select';
import { ModalDialog } from '@/components/modal-dialog/modal-dialog';
import SectionTopupStep from '@/components/section-topup-step/section-topup-step';
import { useStore } from '@/lib/store';
import { unslugify } from '@lib/utils/unslugify';
import { doc } from 'firebase/firestore';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useFirestore, useFirestoreDocDataOnce } from 'reactfire';
import { Popover, Transition } from '@headlessui/react';
import Image from 'next/image';

interface GamePageProps {
  game: CardGameInfoProps;
  servers?: any;
  nominals: CardNominalProps[];
  payments: CardPaymentProps[];
}

export const getServerSideProps: GetServerSideProps<any> = async () => {
  const data = await new Promise((resolve) => {
    setTimeout(() => {
      const data = {
        game: {
          id: 1,
          title: 'Mobile Legends',
          thumbnail:
            'https://play-lh.googleusercontent.com/X4CgS6NWW7Q4YbiJP-PEqCsxqxXxM3TtCUIjKebYOBX66-24KsN9-ruUPsE7MW63G2E=s256-rw',
          tutorial: [
            'Masukkan User ID dan Zone ID Anda, Contoh : 1234567 (1234)',
            'Pilih Nominal Diamonds yang kamu inginkan',
            'Selesaikan pembayaran',
            'Diamonds akan ditambahkan ke akun Mobile Legends kamu secara otomatis',
          ],
        },
        nominals: [
          {
            id: 1,
            label: '56 Diamonds',
            price: 22000,
          },
          {
            id: 2,
            label: '78 Diamonds',
            price: 30000,
          },
          {
            id: 3,
            label: '132 Diamonds',
            price: 40000,
          },
        ],
        payments: [
          {
            id: 1,
            name: 'BCA',
            img: 'https://picsum.photos/100/100',
            nominal: 50000,
          },
          {
            id: 2,
            name: 'BRI',
            img: 'https://picsum.photos/100/100',
            nominal: 50000,
          },
          {
            id: 3,
            name: 'BNI',
            img: 'https://picsum.photos/100/100',
            nominal: 50000,
          },
        ],
      };
      resolve(data);
    }, 500);
  });

  return { props: data };
};

export default function Game({ game, servers, payments }: GamePageProps) {
  const router = useRouter();
  const fireStore = useFirestore();
  const { slug } = router.query;

  const [selectedNominal, selectedPayment] = useStore((state: any) => [
    state.selectedNominal,
    state.selectedPayment,
  ]);
  const [produks, setProduks] = useState<any>([]);
  const [open, setOpen] = useState<boolean>(false);

  const produkRef = doc(fireStore, 'Produk', 'MLBB');
  const { status, data } = useFirestoreDocDataOnce(produkRef);

  useEffect(() => {
    if (!produks.length) {
      if (status === 'success') {
        const prioritas = data.prioritas.find(
          (prio: { prioritas: any }) => prio.prioritas === data.currentPrio,
        );

        for (const prop in data) {
          if (Object.hasOwn(data[prop], 'Publik')) {
            if (prop == prioritas.nama) {
              setProduks(() => {
                const newState = data[prop]['Publik']
                  .sort((a: { harga: number }, b: { harga: number }) => {
                    if (a.harga < b.harga) {
                      return -1;
                    }
                    if (a.harga > b.harga) {
                      return 1;
                    }
                    return 0;
                  })
                  .map((d: { label: string; harga: any; subHarga: any }) => {
                    const newD = {
                      ...d,
                      label: d.label.replace(' | {harga}->{subHarga}', ``),
                    };

                    return newD;
                  });

                return newState;
              });
            }
          }
        }
      }
    }
  }, [status, produks]);

  const links: BreadcrumbLink[] = [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'Mobile Legends',
      href: '/mobile-legends',
      active: true,
    },
  ];
  const pageTitle = `Top Up ${unslugify(slug as string)} | Amae Group`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Breadcrumbs links={links} />

      <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-12 lg:gap-8">
        <div className="col-span-full lg:col-span-3">
          <CardGameInfo
            thumbnail={game.thumbnail}
            title={game.title}
            tutorial={game.tutorial}
          />
        </div>
        {status === 'loading' ? (
          <p>Loading...</p>
        ) : (
          <div className="col-span-full lg:col-span-9">
            <SectionTopupStep step={1} title="Detail User">
              <div className="inline-flex w-full items-center gap-2 p-6 md:gap-4">
                <FormInput placeholder="Masukkan ID" label="User ID" />
                {servers ? (
                  <FormSelect name="server" options={servers} />
                ) : (
                  <FormInput
                    label="Server"
                    placeholder="Masukkan server"
                    type="tel"
                    pattern="[0-9]*"
                  />
                )}

                <Popover className="relative mb-2 mt-auto">
                  <Popover.Button className="btn-ghost btn-sm btn-circle btn aspect-square">
                    <svg
                      className="h-4 w-4 md:h-5 md:w-5"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      color="currentColor"
                    >
                      <path
                        d="M7.9 8.08c0-4.773 7.5-4.773 7.5 0 0 3.409-3.409 2.727-3.409 6.818M12 19.01l.01-.011"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                  </Popover.Button>

                  <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Popover.Panel className="absolute hidden md:block">
                      <Image
                        className="mt-4 rounded-lg shadow-sm"
                        src="https://picsum.photos/300/150"
                        width={300}
                        height={120}
                        alt="Cara Topup"
                      />
                    </Popover.Panel>
                  </Transition>
                </Popover>
              </div>
            </SectionTopupStep>

            <div className="divider" />

            <SectionTopupStep step={2} title="Pilihan Nominal">
              <div className="grid grid-cols-2 gap-4 p-6 md:grid-cols-4">
                {produks.map((produk: any, i: number) => (
                  <CardNominal
                    key={`nominal-${produk.idProduk + i}`}
                    checked={produk.idProduk === selectedNominal?.idProduk}
                    {...produk}
                  />
                ))}
              </div>
            </SectionTopupStep>

            <div className="divider" />

            <SectionTopupStep step={3} title="Metode Pembayaran">
              <div className="p-6">
                <div
                  tabIndex={0}
                  className="collapse-arrow rounded-box collapse bg-primary-1"
                >
                  <input type="checkbox" className="peer" />
                  <div className="collapse-title text-xl font-medium">
                    Virtual Account
                  </div>
                  <div className="collapse-content">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {payments.map((payment, i) => (
                        <CardPayment
                          key={`payment-${payment.id}`}
                          id={payment.id}
                          img={payment.img}
                          name={payment.name}
                          nominal={selectedNominal ? selectedNominal.harga : 0}
                          checked={payment.id === selectedPayment?.id}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </SectionTopupStep>

            <div className="divider" />

            <SectionTopupStep step={4} title="Kode Promo (opsional)">
              <div className="p-6">
                <FormInput placeholder="XXXX" label="Kode Promo" />
              </div>
            </SectionTopupStep>

            <div className="divider" />

            <SectionTopupStep step={5} title="Email (opsional)">
              <div className="p-6">
                <FormInput
                  placeholder="email@gmail.com"
                  label="Email"
                  type="email"
                />
              </div>
            </SectionTopupStep>

            <div className="flex w-full justify-end">
              <button
                className="btn-primary btn mt-8"
                onClick={() => setOpen(true)}
              >
                Bayar
              </button>
            </div>
          </div>
        )}
      </div>

      <ModalDialog
        open={open}
        onClose={() => setOpen(false)}
        title="Konfirmasi Pesanan"
        footer={<button className="btn-primary btn">Bayar</button>}
      >
        <table>
          <tr>
            <td>Metode Pembayaran:</td>
            <td>{selectedPayment?.name}</td>
          </tr>
          <tr>
            <td>Total Transaksi:</td>
            <td>{selectedNominal?.harga}</td>
          </tr>
        </table>
      </ModalDialog>
    </>
  );
}
