import { Link, createFileRoute } from "@tanstack/react-router";
import { getDashboard, getStatus } from "@/lib/saban/api";
import { useLoad } from "@/lib/saban/load";
import { PageTitle } from "@/components/shell";
import { Badge, Card, Notice } from "@/components/kit";

export const Route = createFileRoute("/_app/")({
  component: Dashboard,
});

const SHORTCUTS = [
  { to: "/presentations", label: "מצגת חדשה" },
  { to: "/video", label: "תסריט וידאו" },
  { to: "/prompts", label: "פקודת AI" },
  { to: "/signage", label: "מסך דלפק" },
  { to: "/products", label: "מוצר" },
  { to: "/knowledge", label: "מקור ידע" },
] as const;

function Dashboard() {
  const board = useLoad(() => getDashboard(), []);
  const status = useLoad(() => getStatus(), []);
  const counts = board.data?.counts;

  return (
    <div>
      <PageTitle
        eyebrow="לוח בקרה"
        title="הבוקר בסטודיו"
        lede="המספרים נמשכים מהמסד של הסטודיו. רשומות הפתיחה מסומנות כממתינות לאימות ואינן מפרט טכני."
      />
      {board.error ? <Notice tone="danger">{board.error}</Notice> : null}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="מוצרים" value={counts?.products} hint="במאגר" />
        <Stat label="פרויקטים" value={counts?.projects} hint="מצגות ווידאו" />
        <Stat label="שקופיות" value={counts?.slides} hint="שנוצרו" />
        <Stat label="תסריטי וידאו" value={counts?.videos} hint="לא קבצי וידאו" />
        <Stat label="קמפיינים פעילים" value={counts?.activeCampaigns} hint="בתהליך או מאושרים" />
        <Stat label="מקורות מאומתים" value={counts?.verifiedSources} hint="ידע טכני" />
        <Stat label="ממתינים לאישור" value={counts?.pendingReview} hint="פרויקטים" />
        <Card>
          <p className="text-sm text-muted">התפקיד שלי</p>
          <p className="mt-2 text-xl font-semibold">{board.data?.member.role ?? "…"}</p>
          <p className="text-xs text-muted">{board.data?.member.email || board.data?.member.name || "אחרי כניסה"}</p>
        </Card>
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-[1.4fr_0.8fr]">
        <Card>
          <h2 className="font-medium">פרויקטים אחרונים</h2>
          <div className="mt-3 grid gap-2">
            {(board.data?.recentProjects.length ?? 0) === 0 ? (
              <p className="text-sm text-muted">{board.loading ? "טוען…" : "עדיין אין פרויקטים שמורים."}</p>
            ) : (
              board.data?.recentProjects.map((project) =>
                project.projectType === "presentation" ? (
                  <Link
                    key={project.projectId}
                    to="/presentations/$projectId"
                    params={{ projectId: project.projectId }}
                    className="flex items-center justify-between rounded-xl border border-line px-3 py-2 hover:bg-paper"
                  >
                    <span>
                      <span className="block text-sm font-medium">{project.projectName}</span>
                      <span className="text-xs text-muted">מצגת · {project.targetAudience}</span>
                    </span>
                    <Badge tone={project.status === "PENDING_REVIEW" ? "warn" : "accent"}>{project.status}</Badge>
                  </Link>
                ) : (
                  <Link
                    key={project.projectId}
                    to="/video"
                    className="flex items-center justify-between rounded-xl border border-line px-3 py-2 hover:bg-paper"
                  >
                    <span>
                      <span className="block text-sm font-medium">{project.projectName}</span>
                      <span className="text-xs text-muted">וידאו · {project.targetAudience}</span>
                    </span>
                    <Badge tone={project.status === "PENDING_REVIEW" ? "warn" : "accent"}>{project.status}</Badge>
                  </Link>
                ),
              )
            )}
          </div>
        </Card>
        <Card>
          <h2 className="font-medium">מצב חיבורים</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="flex items-center justify-between gap-2">
              <span>Google Sheets</span>
              <Badge tone={status.data?.sheets.configured ? "warn" : "neutral"}>
                {status.data?.sheets.configured ? "הוגדר, ממתין לבדיקה" : "לא מחובר"}
              </Badge>
            </li>
            <li className="flex items-center justify-between gap-2">
              <span>Google Drive</span>
              <Badge tone={status.data?.integrations.driveFolderSet ? "warn" : "neutral"}>
                {status.data?.integrations.driveFolderSet ? "מזהה תיקייה בלבד" : "לא הוגדר"}
              </Badge>
            </li>
            <li className="flex items-center justify-between gap-2">
              <span>Grok לטקסט</span>
              <Badge tone={status.data?.integrations.grok ? "ok" : "neutral"}>
                {status.data?.integrations.grok ? "זמין בלחיצה" : "לא זמין"}
              </Badge>
            </li>
            <li className="flex items-center justify-between gap-2">
              <span>קובץ וידאו</span>
              <Badge>כבוי</Badge>
            </li>
            <li className="flex items-center justify-between gap-2">
              <span>NotebookLM</span>
              <Badge>קישורים ידניים</Badge>
            </li>
          </ul>
          <p className="mt-3 text-xs leading-5 text-muted">{status.data?.sheets.message}</p>
        </Card>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {SHORTCUTS.map((item) => (
          <Link key={item.to} to={item.to} className="rounded-2xl border border-line bg-surface px-4 py-3 text-sm font-medium hover:border-accent">
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function Stat({ label, value, hint }: { label: string; value?: number; hint: string }) {
  return (
    <Card>
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-1 text-3xl font-semibold tabular-nums">{value ?? "—"}</p>
      <p className="text-xs text-muted">{hint}</p>
    </Card>
  );
}
