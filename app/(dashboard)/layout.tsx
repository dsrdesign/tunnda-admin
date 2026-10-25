import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Logo, LogoMark } from "@/components/brand/logo";
import { LogoutButton, Nav } from "@/components/layout/sidebar";
import { ApiError, adminApi } from "@/lib/api";

export default function DashboardLayout({ children }: LayoutProps<"/">) {
  return (
    <Suspense fallback={<Skeleton />}>
      <AuthedShell>{children}</AuthedShell>
    </Suspense>
  );
}

/** Vérifie la session auprès de l'API avant d'afficher quoi que ce soit : cookie périmé ou administrateur retiré → connexion. */
async function AuthedShell({ children }: { children: React.ReactNode }) {
  let admin;
  try {
    admin = await adminApi.me();
  } catch (error) {
    if (error instanceof ApiError && (error.status === 401 || error.status === 403))
      redirect("/connexion");
    throw error;
  }

  return (
    <div className="flex flex-1 flex-col md:flex-row">
      <aside className="flex flex-col gap-5 border-b border-line bg-surface/70 p-4 md:sticky md:top-0 md:h-dvh md:w-64 md:shrink-0 md:border-r md:border-b-0 md:p-5">
        <Link href="/" className="flex items-center gap-2" aria-label="Vue d’ensemble">
          <Logo size={24} />
          <span className="rounded-full bg-gold-soft px-2 py-0.5 text-[0.7rem] font-medium text-gold-text">
            Admin
          </span>
        </Link>
        <Nav />
        <div className="hidden flex-1 md:block" />
        <div className="grid gap-3 md:border-t md:border-line md:pt-4">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{admin.displayName}</p>
            <p className="truncate text-xs text-muted tabular-nums">
              {admin.phoneMasked}
            </p>
          </div>
          <LogoutButton />
        </div>
      </aside>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-8 md:py-10">
        {children}
      </main>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <span className="grid size-16 animate-pulse place-items-center rounded-full bg-forest-soft text-forest">
        <LogoMark size={34} />
      </span>
      <p className="sr-only">Chargement…</p>
    </div>
  );
}
