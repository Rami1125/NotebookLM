import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button, Card, Field, Input, Notice, Select, messageOf } from "@/components/kit";
import { PageTitle } from "@/components/shell";
import { deleteScreenFn, getProducts, getScreens, saveScreenFn } from "@/lib/saban/api";
import { useLoad } from "@/lib/saban/load";

export const Route = createFileRoute("/_app/signage")({
  component: SignagePage,
});

function SignagePage() {
  const products = useLoad(() => getProducts(), []);
  const screens = useLoad(() => getScreens(), []);
  const [error, setError] = useState("");
  const [name, setName] = useState("דלפק ראשי");
  const [screenType, setScreenType] = useState<"counter" | "lobby" | "parking">("counter");
  const [intervalSec, setIntervalSec] = useState(8);
  const [transition, setTransition] = useState<"fade" | "slide">("fade");
  const [picked, setPicked] = useState<string[]>([]);

  function toggle(id: string) {
    setPicked((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }

  async function save() {
    try {
      const screen = await saveScreenFn({ data: { name, screenType, productIds: picked, intervalSec: Number(intervalSec), transition } });
      toast.success("הפלייליסט נשמר. כתובת ההקרנה זמינה עכשיו.");
      screens.reload();
      setPicked([]);
      return screen;
    } catch (err) {
      setError(messageOf(err));
    }
  }

  return (
    <div>
      <PageTitle
        eyebrow="מסכי דלפק"
        title="הקרנה 1920×1080"
        lede="דלפק, לובי וחניון. המחיר מופיע רק אם הוזן ואושר בכרטיס המוצר. כתובת ההקרנה נוצרת אחרי שמירה."
      />
      {error ? <Notice tone="danger">{error}</Notice> : null}
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <Card>
          <div className="grid gap-3">
            <Field label="שם המסך"><Input value={name} onChange={(event) => setName(event.target.value)} /></Field>
            <div className="grid grid-cols-3 gap-3">
              <Field label="סוג">
                <Select value={screenType} onChange={(event) => setScreenType(event.target.value as typeof screenType)}>
                  <option value="counter">דלפק</option>
                  <option value="lobby">לובי</option>
                  <option value="parking">חניון</option>
                </Select>
              </Field>
              <Field label="שניות">
                <Input type="number" min={4} max={60} value={intervalSec} onChange={(event) => setIntervalSec(Number(event.target.value))} />
              </Field>
              <Field label="מעבר">
                <Select value={transition} onChange={(event) => setTransition(event.target.value as typeof transition)}>
                  <option value="fade">עמעום</option>
                  <option value="slide">החלקה</option>
                </Select>
              </Field>
            </div>
            <div className="grid max-h-72 gap-1 overflow-auto">
              {(products.data ?? []).map((product) => (
                <label key={product.productId} className="flex min-h-11 items-center gap-2 rounded-lg px-2 text-sm hover:bg-paper">
                  <input type="checkbox" checked={picked.includes(product.productId)} onChange={() => toggle(product.productId)} />
                  {product.nameHe}
                </label>
              ))}
            </div>
            <Button disabled={picked.length === 0 || name.trim().length < 2} onClick={() => void save()}>שמירת פלייליסט</Button>
          </div>
        </Card>
        <Card>
          <h2 className="font-medium">מסכים שמורים</h2>
          <div className="mt-3 grid gap-2">
            {(screens.data ?? []).map((screen) => (
              <div key={screen.screenId} className="rounded-xl border border-line p-3">
                <p className="font-medium">{screen.name}</p>
                <p className="text-xs text-muted">{screen.screenType} · {screen.intervalSec}ש · {screen.productIds.length} מוצרים</p>
                <div className="mt-2 flex gap-2">
                  <Link to="/play/$playlistId" params={{ playlistId: screen.screenId }} className="inline-flex min-h-11 items-center rounded-lg bg-primary px-4 text-sm text-primary-fg">
                    הקרנה
                  </Link>
                  <Button variant="danger" onClick={() => void deleteScreenFn({ data: { id: screen.screenId } }).then(() => screens.reload())}>מחיקה</Button>
                </div>
              </div>
            ))}
            {(screens.data ?? []).length === 0 ? <p className="text-sm text-muted">עדיין אין מסך שמור, ולכן אין כתובת הקרנה.</p> : null}
          </div>
        </Card>
      </div>
    </div>
  );
}
