import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Logo } from './logo';
import { logoutAction } from '@/app/(auth)/logout-action';

export const DashboardHeader = () => {
  return (
    <header className="bg-card sticky top-0 z-10 flex h-16 items-center justify-between border-b px-6 lg:px-12">
      <Logo />

      <div className="flex items-center gap-4">
        <span className="text-muted-foreground hidden text-sm sm:inline-block">
          Привет, Репетитор!
        </span>
        <form action={logoutAction}>
          <Button variant="outline" size="sm" type="submit">
            Выйти
          </Button>
        </form>
      </div>
    </header>
  );
};
