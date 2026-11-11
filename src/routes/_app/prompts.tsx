import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button, Card, Field, Input, Notice, Select, TextArea, messageOf } from "@/components/kit";
import { PageTitle } from "@/components/shell";
import { fillPrompt } from "@/lib/saban/compose";
import { deletePromptFn, getProducts, getPrompts, rewriteFn, savePromptFn } from "@/lib/saban/api";
import { useLoad } from "@/lib/saban/load";

export const Route = createFileRoute("/_app/prompts")({
  component: PromptsPage,
});

function PromptsPage() {
  const prompts = useLoad(() => getPrompts(), []);
  const products = useLoad(() => getProducts(), []);
  const [promptId, setPromptId] = useState("");
  const [productId, setProductId] = useState("");
  const [error, setError] = useState("");
  const [draftName, setDraftName] = useState("");
  const [draftText, setDraftText] = useState("");
  const selected = (prompts.data ?? []).find((item) => item.promptId === promptId) ?? prompts.data?.[0];
  const product = (products.data ?? []).find((item) => item.productId === productId) ?? products.data?.[0];

  const filled = useMemo(() => {
    if (!selected) return "";
    return fillPrompt(selected.promptText, {
      productName: product?.nameHe ?? "",
      category: product?.category ?? "",
      audience: "קבלנים",
      aspectRatio: "16:9",
      benefit: product?.marketingBenefits.split("\n")[0] ?? "",
      goal: "הסבר זהיר לצוות",
      technicalData: product?.technicalData ?? "",
    });
  }, [selected, product]);

  async function save() {
    try {
      await savePromptFn({
        data: {
          promptName: draftName,
          promptType: "text",
          promptText: draftText || filled,
          category: "מותאם",
          variables: [],
        },
      });
      toast.success("הפקודה נשמרה");
      prompts.reload();
    } catch (err) {
      setError(messageOf(err));
    }
  }

  async function polish() {
    const result = await rewriteFn({ data: { draft: filled, instruction: "הפכו את הפקודה לברורה יותר בלי להוסיף נתונים" } });
    if (!result.ok) setError(result.error);
    else setDraftText(result.text);
  }

  return (
    <div>
      <PageTitle eyebrow="מחולל פקודות" title="פקודות מוכנות למנועי יצירה" lede="המשתנים מתמלאים מכרטיס המוצר. Grok משפר ניסוח רק בלחיצה, ולא ממציא מפרט." />
      {error ? <Notice tone="danger">{error}</Notice> : null}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="grid gap-3">
          <Field label="פקודה">
            <Select value={selected?.promptId ?? ""} onChange={(event) => setPromptId(event.target.value)}>
              {(prompts.data ?? []).map((item) => (
                <option key={item.promptId} value={item.promptId}>{item.promptName}</option>
              ))}
            </Select>
          </Field>
          <Field label="מוצר">
            <Select value={product?.productId ?? ""} onChange={(event) => setProductId(event.target.value)}>
              {(products.data ?? []).map((item) => (
                <option key={item.productId} value={item.productId}>{item.nameHe}</option>
              ))}
            </Select>
          </Field>
          <pre className="whitespace-pre-wrap rounded-xl bg-paper p-3 text-sm leading-6">{draftText || filled || "טוען פקודות…"}</pre>
          <div className="flex flex-wrap gap-2">
            <Button variant="ghost" onClick={() => void navigator.clipboard.writeText(draftText || filled).then(() => toast.success("הועתק"))}>העתקה</Button>
            <Button variant="soft" onClick={() => void polish()}>שיפור עם Grok</Button>
            {selected && !selected.builtin ? (
              <Button variant="danger" onClick={() => void deletePromptFn({ data: { id: selected.promptId } }).then(() => prompts.reload())}>מחיקה</Button>
            ) : null}
          </div>
        </Card>
        <Card className="grid gap-3">
          <h2 className="font-medium">שמירת פקודה חדשה</h2>
          <Field label="שם"><Input value={draftName} onChange={(event) => setDraftName(event.target.value)} /></Field>
          <Field label="טקסט"><TextArea value={draftText} placeholder={filled} onChange={(event) => setDraftText(event.target.value)} /></Field>
          <Button disabled={draftName.trim().length < 2} onClick={() => void save()}>שמירה בספרייה</Button>
        </Card>
      </div>
    </div>
  );
}
