import Link from 'next/link';

export const Logo = () => (
  <Link href="/" className="flex items-center gap-2">
    <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-lg font-bold">
      T
    </div>
    <span className="text-xl font-bold tracking-tight">Tutor CRM</span>
  </Link>
);
