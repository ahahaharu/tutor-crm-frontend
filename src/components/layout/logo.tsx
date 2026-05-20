import Image from 'next/image';
import Link from 'next/link';

export const Logo = () => (
  <Link href="/" className="flex items-center gap-2">
    <Image
      src="/logo.svg"
      alt="TutorCRM Logo"
      width={30}
      height={30}
      priority
    />
    <span className="text-xl font-bold tracking-tight">Tutor CRM</span>
  </Link>
);
