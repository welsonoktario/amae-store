import Breadcrumbs, {
  BreadcrumbLink,
} from '@/components/breadcrumbs/breadcrumbs';
import CardNominal, {
  CardNominalProps,
} from '@/components/card-nominal/card-nominal';
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
  const selectedNominal = useStore((state) => state.selectedNominal);

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

  return (
    <>
      <Head>
        <title>Top Up {slug} | Amae Store</title>
      </Head>
      <Breadcrumbs links={links} />

      <div className="mt-4 grid grid-cols-1 md:grid-cols-8 lg:grid-cols-12">
        <div className="col-span-full md:col-span-2 lg:col-span-3">halo</div>
        <div className="col-span-full md:col-span-6 lg:col-span-9">
          <SectionTopupStep>
            <FormInput label="User ID" />
            <FormInput label="Server" type="tel" pattern="[0-9]*" />
            <FormSelect name="server" options={options} />
          </SectionTopupStep>

          <SectionTopupStep>
            {nominals.map((nominal) => (
              <CardNominal
                id={nominal.id}
                label={nominal.label}
                price={nominal.price}
                key={nominal.id}
                checked={nominal.id === selectedNominal}
              />
            ))}
          </SectionTopupStep>
        </div>
      </div>
    </>
  );
}
