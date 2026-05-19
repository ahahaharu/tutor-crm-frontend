import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Logo } from './logo';

export const MarketingHeader = () => (
  <header className="bg-card sticky top-0 z-10 flex h-16 items-center justify-between border-b px-6 lg:px-12">
    <Logo />
    <nav className="flex gap-4">
      <Button variant="ghost" className="font-semibold" asChild>
        <Link href="/login">Войти</Link>
      </Button>
      <Button className="px-6 font-semibold" asChild>
        <Link href="/register">Регистрация</Link>
      </Button>
    </nav>
  </header>
);
