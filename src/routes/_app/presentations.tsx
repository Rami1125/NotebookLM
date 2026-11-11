import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PageTitle } from "@/components/shell";
import { Button, Card, Empty, Field, Input, Notice, Select, TextArea } from "@/components/kit";
import { AUDIENCES, PRESENTATION_FORMATS, VISUAL_STYLES } from "@/lib/saban/compose";
import { generatePresentationFn, getProducts, getProjects } from "@/lib/saban/api";
import { useLoad } from "@/lib/saban/load";
import { messageOf } from "@/components/kit";

export const Route = createFileRoute("/_app/presentations")({
  component: PresentationsPage,
});

function PresentationsPage() {
  const navigate = useNavigate();
  const products = useLoad(() => getProducts(), []);
  const projects = useLoad(() => getProjects(), []);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    projectName: "",
    productId: "",
    targetAudience: AUDIENCES[0] as string,
    goal: "להציג את המוצר לצוות בלי להמציא מפרט",
    visualStyle: VISUAL_STYLES[0] as string,
    format: PRESENTATION_FORMATS[0] as string,
    slideCount: 8,
  });

  async function createProject() {
    setBusy(true);
    setError("");
    try {
      const result = await generatePresentationFn({
        data: { ...form, slideCount: Number(form.slideCount) },
      });
      toast.success("המצגת נשמרה");
      await navigate({ to: "/presentations/$projectId", params: { projectId: result.project.projectId } });
    } catch (err) {
      setError(messageOf(err));
    } finally {
      setBusy(false);
    }
  }

  const decks = (projects.data ?? []).filter((project) => project.projectType === "presentation");

  return (
    <div>
      <PageTitle
        eyebrow="סטודיו מצגות"
        title="מצגת מתוך המוצר, לא מתוך ניחוש"
        lede="המערכת מרכיבה שקופיות רק מהשדות שנשמרו. נתון טכני שלא אומת מקבל אזהרה, לא מספר מומצא."
      />
      {error ? <Notice tone="danger">{error}</Notice> : null}
      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <h2 className="font-medium">מצגת חדשה</h2>
          <div className="mt-3 grid gap-3">
            <Field label="שם המצגת">
              <Input value={form.projectName} onChange={(event) => setForm({ ...form, projectName: event.target.value })} />
            </Field>
            <Field label="מוצר">
              <Select value={form.productId} onChange={(event) => setForm({ ...form, productId: event.target.value })}>
                <option value="">בחרו מוצר</option>
                {(products.data ?? []).map((product) => (
                  <option key={product.productId} value={product.productId}>
                    {product.nameHe}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="קהל">
              <Select value={form.targetAudience} onChange={(event) => setForm({ ...form, targetAudience: event.target.value })}>
                {AUDIENCES.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </Select>
            </Field>
            <Field label="מטרה">
              <TextArea value={form.goal} onChange={(event) => setForm({ ...form, goal: event.target.value })} />
            </Field>
            <div className="grid gap-3 sm:grid-cols-3">
              <Field label="סגנון">
                <Select value={form.visualStyle} onChange={(event) => setForm({ ...form, visualStyle: event.target.value })}>
                  {VISUAL_STYLES.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </Select>
              </Field>
              <Field label="פורמט">
                <Select value={form.format} onChange={(event) => setForm({ ...form, format: event.target.value })}>
                  {PRESENTATION_FORMATS.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </Select>
              </Field>
              <Field label="שקופיות">
                <Input
                  type="number"
                  min={4}
                  max={12}
                  value={form.slideCount}
                  onChange={(event) => setForm({ ...form, slideCount: Number(event.target.value) })}
                />
              </Field>
            </div>
            <Button disabled={busy || !form.productId || form.projectName.trim().length < 2} onClick={() => void createProject()}>
              {busy ? "יוצר…" : "יצירת מצגת"}
            </Button>
          </div>
        </Card>
        <Card>
          <h2 className="font-medium">מצגות שמורות</h2>
          <div className="mt-3 grid gap-2">
            {decks.length === 0 ? <Empty title="אין מצגות" body="צרו מצגת מהטופס. היא תישמר מיד במסד." /> : null}
            {decks.map((project) => (
              <Link
                key={project.projectId}
                to="/presentations/$projectId"
                params={{ projectId: project.projectId }}
                className="rounded-xl border border-line px-3 py-3 hover:bg-paper"
              >
                <span className="block font-medium">{project.projectName}</span>
                <span className="text-xs text-muted">
                  {project.targetAudience} · {project.format} · {project.status}
                </span>
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
