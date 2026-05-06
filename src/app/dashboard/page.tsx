import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-card flex h-16 items-center justify-between border-b px-6">
        <div className="flex items-center gap-2">
          <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-lg font-bold">
            T
          </div>
          <span className="text-xl font-bold tracking-tight">Дашборд</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-muted-foreground text-sm">
            Привет, Репетитор!
          </span>
          <Button variant="outline" size="sm" asChild>
            <Link href="/login">Выйти</Link>
          </Button>
        </div>
      </header>

      <main className="bg-muted/10 flex-1 p-6 md:p-10">
        <div className="mx-auto max-w-4xl space-y-6">
          <h1 className="text-3xl font-bold tracking-tight">Сводка</h1>
          <p className="text-muted-foreground">
            Добро пожаловать в Tutor CRM. Здесь скоро появятся твои ближайшие
            уроки и статистика доходов.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="bg-card rounded-xl border p-6 shadow-sm">
              <h3 className="mb-2 font-semibold">Уроков сегодня</h3>
              <p className="text-primary text-3xl font-bold">0</p>
            </div>
            <div className="bg-card rounded-xl border p-6 shadow-sm">
              <h3 className="mb-2 font-semibold">Активных учеников</h3>
              <p className="text-primary text-3xl font-bold">0</p>
            </div>
            <div className="bg-card rounded-xl border p-6 shadow-sm">
              <h3 className="mb-2 font-semibold">Доход за месяц</h3>
              <p className="text-primary text-3xl font-bold">₽ 0</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
