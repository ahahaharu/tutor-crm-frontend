'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Logo } from './logo';
import { useEffect, useState } from 'react';
import { LogIn, Menu, UserPlus, X } from 'lucide-react';

export const MarketingHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="bg-card sticky top-0 z-30 border-b">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-12">
        <Logo />
        <nav className="hidden items-center gap-4 sm:flex sm:gap-4">
          <Button
            variant="ghost"
            className="px-3 font-semibold sm:px-4"
            asChild
          >
            <Link href="/login">Войти</Link>
          </Button>
          <Button className="px-4 font-semibold sm:px-6" asChild>
            <Link href="/register">Регистрация</Link>
          </Button>
        </nav>

        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-md transition-colors hover:bg-accent sm:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={isOpen}
        >
          <Menu
            className={`text-foreground absolute h-6 w-6 transition-all duration-300 ${
              isOpen ? 'scale-50 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'
            }`}
          />
          <X
            className={`text-foreground absolute h-6 w-6 transition-all duration-300 ${
              isOpen ? 'scale-100 rotate-0 opacity-100' : 'scale-50 -rotate-90 opacity-0'
            }`}
          />
        </button>
      </div>

      <div
        className={`fixed inset-x-0 top-16 bottom-0 z-20 bg-black/40 backdrop-blur-sm transition-opacity duration-300 sm:hidden ${
          isOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <div
        className={`bg-card fixed inset-x-0 top-16 z-20 origin-top overflow-hidden border-b shadow-xl transition-[max-height,opacity] duration-300 ease-out sm:hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col gap-3 px-4 py-6">
          <Button
            variant="outline"
            size="lg"
            className="w-full justify-start gap-3 text-base font-semibold"
            asChild
            onClick={closeMenu}
          >
            <Link href="/login">
              <LogIn className="h-5 w-5" />
              Войти
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full justify-start gap-3 text-base font-semibold"
            asChild
            onClick={closeMenu}
          >
            <Link href="/register">
              <UserPlus className="h-5 w-5" />
              Регистрация
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};
