import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Badge, Button, Card, Empty, Field, Input, Notice, Select, TextArea, messageOf } from "@/components/kit";
import { PageTitle } from "@/components/shell";
import { statusLabel } from "@/lib/saban/compose";
import { createProductFn, deleteProductFn, getProducts, importProductsFn, updateProductFn } from "@/lib/saban/api";
import { productInputSchema, type ProductInput } from "@/lib/saban/schemas";
import { useLoad } from "@/lib/saban/load";
import type { Product, TechnicalStatus } from "@/lib/saban/types";

export const Route = createFileRoute("/_app/products")({
  component: ProductsPage,
});

const EMPTY: ProductInput = {
  sku: "",
  nameHe: "",
  nameEn: "",
  manufacturer: "",
  category: "",
  packageSize: "",
  description: "",
  marketingBenefits: "",
  technicalData: "",
  technicalStatus: "NEEDS_VERIFICATION",
  manufacturerUrl: "",
  technicalSheetUrl: "",
  productImageUrl: "",
  priceText: "",
  priceApproved: false,
  promoText: "",
  complementaryIds: [],
};

function fromProduct(product: Product): ProductInput & { productId: string } {
  return { ...product, productId: product.productId };
}

function ProductsPage() {
  const products = useLoad(() => getProducts(), []);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [form, setForm] = useState<ProductInput & { productId?: string }>(EMPTY);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const categories = useMemo(() => [...new Set((products.data ?? []).map((item) => item.category).filter(Boolean))], [products.data]);
  const visible = (products.data ?? []).filter((product) => {
    const blob = `${product.nameHe} ${product.nameEn} ${product.sku} ${product.manufacturer}`.toLowerCase();
    const matchesQuery = blob.includes(query.trim().toLowerCase());
    const matchesCategory = !category || product.category === category;
    return matchesQuery && matchesCategory;
  });

  async function save() {
    setError("");
    try {
      if (form.productId) {
        await updateProductFn({ data: { ...form, productId: form.productId } });
      } else {
        await createProductFn({ data: form });
      }
      toast.success("המוצר נשמר");
      setOpen(false);
      setForm(EMPTY);
      products.reload();
    } catch (err) {
      setError(messageOf(err));
    }
  }

  async function onFile(file: File) {
    try {
      const rows = file.name.endsWith(".csv") ? await rowsFromCsv(await file.text()) : await rowsFromExcel(await file.arrayBuffer());
      const parsed = rows.map((row) => productInputSchema.parse(row));
      const result = await importProductsFn({ data: { rows: parsed } });
      toast.success(`יובאו ${result.created} מוצרים`);
      if (result.skipped.length) setError(result.skipped.slice(0, 4).join(" · "));
      products.reload();
    } catch (err) {
      setError(messageOf(err));
    }
  }

  return (
    <div>
      <PageTitle eyebrow="ספריית מוצרים" title="מודיעין מוצר" lede="שמונת המוצרים הראשונים הם רשומות פתיחה בסטטוס ממתין לאימות. אל תתייחסו אליהם כאל דף נתונים." />
      {error ? <Notice tone="danger">{error}</Notice> : null}
      <div className="mb-3 flex flex-wrap gap-2">
        <Input className="max-w-xs" placeholder="חיפוש" value={query} onChange={(event) => setQuery(event.target.value)} />
        <Select className="max-w-xs" value={category} onChange={(event) => setCategory(event.target.value)}>
          <option value="">כל הקטגוריות</option>
          {categories.map((item) => <option key={item}>{item}</option>)}
        </Select>
        <Button onClick={() => { setForm(EMPTY); setOpen(true); }}>מוצר חדש</Button>
        <label className="inline-flex min-h-11 cursor-pointer items-center rounded-lg border border-line bg-surface px-4 text-sm">
          יבוא CSV / Excel
          <input
            className="sr-only"
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void onFile(file);
              event.target.value = "";
            }}
          />
        </label>
      </div>
      {open ? (
        <Card className="mb-4 grid gap-3 md:grid-cols-2">
          <Field label="שם בעברית"><Input value={form.nameHe} onChange={(event) => setForm({ ...form, nameHe: event.target.value })} /></Field>
          <Field label="שם באנגלית"><Input value={form.nameEn} onChange={(event) => setForm({ ...form, nameEn: event.target.value })} /></Field>
          <Field label="מק״ט"><Input value={form.sku} onChange={(event) => setForm({ ...form, sku: event.target.value })} /></Field>
          <Field label="יצרן"><Input value={form.manufacturer} onChange={(event) => setForm({ ...form, manufacturer: event.target.value })} /></Field>
          <Field label="קטגוריה"><Input value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} /></Field>
          <Field label="אריזה"><Input value={form.packageSize} onChange={(event) => setForm({ ...form, packageSize: event.target.value })} /></Field>
          <Field label="סטטוס טכני">
            <Select value={form.technicalStatus} onChange={(event) => setForm({ ...form, technicalStatus: event.target.value as TechnicalStatus })}>
              <option value="NEEDS_VERIFICATION">ממתין לאימות</option>
              <option value="USER_PROVIDED">סופק על ידי המשתמש</option>
              <option value="VERIFIED">מאומת</option>
              <option value="OUTDATED">לא עדכני</option>
            </Select>
          </Field>
          <Field label="מחיר (מוסתר עד אישור)"><Input value={form.priceText} onChange={(event) => setForm({ ...form, priceText: event.target.value })} /></Field>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.priceApproved} onChange={(event) => setForm({ ...form, priceApproved: event.target.checked })} />
            המחיר אושר להצגה
          </label>
          <Field label="מבצע"><Input value={form.promoText} onChange={(event) => setForm({ ...form, promoText: event.target.value })} /></Field>
          <Field label="אתר יצרן"><Input value={form.manufacturerUrl} onChange={(event) => setForm({ ...form, manufacturerUrl: event.target.value })} /></Field>
          <Field label="גיליון טכני"><Input value={form.technicalSheetUrl} onChange={(event) => setForm({ ...form, technicalSheetUrl: event.target.value })} /></Field>
          <Field label="תמונה"><Input value={form.productImageUrl} onChange={(event) => setForm({ ...form, productImageUrl: event.target.value })} /></Field>
          <div className="md:col-span-2">
            <Field label="תיאור"><TextArea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} /></Field>
          </div>
          <div className="md:col-span-2">
            <Field label="יתרונות שיווקיים, שורה לכל יתרון"><TextArea value={form.marketingBenefits} onChange={(event) => setForm({ ...form, marketingBenefits: event.target.value })} /></Field>
          </div>
          <div className="md:col-span-2">
            <Field label="מידע טכני שהוזן בפועל"><TextArea value={form.technicalData} onChange={(event) => setForm({ ...form, technicalData: event.target.value })} /></Field>
          </div>
          <div className="md:col-span-2">
            <Field label="מוצרים משלימים">
              <Select
                multiple
                className="min-h-28"
                value={form.complementaryIds}
                onChange={(event) => setForm({ ...form, complementaryIds: [...event.target.selectedOptions].map((option) => option.value) })}
              >
                {(products.data ?? []).filter((item) => item.productId !== form.productId).map((item) => (
                  <option key={item.productId} value={item.productId}>{item.nameHe}</option>
                ))}
              </Select>
            </Field>
          </div>
          <div className="flex gap-2 md:col-span-2">
            <Button onClick={() => void save()}>שמירה</Button>
            <Button variant="ghost" onClick={() => setOpen(false)}>סגירה</Button>
          </div>
        </Card>
      ) : null}
      <div className="grid gap-3">
        {visible.length === 0 ? <Empty title="אין מוצרים להצגה" body={products.loading ? "טוען…" : "נסו חיפוש אחר או הוסיפו מוצר."} /> : null}
        {visible.map((product) => {
          const related = product.complementaryIds
            .map((id) => products.data?.find((item) => item.productId === id)?.nameHe)
            .filter(Boolean);
          return (
            <Card key={product.productId}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold">{product.nameHe}</h2>
                  <p className="text-sm text-muted">{product.manufacturer || "יצרן לא צוין"} · {product.category || "בלי קטגוריה"} · {product.sku}</p>
                </div>
                <Badge tone={product.technicalStatus === "VERIFIED" ? "ok" : "warn"}>{statusLabel(product.technicalStatus)}</Badge>
              </div>
              <p className="mt-2 text-sm leading-6">{product.description}</p>
              {product.technicalStatus !== "VERIFIED" ? <p className="mt-2 text-sm text-warn">הנתון הטכני לא אומת. אין להציג אותו כעובדת יצרן.</p> : null}
              {related.length ? <p className="mt-2 text-sm text-muted">משלימים: {related.join(", ")}</p> : null}
              <div className="mt-3 flex gap-2">
                <Button variant="ghost" onClick={() => { setForm(fromProduct(product)); setOpen(true); }}>עריכה</Button>
                <Button variant="danger" onClick={() => void deleteProductFn({ data: { id: product.productId } }).then(() => products.reload()).catch((err) => setError(messageOf(err)))}>מחיקה</Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

const HEADER_MAP: Record<string, keyof ProductInput> = {
  sku: "sku",
  nameHe: "nameHe",
  namehe: "nameHe",
  "שם": "nameHe",
  nameEn: "nameEn",
  manufacturer: "manufacturer",
  "יצרן": "manufacturer",
  category: "category",
  "קטגוריה": "category",
  packageSize: "packageSize",
  description: "description",
  "תיאור": "description",
  marketingBenefits: "marketingBenefits",
  technicalData: "technicalData",
  technicalStatus: "technicalStatus",
  manufacturerUrl: "manufacturerUrl",
  technicalSheetUrl: "technicalSheetUrl",
  productImageUrl: "productImageUrl",
};

function mapRow(raw: Record<string, string>): ProductInput {
  const next: ProductInput = { ...EMPTY };
  for (const [key, value] of Object.entries(raw)) {
    const mapped = HEADER_MAP[key.trim()];
    if (!mapped || mapped === "priceApproved" || mapped === "complementaryIds") continue;
    if (mapped === "technicalStatus") {
      if (value === "VERIFIED" || value === "USER_PROVIDED" || value === "OUTDATED" || value === "NEEDS_VERIFICATION") {
        next.technicalStatus = value;
      }
      continue;
    }
    next[mapped] = value.trim();
  }
  return next;
}

async function rowsFromCsv(text: string): Promise<ProductInput[]> {
  const matrix: string[][] = [];
  let cell = "";
  let row: string[] = [];
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    if (quoted) {
      if (char === '"') {
        if (text[index + 1] === '"') {
          cell += '"';
          index += 1;
        } else quoted = false;
      } else cell += char;
    } else if (char === '"') quoted = true;
    else if (char === ",") {
      row.push(cell);
      cell = "";
    } else if (char === "\n") {
      row.push(cell);
      matrix.push(row);
      row = [];
      cell = "";
    } else if (char !== "\r") cell += char;
  }
  row.push(cell);
  if (row.some((item) => item.trim())) matrix.push(row);
  const headers = matrix[0] ?? [];
  return matrix.slice(1).filter((line) => line.some((item) => item.trim())).map((line) => mapRow(Object.fromEntries(headers.map((header, index) => [header, line[index] ?? ""]))));
}

async function rowsFromExcel(buffer: ArrayBuffer): Promise<ProductInput[]> {
  const XLSX = await import("xlsx");
  const book = XLSX.read(buffer, { type: "array" });
  const sheet = book.Sheets[book.SheetNames[0] ?? ""];
  if (!sheet) return [];
  const json = XLSX.utils.sheet_to_json<Record<string, string>>(sheet, { defval: "" });
  return json.map((row) => mapRow(Object.fromEntries(Object.entries(row).map(([key, value]) => [key, String(value)]))));
}
