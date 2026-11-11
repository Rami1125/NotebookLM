import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button, Card, Empty, Field, Input, Notice, Select, TextArea, messageOf } from "@/components/kit";
import { PageTitle } from "@/components/shell";
import { AUDIENCES } from "@/lib/saban/compose";
import { generateVideoFn, getProducts, getVideos } from "@/lib/saban/api";
import { useLoad } from "@/lib/saban/load";

export const Route = createFileRoute("/_app/video")({
  component: VideoHome,
});

function VideoHome() {
  const navigate = useNavigate();
  const products = useLoad(() => getProducts(), []);
  const videos = useLoad(() => getVideos(), []);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    title: "",
    productId: "",
    targetAudience: AUDIENCES[0] as string,
    goal: "להסביר את המוצר בלי נתון שלא אומת",
    duration: 30,
    aspectRatio: "16:9" as "16:9" | "9:16" | "1:1",
  });

  async function create() {
    setBusy(true);
    setError("");
    try {
      const video = await generateVideoFn({ data: { ...form, duration: Number(form.duration) } });
      toast.success("התסריט נשמר. לא נוצר קובץ וידאו.");
      await navigate({ to: "/video/$videoId", params: { videoId: video.videoId } });
    } catch (err) {
      setError(messageOf(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <PageTitle
        eyebrow="סטודיו וידאו"
        title="תסריט ולוח סצנות"
        lede="כאן נוצרים רעיון, קריינות, שוטים ופקודה למנוע וידאו. יצירת קובץ הווידאו עצמו כבויה עד שספק מדיה יופעל בנפרד."
      />
      <Notice>ספק קובץ הווידאו לא פעיל. אפשר להעתיק את הפקודה למנוע חיצוני.</Notice>
      {error ? <div className="mt-3"><Notice tone="danger">{error}</Notice></div> : null}
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card>
          <div className="grid gap-3">
            <Field label="שם"><Input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} /></Field>
            <Field label="מוצר">
              <Select value={form.productId} onChange={(event) => setForm({ ...form, productId: event.target.value })}>
                <option value="">בחרו מוצר</option>
                {(products.data ?? []).map((product) => (
                  <option key={product.productId} value={product.productId}>{product.nameHe}</option>
                ))}
              </Select>
            </Field>
            <Field label="קהל">
              <Select value={form.targetAudience} onChange={(event) => setForm({ ...form, targetAudience: event.target.value })}>
                {AUDIENCES.map((item) => <option key={item}>{item}</option>)}
              </Select>
            </Field>
            <Field label="מטרה"><TextArea value={form.goal} onChange={(event) => setForm({ ...form, goal: event.target.value })} /></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="משך בשניות"><Input type="number" min={15} max={90} value={form.duration} onChange={(event) => setForm({ ...form, duration: Number(event.target.value) })} /></Field>
              <Field label="יחס">
                <Select value={form.aspectRatio} onChange={(event) => setForm({ ...form, aspectRatio: event.target.value as "16:9" | "9:16" | "1:1" })}>
                  <option>16:9</option>
                  <option>9:16</option>
                  <option>1:1</option>
                </Select>
              </Field>
            </div>
            <Button disabled={busy || !form.productId || form.title.trim().length < 2} onClick={() => void create()}>
              {busy ? "כותב תסריט…" : "יצירת תסריט"}
            </Button>
          </div>
        </Card>
        <Card>
          <h2 className="font-medium">תסריטים שמורים</h2>
          <div className="mt-3 grid gap-2">
            {(videos.data ?? []).length === 0 ? <Empty title="אין תסריטים" body="יצירה שומרת גרסת SCRIPT בלבד." /> : null}
            {(videos.data ?? []).map((video) => (
              <Link key={video.videoId} to="/video/$videoId" params={{ videoId: video.videoId }} className="rounded-xl border border-line px-3 py-3 hover:bg-paper">
                <span className="block font-medium">{video.title}</span>
                <span className="text-xs text-muted">{video.aspectRatio} · {video.duration}ש · {video.status}</span>
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
