import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Badge, Button, Card, Notice, messageOf } from "@/components/kit";
import { PageTitle } from "@/components/shell";
import { checkSheetsFn, getStatus, syncSheetsFn } from "@/lib/saban/api";
import { useLoad } from "@/lib/saban/load";

export const Route = createFileRoute("/_app/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const status = useLoad(() => getStatus(), []);
  const [message, setMessage] = useState("");
  const [tone, setTone] = useState<"ok" | "warn" | "danger">("warn");
  const data = status.data;

  async function run(action: "check" | "sync") {
    try {
      if (action === "check") {
        const result = await checkSheetsFn();
        setTone(result.ok ? "ok" : "warn");
        setMessage(result.message);
      } else {
        const result = await syncSheetsFn();
        setTone(result.ok ? "ok" : "danger");
        setMessage(result.message);
      }
    } catch (error) {
      setTone("danger");
      setMessage(messageOf(error));
    }
  }

  return (
    <div>
      <PageTitle
        eyebrow="הגדרות"
        title="מה מחובר באמת"
        lede="המפתחות נשארים בשרת. כאן רואים רק אם הם קיימים. אין קובץ סודות במאגר."
      />
      {message ? <Notice tone={tone}>{message}</Notice> : null}
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <Card>
          <h2 className="font-medium">Google Sheets</h2>
          <p className="mt-2 text-sm leading-6 text-muted">{data?.sheets.message ?? "בודק…"}</p>
          <div className="mt-3 flex gap-2">
            <Badge tone={data?.sheets.configured ? "warn" : "neutral"}>{data?.sheets.configured ? "משתנים הוגדרו" : "לא הוגדר"}</Badge>
            <Badge>{data?.sheets.spreadsheetIdSet ? "יש מזהה גיליון" : "אין מזהה גיליון"}</Badge>
          </div>
          <div className="mt-3 flex gap-2">
            <Button variant="ghost" onClick={() => void run("check")}>בדיקת חיבור</Button>
            <Button onClick={() => void run("sync")}>סנכרון למנהל</Button>
          </div>
        </Card>
        <Card>
          <h2 className="font-medium">Google Drive</h2>
          <p className="mt-2 text-sm leading-6 text-muted">{data?.integrations.driveMessage}</p>
        </Card>
        <Card>
          <h2 className="font-medium">ספקי AI</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="flex justify-between"><span>Grok · טקסט</span><Badge tone={data?.integrations.grok ? "ok" : "neutral"}>{data?.integrations.grok ? "מחובר" : "לא מחובר"}</Badge></li>
            <li className="flex justify-between"><span>Gemini</span><Badge>{data?.integrations.gemini ? "מפתח קיים" : "אין מפתח"}</Badge></li>
            <li className="flex justify-between"><span>תמונה</span><Badge tone="warn">לא הופעל בממשק</Badge></li>
            <li className="flex justify-between"><span>וידאו</span><Badge>כבוי</Badge></li>
            <li className="flex justify-between"><span>קריינות קולית</span><Badge>טקסט בלבד</Badge></li>
          </ul>
        </Card>
        <Card>
          <h2 className="font-medium">NotebookLM</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            אין אינטגרציה ישירה. שומרים קישור למחברת ומסמך שיוצא ממנה במסך הידע, ומשייכים אותם למוצר. חיפוש רץ על מה שנשמר אצלנו.
          </p>
        </Card>
      </div>
      <Card className="mt-3">
        <h2 className="font-medium">משתני סביבה נדרשים</h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          GOOGLE_APPS_SCRIPT_URL, GOOGLE_SHEETS_API_KEY, GOOGLE_SPREADSHEET_ID, GOOGLE_DRIVE_FOLDER_ID, AI_PROVIDER, GROK_API_KEY, GEMINI_API_KEY, AUTH_SECRET, APP_BASE_URL.
          המפתח הפעיל לטקסט בסביבה הזו הוא מפתח השרת של Grok, לא ערך שמוזן במסך.
        </p>
      </Card>
    </div>
  );
}
