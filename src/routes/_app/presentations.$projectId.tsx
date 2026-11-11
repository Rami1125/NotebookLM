import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge, Button, Card, Field, Input, Notice, Select, TextArea, messageOf } from "@/components/kit";
import { PageTitle } from "@/components/shell";
import { exportPptxFn, getPresentationFn, rewriteFn, saveSlideFn, setProjectStatusFn, slideActionFn } from "@/lib/saban/api";
import type { Slide } from "@/lib/saban/types";

export const Route = createFileRoute("/_app/presentations/$projectId")({
  component: Editor,
});

type AiEngine = "grok" | "gemini";

function Editor() {
  const { projectId } = Route.useParams();
  const [slides, setSlides] = useState<Slide[]>([]);
  const [active, setActive] = useState(0);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [engine, setEngine] = useState<AiEngine>("grok");
  const [polishing, setPolishing] = useState(false);
  const slide = slides[active];

  useEffect(() => {
    let live = true;
    getPresentationFn({ data: { id: projectId } })
      .then((result) => {
        if (!live) return;
        setSlides(result.slides);
        setTitle(result.project.projectName);
      })
      .catch((err: unknown) => {
        if (live) setError(messageOf(err));
      });
    return () => {
      live = false;
    };
  }, [projectId]);

  useEffect(() => {
    if (!slide) return;
    const handle = window.setTimeout(() => {
      setSaving(true);
      saveSlideFn({
        data: {
          slideId: slide.slideId,
          title: slide.title,
          subtitle: slide.subtitle,
          body: slide.body,
          technicalContent: slide.technicalContent,
          imageUrl: slide.imageUrl,
          duration: slide.duration,
          benefit: slide.benefit,
          cta: slide.cta,
          warning: slide.warning,
          layout: slide.layout,
        },
      })
        .catch((err: unknown) => setError(messageOf(err)))
        .finally(() => setSaving(false));
    }, 700);
    return () => window.clearTimeout(handle);
  }, [slide]);

  function patch(partial: Partial<Slide>) {
    setSlides((current) => current.map((item, index) => (index === active ? { ...item, ...partial } : item)));
  }

  async function act(action: "up" | "down" | "duplicate" | "delete") {
    if (!slide) return;
    const next = await slideActionFn({ data: { slideId: slide.slideId, action } });
    setSlides(next);
    setActive((index) => Math.max(0, Math.min(index, next.length - 1)));
  }

  async function exportPptx() {
    try {
      const file = await exportPptxFn({ data: { id: projectId } });
      const bytes = Uint8Array.from(atob(file.base64), (char) => char.charCodeAt(0));
      const blob = new Blob([bytes], {
        type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = file.filename;
      anchor.click();
      URL.revokeObjectURL(url);
      toast.success("קובץ PPTX ירד");
    } catch (err) {
      setError(messageOf(err));
    }
  }

  async function polish() {
    if (!slide) return;
    setPolishing(true);
    setError("");
    try {
      const result = await rewriteFn({
        data: {
          draft: `${slide.title}\n${slide.body}`,
          instruction: "שפרו את הניסוח השיווקי בלי להוסיף עובדות טכניות",
          engine,
        },
      });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      patch({ body: result.text });
      toast.success(`הניסוח עודכן עם ${engine === "gemini" ? "Gemini" : "Grok"}. בדקו אותו לפני פרסום.`);
    } catch (err) {
      setError(messageOf(err));
    } finally {
      setPolishing(false);
    }
  }

  return (
    <div>
      <PageTitle eyebrow="עורך מצגת" title={title || "מצגת"} lede={saving ? "שומר…" : "שמירה אוטומטית אחרי עריכה."} />
      {error ? <Notice tone="danger">{error}</Notice> : null}
      <div className="no-print mb-3 flex flex-wrap items-center gap-2">
        <Button variant="ghost" onClick={() => window.print()}>
          ייצוא PDF
        </Button>
        <Button variant="ghost" onClick={() => void exportPptx()}>
          ייצוא PPTX
        </Button>
        <Button
          variant="soft"
          onClick={() =>
            void setProjectStatusFn({ data: { id: projectId, status: "PENDING_REVIEW" } }).then(() =>
              toast.success("נשלח לאישור"),
            )
          }
        >
          שליחה לאישור
        </Button>
        <label className="inline-flex items-center gap-1.5 text-sm text-muted">
          <span className="whitespace-nowrap">מנוע AI</span>
          <Select
            className="min-h-11 w-auto min-w-[7.5rem]"
            value={engine}
            onChange={(event) => setEngine(event.target.value as AiEngine)}
            aria-label="בחירת מנוע AI"
          >
            <option value="grok">Grok</option>
            <option value="gemini">Gemini</option>
          </Select>
        </label>
        <Button variant="ghost" disabled={!slide || polishing} onClick={() => void polish()}>
          {polishing ? "משפר…" : "שיפור ניסוח"}
        </Button>
      </div>
      <div className="grid gap-4 lg:grid-cols-[16rem_1fr]">
        <div className="no-print grid gap-2">
          {slides.map((item, index) => (
            <button
              key={item.slideId}
              type="button"
              onClick={() => setActive(index)}
              className={`rounded-xl border px-3 py-2 text-right text-sm ${
                index === active ? "border-primary bg-primary text-primary-fg" : "border-line bg-surface"
              }`}
            >
              {item.slideNumber}. {item.title}
            </button>
          ))}
        </div>
        {slide ? (
          <div className="grid gap-3">
            <Card className="print-sheet aspect-video overflow-hidden bg-paper">
              <p className="text-xs text-accent">{slide.subtitle}</p>
              <h2 className="mt-2 text-3xl font-semibold text-primary">{slide.title}</h2>
              <p className="mt-4 max-w-2xl whitespace-pre-wrap text-base leading-7">{slide.body}</p>
              {slide.technicalContent ? (
                <p className="mt-3 whitespace-pre-wrap text-sm text-muted">{slide.technicalContent}</p>
              ) : null}
              {slide.benefit ? <p className="mt-3 text-sm font-medium">{slide.benefit}</p> : null}
              {slide.cta ? <p className="mt-4 text-sm text-accent">{slide.cta}</p> : null}
              {slide.warning ? (
                <p className="mt-4 rounded-lg bg-warn-soft px-3 py-2 text-sm text-warn">{slide.warning}</p>
              ) : null}
              {slide.imageUrl ? (
                <img src={slide.imageUrl} alt="" className="mt-4 max-h-40 rounded-lg object-contain" />
              ) : (
                <p className="mt-6 text-5xl font-semibold text-primary/15">{slide.title.slice(0, 1)}</p>
              )}
            </Card>
            <Card className="no-print grid gap-3">
              <div className="flex flex-wrap gap-2">
                <Button variant="ghost" onClick={() => void act("up")}>
                  למעלה
                </Button>
                <Button variant="ghost" onClick={() => void act("down")}>
                  למטה
                </Button>
                <Button variant="ghost" onClick={() => void act("duplicate")}>
                  שכפול
                </Button>
                <Button variant="danger" onClick={() => void act("delete")}>
                  מחיקה
                </Button>
                <Badge>{slide.layout}</Badge>
              </div>
              <Field label="כותרת">
                <Input value={slide.title} onChange={(event) => patch({ title: event.target.value })} />
              </Field>
              <Field label="כותרת משנה">
                <Input value={slide.subtitle} onChange={(event) => patch({ subtitle: event.target.value })} />
              </Field>
              <Field label="גוף">
                <TextArea value={slide.body} onChange={(event) => patch({ body: event.target.value })} />
              </Field>
              <Field label="תוכן טכני">
                <TextArea
                  value={slide.technicalContent}
                  onChange={(event) => patch({ technicalContent: event.target.value })}
                />
              </Field>
              <Field label="יתרון">
                <Input value={slide.benefit} onChange={(event) => patch({ benefit: event.target.value })} />
              </Field>
              <Field label="קריאה לפעולה">
                <Input value={slide.cta} onChange={(event) => patch({ cta: event.target.value })} />
              </Field>
              <Field label="אזהרה">
                <Input value={slide.warning} onChange={(event) => patch({ warning: event.target.value })} />
              </Field>
              <Field label="כתובת תמונה">
                <Input value={slide.imageUrl} onChange={(event) => patch({ imageUrl: event.target.value })} />
              </Field>
            </Card>
          </div>
        ) : (
          <p className="text-sm text-muted">{error ? "" : "טוען שקופיות…"}</p>
        )}
      </div>
    </div>
  );
}
