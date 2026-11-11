import { Link, createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/kit";
import { PageTitle } from "@/components/shell";
import { TEMPLATES } from "@/lib/saban/compose";

export const Route = createFileRoute("/_app/templates")({
  component: TemplatesPage,
});

const HREF = {
  presentation: "/presentations",
  video: "/video",
  signage: "/signage",
  prompt: "/prompts",
} as const;

function TemplatesPage() {
  return (
    <div>
      <PageTitle eyebrow="תבניות" title="נקודת פתיחה, לא תוכן מומצא" lede="כל תבנית מובילה למודול המתאים. הסגנון והקהל כבר מוצעים בטופס, והתוכן עדיין נבנה מהמוצר שבחרתם." />
      <div className="grid gap-3 md:grid-cols-2">
        {TEMPLATES.map((template) => (
          <Card key={template.templateId}>
            <p className="text-xs text-accent">{template.kind}</p>
            <h2 className="mt-1 text-lg font-semibold">{template.name}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{template.description}</p>
            <p className="mt-2 text-xs text-muted">{template.audience} · {template.visualStyle} · {template.format}</p>
            <Link to={HREF[template.kind]} className="mt-3 inline-flex min-h-11 items-center text-sm font-medium text-primary">
              פתיחה במודול
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
