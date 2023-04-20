import Breadcrumbs, {
  BreadcrumbLink,
} from '@/components/breadcrumbs/breadcrumbs';
import CardNominal, {
  CardNominalProps,
} from '@/components/card-nominal/card-nominal';
import CardPayment, {
  CardPaymentProps,
} from '@/components/card-payment/card-payment';
import FormInput from '@/components/form-input/form-input';
import FormSelect, {
  FormSelectOption,
} from '@/components/form-select/form-select';
import SectionTopupStep from '@/components/section-topup-step/section-topup-step';
import { useStore } from '@/lib/store';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Game() {
  const router = useRouter();
  const { slug } = router.query;
  const [selectedNominal, selectedPayment] = useStore((state) => [
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

  const options: FormSelectOption[] = [
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
  ];

  const nominals: CardNominalProps[] = [
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
  ];

  const payments: CardPaymentProps[] = [
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
  ];

  return (
    <>
      <Head>
        <title>Top Up {slug} | Amae Store</title>
      </Head>
      <Breadcrumbs links={links} />

      <div className="mt-4 grid grid-cols-1 md:grid-cols-8 lg:grid-cols-12">
        <div className="col-span-full md:col-span-2 lg:col-span-3">halo</div>
        <div className="col-span-full md:col-span-6 lg:col-span-9">
          <SectionTopupStep step={1} title="Detail User">
            <div className="inline-flex w-full items-center gap-4 p-6">
              <FormInput label="User ID" />
              <FormInput label="Server" type="tel" pattern="[0-9]*" />
              <FormSelect name="server" options={options} />
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
                  checked={nominal.id === selectedNominal}
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
                        nominal={payment.nominal}
                        key={payment.id}
                        checked={payment.id === selectedPayment}
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
