import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Logo } from './logo';

export const MarketingHeader = () => (
  <header className="bg-card sticky top-0 z-10 flex h-16 items-center justify-between border-b px-4 sm:px-6 lg:px-12">
    <Logo />
    <nav className="flex items-center gap-2 sm:gap-4">
      <Button variant="ghost" className="px-3 font-semibold sm:px-4" asChild>
        <Link href="/login">Войти</Link>
      </Button>
      <Button className="px-4 font-semibold sm:px-6" asChild>
        <Link href="/register">Регистрация</Link>
      </Button>
    </nav>
  </header>
);
