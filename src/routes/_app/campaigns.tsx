import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Badge, Button, Card, Field, Input, Select, TextArea, messageOf, Notice } from "@/components/kit";
import { PageTitle } from "@/components/shell";
import { getCampaigns, getProducts, saveCampaignFn, setCampaignStatusFn } from "@/lib/saban/api";
import { useLoad } from "@/lib/saban/load";

export const Route = createFileRoute("/_app/campaigns")({
  component: CampaignsPage,
});

function CampaignsPage() {
  const campaigns = useLoad(() => getCampaigns(), []);
  const products = useLoad(() => getProducts(), []);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    campaignName: "",
    targetAudience: "קבלנים",
    productIds: [] as string[],
    campaignGoal: "",
    contentIds: [] as string[],
    status: "DRAFT" as const,
  });

  async function save() {
    try {
      await saveCampaignFn({ data: form });
      toast.success("הקמפיין נשמר");
      campaigns.reload();
      setForm({ ...form, campaignName: "", campaignGoal: "", productIds: [] });
    } catch (err) {
      setError(messageOf(err));
    }
  }

  return (
    <div>
      <PageTitle eyebrow="קמפיינים" title="מה רץ עכשיו" lede="קמפיין קושר קהל, מוצרים ומטרה. הוא לא מפרסם לבד לרשת." />
      {error ? <Notice tone="danger">{error}</Notice> : null}
      <Card className="grid gap-3">
        <Field label="שם"><Input value={form.campaignName} onChange={(event) => setForm({ ...form, campaignName: event.target.value })} /></Field>
        <Field label="קהל"><Input value={form.targetAudience} onChange={(event) => setForm({ ...form, targetAudience: event.target.value })} /></Field>
        <Field label="מטרה"><TextArea value={form.campaignGoal} onChange={(event) => setForm({ ...form, campaignGoal: event.target.value })} /></Field>
        <Field label="מוצרים">
          <Select multiple className="min-h-28" value={form.productIds} onChange={(event) => setForm({ ...form, productIds: [...event.target.selectedOptions].map((option) => option.value) })}>
            {(products.data ?? []).map((product) => <option key={product.productId} value={product.productId}>{product.nameHe}</option>)}
          </Select>
        </Field>
        <Button disabled={form.campaignName.trim().length < 2} onClick={() => void save()}>שמירה</Button>
      </Card>
      <div className="mt-4 grid gap-3">
        {(campaigns.data ?? []).map((campaign) => (
          <Card key={campaign.campaignId} className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-medium">{campaign.campaignName}</p>
              <p className="text-sm text-muted">{campaign.targetAudience} · {campaign.campaignGoal}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge tone={campaign.status === "APPROVED" || campaign.status === "IN_PROGRESS" ? "ok" : "neutral"}>{campaign.status}</Badge>
              <Button variant="ghost" onClick={() => void setCampaignStatusFn({ data: { id: campaign.campaignId, status: "IN_PROGRESS" } }).then(() => campaigns.reload())}>הפעלה</Button>
              <Button variant="ghost" onClick={() => void setCampaignStatusFn({ data: { id: campaign.campaignId, status: "APPROVED" } }).then(() => campaigns.reload())}>אישור</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
