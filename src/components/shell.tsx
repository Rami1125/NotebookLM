import { Link, useRouterState } from "@tanstack/react-router";
import {
  Clapperboard,
  FolderKanban,
  Images,
  LayoutDashboard,
  Library,
  MonitorPlay,
  Settings,
  Shapes,
  Sparkles,
  Users,
  BookOpenText,
  Megaphone,
  Presentation,
  Boxes,
} from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";
import { authClient } from "@/lib/auth/client";
import { UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { cx } from "./kit";

const NAV = [
  { to: "/", label: "לוח בקרה", icon: LayoutDashboard },
  { to: "/presentations", label: "סטודיו מצגות", icon: Presentation },
  { to: "/video", label: "סטודיו וידאו", icon: Clapperboard },
  { to: "/prompts", label: "מחולל פקודות AI", icon: Sparkles },
  { to: "/signage", label: "מסכי דלפק", icon: MonitorPlay },
  { to: "/products", label: "ספריית מוצרים", icon: Boxes },
  { to: "/knowledge", label: "ידע טכני", icon: BookOpenText },
  { to: "/media", label: "ספריית מדיה", icon: Images },
  { to: "/campaigns", label: "קמפיינים", icon: Megaphone },
  { to: "/templates", label: "תבניות", icon: Shapes },
  { to: "/projects", label: "פרויקטים", icon: FolderKanban },
  { to: "/team", label: "משתמשים והרשאות", icon: Users },
  { to: "/settings", label: "הגדרות מערכת", icon: Settings },
] as const;

export function BootScreen() {
  return (
    <main className="grid min-h-screen place-items-center bg-paper px-6 text-ink">
      <div className="text-center">
        <p className="text-xs font-medium tracking-[0.18em] text-accent">SABAN CREATIVE STUDIO</p>
        <h1 className="mt-2 text-3xl font-semibold">ח. סבן חומרי בניין</h1>
        <p className="mt-2 text-sm text-muted">טוען את הסטודיו…</p>
      </div>
    </main>
  );
}

export function LoginPanel() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"in" | "up">("up");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submitEmail(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const result =
        mode === "up"
          ? await authClient.signUp.email({
              name: name.trim() || email.split("@")[0] || "משתמש",
              email: email.trim(),
              password,
              callbackURL: "/",
            })
          : await authClient.signIn.email({
              email: email.trim(),
              password,
              callbackURL: "/",
            });
      if (result.error) {
        setError(result.error.message || "הפעולה נכשלה");
        setBusy(false);
        return;
      }
      window.location.assign("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "שגיאת רשת");
      setBusy(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-paper px-4 py-8 text-ink">
      <div className="w-full max-w-md rounded-3xl border border-line bg-surface p-6 shadow-sm">
        <p className="text-xs font-medium tracking-[0.16em] text-accent">SABAN CREATIVE STUDIO</p>
        <h1 className="mt-2 text-2xl font-semibold">
          {mode === "up" ? "הרשמת משתמש חדש" : "התחברות לסטודיו"}
        </h1>
        <p className="mt-2 text-sm leading-6 text-muted">
          ח. סבן חומרי בניין (1994) בע״מ — כניסה בדוא״ל וסיסמה בלבד. המשתמש הראשון במערכת
          מקבל תפקיד מנהל.
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl bg-paper p-1">
          <button
            type="button"
            className={
              mode === "up"
                ? "min-h-10 rounded-lg bg-primary px-3 text-sm font-medium text-primary-fg"
                : "min-h-10 rounded-lg px-3 text-sm text-muted"
            }
            onClick={() => {
              setMode("up");
              setError("");
            }}
          >
            הרשמה
          </button>
          <button
            type="button"
            className={
              mode === "in"
                ? "min-h-10 rounded-lg bg-primary px-3 text-sm font-medium text-primary-fg"
                : "min-h-10 rounded-lg px-3 text-sm text-muted"
            }
            onClick={() => {
              setMode("in");
              setError("");
            }}
          >
            התחברות
          </button>
        </div>

        <form className="mt-4 grid gap-3" onSubmit={(event) => void submitEmail(event)} noValidate>
          {mode === "up" ? (
            <label className="grid gap-1 text-sm">
              <span className="font-medium">שם מלא</span>
              <input
                className="min-h-11 rounded-lg border border-line bg-paper px-3 text-sm"
                name="name"
                autoComplete="name"
                placeholder="לדוגמה: ראמי מסארווה"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </label>
          ) : null}

          <label className="grid gap-1 text-sm">
            <span className="font-medium">דוא״ל</span>
            <input
              className="min-h-11 rounded-lg border border-line bg-paper px-3 text-sm"
              type="email"
              name="email"
              autoComplete="email"
              required
              placeholder="name@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>

          <label className="grid gap-1 text-sm">
            <span className="font-medium">סיסמה</span>
            <input
              className="min-h-11 rounded-lg border border-line bg-paper px-3 text-sm"
              type="password"
              name="password"
              autoComplete={mode === "up" ? "new-password" : "current-password"}
              required
              minLength={8}
              placeholder="לפחות 8 תווים"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>

          {error ? (
            <p className="rounded-lg bg-danger-soft px-3 py-2 text-sm text-danger" role="alert">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={busy || !email.trim() || password.length < 8}
            className="min-h-11 rounded-lg bg-primary px-4 text-sm font-medium text-primary-fg disabled:opacity-50"
          >
            {busy ? "מעבד…" : mode === "up" ? "יצירת חשבון והתחברות" : "התחברות"}
          </button>
        </form>

        <p className="mt-4 text-xs leading-5 text-muted">
          כניסת Google / X אינה זמינה בפריסה זו. השתמשו בטופס למעלה בלבד.
        </p>
      </div>
    </main>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const { user } = useCurrentUserState();

  return (
    <div className="min-h-screen bg-paper text-ink md:grid md:grid-cols-[16rem_1fr]">
      <aside
        className={cx(
          "no-print border-l border-line bg-surface md:sticky md:top-0 md:flex md:h-screen md:flex-col",
          open ? "fixed inset-y-0 right-0 z-40 flex w-72 flex-col shadow-xl" : "hidden",
        )}
      >
        <div className="border-b border-line px-4 py-4">
          <p className="text-xs font-medium text-accent">SABAN</p>
          <p className="text-base font-semibold">סטודיו קריאייטיב</p>
          <p className="text-xs text-muted">ח. סבן חומרי בניין</p>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto p-2">
          {NAV.map((item) => {
            const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={cx(
                  "flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm",
                  active ? "bg-primary text-primary-fg" : "text-ink hover:bg-paper",
                )}
              >
                <Icon className="size-4 shrink-0" aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      {open ? (
        <button
          className="fixed inset-0 z-30 bg-ink/30 md:hidden"
          aria-label="סגירת תפריט"
          onClick={() => setOpen(false)}
        />
      ) : null}
      <div className="min-w-0">
        <header className="no-print sticky top-0 z-20 flex min-h-16 items-center justify-between gap-3 border-b border-line bg-paper/95 px-4 backdrop-blur">
          <button
            type="button"
            className="min-h-11 rounded-lg border border-line bg-surface px-3 text-sm md:hidden"
            onClick={() => setOpen(true)}
          >
            תפריט
          </button>
          <div className="hidden md:block">
            <p className="text-sm font-medium">סטודיו יצירה שיווקית וטכנית</p>
            <p className="text-xs text-muted">{user?.displayName || user?.primaryEmail || "משתמש מחובר"}</p>
          </div>
          <UserButton />
        </header>
        <div className="mx-auto w-full max-w-6xl px-4 py-5">{children}</div>
      </div>
    </div>
  );
}

export function PageTitle({ eyebrow, title, lede }: { eyebrow?: string; title: string; lede?: string }) {
  return (
    <header className="mb-5">
      {eyebrow ? <p className="text-xs font-medium text-accent">{eyebrow}</p> : null}
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      {lede ? <p className="mt-1 max-w-3xl text-sm leading-6 text-muted">{lede}</p> : null}
    </header>
  );
}

export function LibraryMark() {
  return <Library className="size-4" aria-hidden="true" />;
}
