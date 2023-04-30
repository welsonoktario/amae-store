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
import SectionTopupStep from '@/components/section-topup-step/section-topup-step';
import { useStore } from '@/lib/store';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

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
        servers: [
          {
            value: 'sea',
            label: 'SEA',
          },
          {
            value: 'eu',
            label: 'EU',
          },
          {
            value: 'na',
            label: 'NA',
          },
        ],
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

export default function Game({
  game,
  servers,
  nominals,
  payments,
}: GamePageProps) {
  const router = useRouter();
  const { slug } = router.query;
  const [selectedNominal, selectedPayment] = useStore((state: any) => [
    state.selectedNominal,
    state.selectedPayment,
  ]);

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

  return (
    <>
      <Head>
        <title>Top Up {slug} | Amae Store</title>
      </Head>
      <Breadcrumbs links={links} />

      <div className="mt-4 grid grid-cols-1 gap-y-8 lg:grid-cols-12 lg:gap-8">
        <div className="col-span-full lg:col-span-3">
          <CardGameInfo
            thumbnail={game.thumbnail}
            title={game.title}
            tutorial={game.tutorial}
          />
        </div>
        <div className="col-span-full lg:col-span-9">
          <SectionTopupStep step={1} title="Detail User">
            <div className="inline-flex w-full items-center gap-4 p-6">
              <FormInput placeholder="Masukkan ID" label="User ID" />
              {servers ? (
                <FormSelect name="server" options={servers} />
              ) : (
                <FormInput label="Server" type="tel" pattern="[0-9]*" />
              )}
            </div>
          </SectionTopupStep>

          <div className="divider" />

          <SectionTopupStep step={2} title="Pilihan Nominal">
            <div className="grid grid-cols-2 gap-4 p-6 md:grid-cols-4">
              {nominals.map((nominal) => (
                <CardNominal
                  id={nominal.id}
                  label={nominal.label}
                  price={nominal.price}
                  key={nominal.id}
                  checked={nominal.id === selectedNominal?.id}
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
                    {payments.map((payment) => (
                      <CardPayment
                        id={payment.id}
                        img={payment.img}
                        name={payment.name}
                        nominal={selectedNominal ? selectedNominal.price : 0}
                        key={payment.id}
                        checked={payment.id === selectedPayment?.id}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </SectionTopupStep>
        </div>
      </div>
    </>
  );
}
