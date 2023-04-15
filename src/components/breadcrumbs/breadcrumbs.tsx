import Link from 'next/link';

export interface BreadcrumbLink {
  label: string;
  href: string;
  active?: boolean;
}

export interface BreadcrumbsProps {
  links: BreadcrumbLink[];
}

const Breadcrumbs = (props: BreadcrumbsProps) => {
  return (
    <div className="breadcrumbs text-sm">
      <ul>
        {props.links.map((link) =>
          link.active ? (
            <li className="font-medium text-primary" key={link.href}>
              {link.label}
            </li>
          ) : (
            <li className="text-zinc-600" key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ),
        )}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
