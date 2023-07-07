import { Popover, Transition } from '@headlessui/react';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { BadgeCheck, HelpCircleIcon } from 'lucide-react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { QRCodeSVG } from 'qrcode.react';
import { useEffect, useState } from 'react';
import { useAuth, useFirestore } from 'reactfire';

import Breadcrumbs, {
  BreadcrumbLink,
} from '@/components/breadcrumbs/breadcrumbs';
import CardGameInfo from '@/components/card-game-info/card-game-info';
import CardNominal from '@/components/card-nominal/card-nominal';
import CardPayment, {
  CardPaymentProps,
} from '@/components/card-payment/card-payment';
import FormInput from '@/components/form-input/form-input';
import FormSelect from '@/components/form-select/form-select';
import { ModalDialog } from '@/components/modal-dialog/modal-dialog';
import SectionTopupStep from '@/components/section-topup-step/section-topup-step';
import { useStore } from '@/lib/store';
import { formatRupiah } from '@/lib/utils';

const vaPayments: CardPaymentProps[] = [
  {
    id: 1,
    name: 'BNI',
    code: 'BNI',
    paymentMethod: 'va',
    img: 'https://upload.wikimedia.org/wikipedia/id/5/55/BNI_logo.svg',
    nominal: 0,
  },
  {
    id: 2,
    name: 'BJB',
    code: 'BJB',
    paymentMethod: 'va',
    img: 'https://upload.wikimedia.org/wikipedia/id/4/41/Bank_BJB_logo.svg',
    nominal: 0,
  },
  {
    id: 3,
    name: 'BRI',
    code: 'BRI',
    paymentMethod: 'va',
    img: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/BRI_2020.svg',
    nominal: 0,
  },
  {
    id: 4,
    name: 'MANDIRI',
    code: 'MANDIRI',
    paymentMethod: 'va',
    img: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Bank_Mandiri_logo_2016.svg',
    nominal: 0,
  },
  {
    id: 5,
    name: 'PERMATA',
    code: 'PERMATA',
    paymentMethod: 'va',
    img: 'https://upload.wikimedia.org/wikipedia/id/4/48/PermataBank_logo.svg',
    nominal: 0,
  },
  {
    id: 6,
    name: 'BSI',
    code: 'BSI',
    paymentMethod: 'va',
    img: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Bank_Syariah_Indonesia.svg',
    nominal: 0,
  },
];
const eWalletPayments: CardPaymentProps[] = [
  {
    id: 7,
    name: 'OVO',
    code: 'ID_OVO',
    paymentMethod: 'ewallet',
    img: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Logo_ovo_purple.svg',
    nominal: 0,
  },
  {
    id: 8,
    name: 'Shopee Pay',
    code: 'ID_SHOPEEPAY',
    paymentMethod: 'ewallet',
    img: 'https://www.xendit.co/wp-content/uploads/2023/05/shopee-pay-logo-5-23.png',
    nominal: 0,
  },
  {
    id: 9,
    name: 'Dana',
    code: 'ID_DANA',
    paymentMethod: 'ewallet',
    img: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Logo_dana_blue.svg',
    nominal: 0,
  },
  {
    id: 10,
    name: 'Link Aja',
    code: 'ID_LINKAJA',
    paymentMethod: 'ewallet',
    img: 'https://upload.wikimedia.org/wikipedia/commons/8/85/LinkAja.svg',
    nominal: 0,
  },
  {
    id: 11,
    name: 'Astrapay',
    code: 'ID_ASTRAPAY',
    paymentMethod: 'ewallet',
    img: 'https://www.xendit.co/wp-content/uploads/2022/06/logo-astrapay.png',
    nominal: 0,
  },
];

export default function Game() {
  const router = useRouter();
  const fireStore = useFirestore();
  const auth = useAuth();
  const { slug } = router.query;

  const [loading, setLoading] = useState(true);
  const [game, setGame] = useState<any>();
  const [produks, setProduks] = useState<any[]>([]);
  const [servers, setServers] = useState<any[]>([]);
  const [userId, setUserId] = useState('');
  const [server, setServer] = useState('');
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState<boolean>(false);
  const [qrId, setQrId] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success'>(
    'pending',
  );

  const [authUser, selectedPaymentMethod, selectedNominal, selectedPayment] =
    useStore((state) => [
      state.authUser,
      state.selectedPaymentMethod,
      state.selectedNominal,
      state.selectedPayment,
    ]);

  useEffect(() => {
    const loadData = async () => {
      if (router.isReady) {
        const produkRef = collection(fireStore, 'Produk');
        const q = query(produkRef, where('detail.slug', '==', slug));
        const docSnapshot = await getDocs(q);

        if (docSnapshot.docs.length === 1 && docSnapshot.docs[0].exists()) {
          const data = docSnapshot.docs[0].data();
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

          setGame(data.detail);
          setLoading(false);
        }
      }
    };

    loadData();
  }, []);

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
  const pageTitle = 'Top Up Murah | Amae Group';

  const validate = () => {
    let passed = true;
    const requiredInputs = [
      userId,
      server,
      selectedPaymentMethod,
      selectedNominal,
      selectedPayment,
    ];

    requiredInputs.forEach((input) => {
      if (!input) {
        passed = false;

        return;
      }
    });

    return passed;
  };

  const pay = async () => {
    if (!validate()) {
      return;
    }

    const res = await fetch('/api/payment', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        externalID: new Date().getTime().toString(),
        amount: selectedNominal?.harga,
        payerEmail: authUser?.email,
        paymentType: selectedPaymentMethod,
        code: selectedPayment?.code || '',
        name: authUser?.nama,
      }),
    });

    const { status, data } = await res.json();
    console.log(data);

    if (status === 'ok') {
      await addTransaction(data.id);
      setQrCode(data.qr_string);
      setQrId(data.id);
    }
  };

  const checkPayment = async () => {
    if (qrId) {
      const res = await fetch(`/api/payment/${qrId}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      const { status, data } = await res.json();

      if (data.data.length > 0) {
        setPaymentStatus('success');
      } else {
        setPaymentStatus('pending');
      }
    }
  };

  const addTransaction = async (qrCode: string) => {
    const qrCollectionRef = collection(fireStore, 'QR');
    const doc = await addDoc(qrCollectionRef, {
      id: qrCode,
      userId: auth.currentUser?.uid,
    });

    return doc;
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Breadcrumbs links={links} />

      <div className="grid grid-cols-1 gap-8 md:mt-0 lg:grid-cols-12">
        <div className="col-span-full lg:col-span-3">
          {!game ? (
            <div className="container mx-auto h-full">
              <div className="flex h-full w-full items-center justify-center">
                <span className="loading loading-spinner text-primary"></span>
              </div>
            </div>
          ) : (
            <CardGameInfo
              thumbnail={game.thumbnail}
              title={game.title}
              tutorials={game.tutorial}
            />
          )}
        </div>
        {loading ? (
          <div className="col-span-full lg:col-span-9">
            <div className="flex h-full w-full items-center justify-center ">
              <button className="btn-xl btn-ghost loading btn text-primary">
                <span className="loading loading-spinner loading-lg"></span>
              </button>
            </div>
          </div>
        ) : (
          <div className="col-span-full lg:col-span-9">
            <SectionTopupStep step={1} title="Detail User">
              <div className="flex w-full items-center gap-2 px-6 pt-6 md:gap-4">
                <FormInput
                  placeholder="Masukkan ID"
                  label="User ID"
                  onInputChange={setUserId}
                  required
                />
                {servers.length ? (
                  <FormSelect name="server" options={servers} />
                ) : (
                  <FormInput
                    label="Server"
                    placeholder="Masukkan server"
                    type="tel"
                    pattern="[0-9]*"
                    onInputChange={setServer}
                    required
                  />
                )}

                <Popover className="relative mb-2 mt-auto">
                  <Popover.Button className="btn-primary btn-sm btn-circle btn aspect-square text-white">
                    <HelpCircleIcon />
                  </Popover.Button>

                  <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Popover.Panel className="absolute right-0 top-0 hidden h-28 w-48 md:block">
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
              <p className="mt-2 px-6 pb-6 text-sm italic">
                Untuk mengetahui User ID Anda, Silakan Klik menu profile
                dibagian kiri atas pada menu utama game. Dan user ID akan
                terlihat dibagian bawah Nama Karakter Game Anda. Silakan
                masukkan User ID dan Zone ID Anda untuk menyelesaikan transaksi.
                Contoh : 12345678(1234). Masukkan 12345678 di User ID dan 1234
                di Zone ID
              </p>
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
              <div className="space-y-2 p-6 md:space-y-4">
                {/* <div
                  tabIndex={0}
                  className="collapse-arrow rounded-box collapse bg-primary-1"
                >
                  <input type="checkbox" className="peer" />
                  <div className="collapse-title font-medium md:text-xl">
                    Virtual Account
                  </div>
                  <div className="collapse-content">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {vaPayments.map((payment) => (
                        <CardPayment
                          key={`payment-${payment.id}`}
                          id={payment.id}
                          img={payment.img}
                          name={payment.name}
                          code={payment.code}
                          paymentMethod={payment.paymentMethod}
                          nominal={selectedNominal ? selectedNominal.harga : 0}
                          checked={payment.id === selectedPayment?.id}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div
                  tabIndex={0}
                  className="collapse-arrow rounded-box collapse bg-primary-1"
                >
                  <input type="checkbox" className="peer" />
                  <div className="collapse-title font-medium md:text-xl">
                    E-Wallet
                  </div>
                  <div className="collapse-content">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {eWalletPayments.map((payment) => (
                        <CardPayment
                          key={`payment-${payment.id}`}
                          id={payment.id}
                          img={payment.img}
                          name={payment.name}
                          code={payment.code}
                          paymentMethod={payment.paymentMethod}
                          nominal={selectedNominal ? selectedNominal.harga : 0}
                          checked={payment.id === selectedPayment?.id}
                        />
                      ))}
                    </div>
                  </div>
                </div> */}
                <div
                  tabIndex={0}
                  className="collapse-arrow rounded-box collapse bg-primary-1"
                >
                  <input type="checkbox" className="peer" />
                  <div className="collapse-title font-medium md:text-xl">
                    QRIS
                  </div>
                  <div className="collapse-content">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <CardPayment
                        key="payment-qr"
                        id={12}
                        img="https://upload.wikimedia.org/wikipedia/commons/a/a2/Logo_QRIS.svg"
                        name="QRIS"
                        paymentMethod="qr"
                        nominal={selectedNominal ? selectedNominal.harga : 0}
                        checked={12 === selectedPayment?.id}
                      />
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
                  onInputChange={setEmail}
                />
              </div>
            </SectionTopupStep>

            <div className="flex w-full justify-end">
              <button
                className="btn-primary btn mt-8"
                onClick={() => validate() && setOpen(true)}
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
        title={paymentStatus === 'pending' ? 'Konfirmasi Pesanan' : ''}
        footer={
          paymentStatus === 'pending' ? (
            qrId ? (
              <button
                className="btn-primary btn"
                onClick={() => checkPayment()}
              >
                Cek Pembayaran
              </button>
            ) : (
              <button className="btn-primary btn" onClick={() => pay()}>
                Bayar
              </button>
            )
          ) : (
            <button className="btn-primary btn" onClick={() => setOpen(false)}>
              Tutup
            </button>
          )
        }
      >
        {paymentStatus === 'pending' && (
          <>
            <div className="w-full p-4">
              {qrCode && (
                <QRCodeSVG
                  className="mx-auto"
                  value={qrCode}
                  size={300}
                  bgColor={'#ffffff'}
                  fgColor={'#5ebf39'}
                  level={'Q'}
                  includeMargin={false}
                  imageSettings={{
                    src: '/logo.png',
                    x: undefined,
                    y: undefined,
                    height: 54,
                    width: 54,
                    excavate: true,
                  }}
                />
              )}
            </div>
            <table className="table w-full table-auto">
              <tbody>
                <tr>
                  <td>Metode Pembayaran:</td>
                  <td>{selectedPayment?.name}</td>
                </tr>
                <tr>
                  <td>Total Transaksi:</td>
                  <td>
                    {selectedNominal
                      ? formatRupiah(selectedNominal.harga)
                      : '-'}
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        )}
        {paymentStatus === 'success' && (
          <div className="w-full">
            <BadgeCheck className="mx-auto text-primary" size={108} />
            <h6 className="my-8 text-center text-xl font-bold">
              Pembayaran Berhasil
            </h6>
          </div>
        )}
      </ModalDialog>
    </>
  );
}
