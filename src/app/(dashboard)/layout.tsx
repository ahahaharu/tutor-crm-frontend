import { DashboardHeader } from '@/components/layout/dashboard-header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-muted/10 flex min-h-screen flex-col">
      <DashboardHeader />

      <div className="flex flex-1">
        <div className="w-full flex-1">{children}</div>
      </div>
    </div>
  );
}
