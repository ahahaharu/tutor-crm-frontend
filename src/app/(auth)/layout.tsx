import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-muted/30 relative flex min-h-screen items-center justify-center p-4">
      <Link
        href="/"
        className="text-muted-foreground hover:text-foreground absolute top-4 left-4 flex items-center gap-2 text-sm font-medium transition-colors md:top-8 md:left-8"
      >
        <ArrowLeft className="h-4 w-4" />
        На главную
      </Link>

      {children}
    </div>
  );
}
