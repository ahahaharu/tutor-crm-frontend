export default function DashboardPage() {
  return (
    <main className="p-6 md:p-10">
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Сводка</h1>
          <p className="text-muted-foreground mt-2">
            Добро пожаловать в Tutor CRM. Здесь скоро появятся твои ближайшие
            уроки и статистика доходов.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="bg-card rounded-xl border p-6 shadow-sm transition-all hover:shadow-md">
            <h3 className="text-muted-foreground mb-2 text-sm font-semibold">
              Уроков сегодня
            </h3>
            <p className="text-primary text-3xl font-bold">0</p>
          </div>

          <div className="bg-card rounded-xl border p-6 shadow-sm transition-all hover:shadow-md">
            <h3 className="text-muted-foreground mb-2 text-sm font-semibold">
              Активных учеников
            </h3>
            <p className="text-primary text-3xl font-bold">0</p>
          </div>

          <div className="bg-card rounded-xl border p-6 shadow-sm transition-all hover:shadow-md">
            <h3 className="text-muted-foreground mb-2 text-sm font-semibold">
              Доход за месяц
            </h3>
            <p className="text-primary text-3xl font-bold">₽ 0</p>
          </div>
        </div>
      </div>
    </main>
  );
}
