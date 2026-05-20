import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="from-background to-muted/50 flex min-h-screen flex-1 flex-col items-center justify-center bg-gradient-to-b px-4 text-center sm:px-6 lg:px-8">
      <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
        Управляйте своими уроками <br className="hidden sm:block" />
        <span className="text-primary">просто и эффективно</span>
      </h1>
      <p className="text-muted-foreground mt-6 max-w-2xl text-lg sm:text-xl">
        Автоматизация расписания, учет финансов и удобная база учеников для
        современных репетиторов. Всё в одном месте.
      </p>

      <div className="mt-10 flex w-full max-w-sm flex-col gap-4 sm:max-w-none sm:flex-row sm:justify-center">
        <Button
          size="lg"
          className="h-12 w-full text-lg font-semibold sm:w-auto sm:px-8"
          asChild
        >
          <Link href="/register">Начать бесплатно</Link>
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="h-12 w-full text-lg font-semibold sm:w-auto sm:px-8"
          asChild
        >
          <Link href="/login">У меня уже есть аккаунт</Link>
        </Button>
      </div>
    </main>
  );
}
