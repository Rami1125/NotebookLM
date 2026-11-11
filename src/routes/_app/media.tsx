import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button, Card, Field, Input, Notice, Select, messageOf } from "@/components/kit";
import { PageTitle } from "@/components/shell";
import { deleteMediaFn, getMedia, getProducts, saveMediaFn } from "@/lib/saban/api";
import { useLoad } from "@/lib/saban/load";

export const Route = createFileRoute("/_app/media")({
  component: MediaPage,
});

function MediaPage() {
  const media = useLoad(() => getMedia(), []);
  const products = useLoad(() => getProducts(), []);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    fileName: "",
    mediaType: "image" as const,
    productId: "",
    sourceType: "link" as const,
    sourceUrl: "",
    storageUrl: "",
    licenseStatus: "UNSPECIFIED" as const,
    notes: "",
  });

  async function save() {
    try {
      await saveMediaFn({ data: form });
      toast.success("המדיה נשמרה ככתובת");
      media.reload();
      setForm({ ...form, fileName: "", sourceUrl: "", storageUrl: "", notes: "" });
    } catch (err) {
      setError(messageOf(err));
    }
  }

  return (
    <div>
      <PageTitle eyebrow="ספריית מדיה" title="מטא־דאטה, לא קבצים בתוך תא" lede="תמונה ווידאו גדולים לא נשמרים בגיליון. שומרים שם קובץ, כתובת, סוג, מוצר ורישיון. Drive ו־Blob אינם מחוברים להעלאה." />
      {error ? <Notice tone="danger">{error}</Notice> : null}
      <Card className="grid gap-3 md:grid-cols-2">
        <Field label="שם קובץ"><Input value={form.fileName} onChange={(event) => setForm({ ...form, fileName: event.target.value })} /></Field>
        <Field label="סוג">
          <Select value={form.mediaType} onChange={(event) => setForm({ ...form, mediaType: event.target.value as typeof form.mediaType })}>
            <option value="image">תמונה</option>
            <option value="video">וידאו</option>
            <option value="document">מסמך</option>
            <option value="audio">שמע</option>
          </Select>
        </Field>
        <Field label="מוצר">
          <Select value={form.productId} onChange={(event) => setForm({ ...form, productId: event.target.value })}>
            <option value="">בלי שיוך</option>
            {(products.data ?? []).map((product) => <option key={product.productId} value={product.productId}>{product.nameHe}</option>)}
          </Select>
        </Field>
        <Field label="מקור">
          <Select value={form.sourceType} onChange={(event) => setForm({ ...form, sourceType: event.target.value as typeof form.sourceType })}>
            <option value="link">קישור</option>
            <option value="drive">Drive</option>
            <option value="manufacturer">יצרן</option>
            <option value="upload">העלאה חיצונית</option>
            <option value="generated">נוצר</option>
          </Select>
        </Field>
        <Field label="כתובת מקור"><Input value={form.sourceUrl} onChange={(event) => setForm({ ...form, sourceUrl: event.target.value })} /></Field>
        <Field label="כתובת אחסון"><Input value={form.storageUrl} onChange={(event) => setForm({ ...form, storageUrl: event.target.value })} /></Field>
        <Field label="רישיון">
          <Select value={form.licenseStatus} onChange={(event) => setForm({ ...form, licenseStatus: event.target.value as typeof form.licenseStatus })}>
            <option value="UNSPECIFIED">לא צוין</option>
            <option value="OWNED">בבעלות העסק</option>
            <option value="LICENSED">ברישיון</option>
            <option value="MANUFACTURER">חומר יצרן</option>
            <option value="RESTRICTED">מוגבל</option>
          </Select>
        </Field>
        <Field label="הערה"><Input value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} /></Field>
        <div className="md:col-span-2"><Button disabled={!form.fileName.trim()} onClick={() => void save()}>שמירה</Button></div>
      </Card>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {(media.data ?? []).map((item) => (
          <Card key={item.mediaId}>
            <p className="font-medium">{item.fileName}</p>
            <p className="text-xs text-muted">{item.mediaType} · {item.licenseStatus}</p>
            {item.storageUrl || item.sourceUrl ? (
              <a className="mt-2 block truncate text-sm text-accent underline" href={item.storageUrl || item.sourceUrl} target="_blank" rel="noreferrer">
                {item.storageUrl || item.sourceUrl}
              </a>
            ) : null}
            <Button className="mt-3" variant="danger" onClick={() => void deleteMediaFn({ data: { id: item.mediaId } }).then(() => media.reload())}>מחיקה</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
