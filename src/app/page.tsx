import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-16 items-center justify-between border-b px-6 lg:px-12">
        <div className="flex items-center gap-2">
          <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-lg font-bold">
            T
          </div>
          <span className="text-xl font-bold tracking-tight">Tutor CRM</span>
        </div>
        <nav className="flex gap-4">
          <Button variant="ghost" className="text-base font-semibold" asChild>
            <Link href="/login">Войти</Link>
          </Button>
          <Button className="px-6 text-base font-semibold" asChild>
            <Link href="/register">Регистрация</Link>
          </Button>
        </nav>
      </header>

      <main className="from-background to-muted/50 flex flex-1 flex-col items-center justify-center bg-gradient-to-b px-4 text-center sm:px-6 lg:px-8">
        <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          Управляйте своими уроками <br className="hidden sm:block" />
          <span className="text-primary">просто и эффективно</span>
        </h1>
        <p className="text-muted-foreground mt-6 max-w-2xl text-lg sm:text-xl">
          Автоматизация расписания, учет финансов и удобная база учеников для
          современных репетиторов. Всё в одном месте.
        </p>
        <div className="mt-10 flex gap-4">
          <Button size="lg" className="h-12 px-8 text-lg font-semibold" asChild>
            <Link href="/register">Начать бесплатно</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 px-8 text-lg font-semibold"
            asChild
          >
            <Link href="/login">У меня уже есть аккаунт</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
