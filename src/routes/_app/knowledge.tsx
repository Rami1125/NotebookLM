import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Badge, Button, Card, Field, Input, Notice, Select, TextArea, messageOf } from "@/components/kit";
import { PageTitle } from "@/components/shell";
import { checkClaimFn, getKnowledge, getProducts, saveKnowledgeFn, setKnowledgeStatusFn } from "@/lib/saban/api";
import { statusLabel } from "@/lib/saban/compose";
import { useLoad } from "@/lib/saban/load";
import type { TechnicalStatus } from "@/lib/saban/types";

export const Route = createFileRoute("/_app/knowledge")({
  component: KnowledgePage,
});

function KnowledgePage() {
  const sources = useLoad(() => getKnowledge(), []);
  const products = useLoad(() => getProducts(), []);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [claim, setClaim] = useState("");
  const [productId, setProductId] = useState("");
  const [verdict, setVerdict] = useState("");
  const [form, setForm] = useState({
    title: "",
    sourceType: "tds" as const,
    sourceUrl: "",
    productId: "",
    documentUrl: "",
    verificationStatus: "NEEDS_VERIFICATION" as TechnicalStatus,
    lastVerified: "",
    notes: "",
    excerpt: "",
  });

  const visible = (sources.data ?? []).filter((source) => {
    const blob = `${source.title} ${source.notes} ${source.excerpt}`.toLowerCase();
    return blob.includes(query.trim().toLowerCase());
  });

  async function save() {
    try {
      await saveKnowledgeFn({ data: form });
      toast.success("המקור נשמר");
      sources.reload();
      setForm({ ...form, title: "", sourceUrl: "", documentUrl: "", notes: "", excerpt: "" });
    } catch (err) {
      setError(messageOf(err));
    }
  }

  async function check() {
    try {
      const result = await checkClaimFn({ data: { claim, productId } });
      setVerdict(`${statusLabel(result.status)}. ${result.warning}`.trim());
    } catch (err) {
      setError(messageOf(err));
    }
  }

  return (
    <div>
      <PageTitle
        eyebrow="ידע טכני"
        title="מקור ליד כל טענה"
        lede="NotebookLM נשמר כאן כקישור למחברת וכמסמך שיוצא ממנה. אין חיבור API ישיר למחברת, ולא נוצרים נתונים טכניים יש מאין."
      />
      {error ? <Notice tone="danger">{error}</Notice> : null}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="grid gap-3">
          <h2 className="font-medium">מקור חדש</h2>
          <Field label="כותרת"><Input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} /></Field>
          <Field label="סוג">
            <Select value={form.sourceType} onChange={(event) => setForm({ ...form, sourceType: event.target.value as typeof form.sourceType })}>
              <option value="manufacturer">אתר יצרן</option>
              <option value="tds">גיליון טכני</option>
              <option value="sds">גיליון בטיחות</option>
              <option value="catalog">קטלוג</option>
              <option value="standard">תקן</option>
              <option value="notebooklm">מחברת NotebookLM</option>
              <option value="other">אחר</option>
            </Select>
          </Field>
          <Field label="מוצר">
            <Select value={form.productId} onChange={(event) => setForm({ ...form, productId: event.target.value })}>
              <option value="">בלי שיוך</option>
              {(products.data ?? []).map((product) => <option key={product.productId} value={product.productId}>{product.nameHe}</option>)}
            </Select>
          </Field>
          <Field label="כתובת מקור"><Input value={form.sourceUrl} onChange={(event) => setForm({ ...form, sourceUrl: event.target.value })} /></Field>
          <Field label="מסמך שיוצא"><Input value={form.documentUrl} onChange={(event) => setForm({ ...form, documentUrl: event.target.value })} /></Field>
          <Field label="ציטוט מהמסמך"><TextArea value={form.excerpt} onChange={(event) => setForm({ ...form, excerpt: event.target.value })} /></Field>
          <Field label="הערות"><TextArea value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} /></Field>
          <Field label="סטטוס">
            <Select value={form.verificationStatus} onChange={(event) => setForm({ ...form, verificationStatus: event.target.value as TechnicalStatus })}>
              <option value="NEEDS_VERIFICATION">ממתין לאימות</option>
              <option value="USER_PROVIDED">סופק על ידי המשתמש</option>
              <option value="VERIFIED">מאומת</option>
              <option value="OUTDATED">לא עדכני</option>
            </Select>
          </Field>
          <Button disabled={form.title.trim().length < 2} onClick={() => void save()}>שמירת מקור</Button>
        </Card>
        <Card className="grid gap-3">
          <h2 className="font-medium">בדיקת טענה מול הציטוטים</h2>
          <Field label="מוצר לבדיקה">
            <Select value={productId} onChange={(event) => setProductId(event.target.value)}>
              <option value="">כל המקורות</option>
              {(products.data ?? []).map((product) => <option key={product.productId} value={product.productId}>{product.nameHe}</option>)}
            </Select>
          </Field>
          <Field label="טענה"><TextArea value={claim} onChange={(event) => setClaim(event.target.value)} /></Field>
          <Button variant="soft" onClick={() => void check()}>בדיקה מקומית</Button>
          {verdict ? <Notice tone="warn">{verdict}</Notice> : null}
          <p className="text-xs leading-5 text-muted">הבדיקה משווה את המילים לציטוט שסומן כמאומת. היא לא גולשת לאינטרנט ולא שואלת מודל אם מותר להמציא מספר.</p>
        </Card>
      </div>
      <div className="mt-4">
        <Input placeholder="חיפוש במקורות" value={query} onChange={(event) => setQuery(event.target.value)} />
      </div>
      <div className="mt-3 grid gap-3">
        {visible.map((source) => (
          <Card key={source.sourceId}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-medium">{source.title}</h3>
              <Badge tone={source.verificationStatus === "VERIFIED" ? "ok" : "warn"}>{statusLabel(source.verificationStatus)}</Badge>
            </div>
            <p className="mt-1 text-xs text-muted">{source.sourceType} {source.lastVerified ? `· נבדק ${source.lastVerified}` : ""}</p>
            {source.excerpt ? <p className="mt-2 whitespace-pre-wrap text-sm leading-6">{source.excerpt}</p> : null}
            <div className="mt-2 flex flex-wrap gap-3 text-sm">
              {source.sourceUrl ? <a className="text-accent underline" href={source.sourceUrl} target="_blank" rel="noreferrer">מקור</a> : null}
              {source.documentUrl ? <a className="text-accent underline" href={source.documentUrl} target="_blank" rel="noreferrer">מסמך</a> : null}
            </div>
            <div className="mt-3">
              <Button variant="ghost" onClick={() => void setKnowledgeStatusFn({ data: { id: source.sourceId, status: "VERIFIED" } }).then(() => sources.reload()).catch((err) => setError(messageOf(err)))}>
                סמן כמאומת
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
