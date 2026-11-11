import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Badge, Button, Card, Notice, messageOf } from "@/components/kit";
import { PageTitle } from "@/components/shell";
import { checkSheetsFn, getStatus, pullSheetsFn, syncSheetsFn } from "@/lib/saban/api";
import { useLoad } from "@/lib/saban/load";

export const Route = createFileRoute("/_app/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const status = useLoad(() => getStatus(), []);
  const [message, setMessage] = useState("");
  const [tone, setTone] = useState<"ok" | "warn" | "danger">("warn");
  const [tabs, setTabs] = useState<string[] | undefined>();
  const data = status.data;

  async function run(action: "check" | "sync" | "pull") {
    try {
      if (action === "check") {
        const result = await checkSheetsFn();
        setTone(result.ok ? "ok" : "warn");
        setMessage(result.message);
        setTabs(result.tabs);
      } else if (action === "sync") {
        const result = await syncSheetsFn();
        setTone(result.ok ? "ok" : "danger");
        setMessage(result.message);
      } else {
        const result = await pullSheetsFn();
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
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge tone={data?.sheets.configured ? "warn" : "neutral"}>
              {data?.sheets.configured ? "משתנים הוגדרו" : "לא הוגדר"}
            </Badge>
            <Badge>{data?.sheets.spreadsheetIdSet ? "יש מזהה גיליון" : "אין מזהה גיליון"}</Badge>
          </div>
          {tabs && tabs.length > 0 ? (
            <div className="mt-3">
              <p className="text-xs font-medium text-muted">טאבים פעילים ({tabs.length})</p>
              <ul className="mt-1 flex flex-wrap gap-1.5">
                {tabs.map((tab) => (
                  <li key={tab}>
                    <Badge tone="ok">{tab}</Badge>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <div className="mt-3 flex flex-wrap gap-2">
            <Button variant="ghost" onClick={() => void run("check")}>
              בדיקת חיבור
            </Button>
            <Button onClick={() => void run("sync")}>סנכרון ← גיליון</Button>
            <Button variant="ghost" onClick={() => void run("pull")}>
              ייבוא ← אפליקציה
            </Button>
          </div>
        </Card>
        <Card>
          <h2 className="font-medium">Google Drive</h2>
          <p className="mt-2 text-sm leading-6 text-muted">{data?.integrations.driveMessage}</p>
        </Card>
        <Card>
          <h2 className="font-medium">ספקי AI</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="flex justify-between">
              <span>Grok · טקסט</span>
              <Badge tone={data?.engines?.grok || data?.integrations.grok ? "ok" : "neutral"}>
                {data?.engines?.grok || data?.integrations.grok ? "מחובר" : "לא מחובר"}
              </Badge>
            </li>
            <li className="flex justify-between">
              <span>Gemini 2.x</span>
              <Badge tone={data?.engines?.gemini || data?.integrations.gemini ? "ok" : "neutral"}>
                {data?.engines?.gemini || data?.integrations.gemini ? "מחובר" : "אין מפתח"}
              </Badge>
            </li>
            <li className="flex justify-between">
              <span>תמונה</span>
              <Badge tone="warn">לא הופעל בממשק</Badge>
            </li>
            <li className="flex justify-between">
              <span>וידאו</span>
              <Badge>כבוי</Badge>
            </li>
            <li className="flex justify-between">
              <span>קריינות קולית</span>
              <Badge>טקסט בלבד</Badge>
            </li>
          </ul>
          <p className="mt-3 text-xs leading-5 text-muted">
            במסכי המצגות והתסריטים ניתן לבחור בין Grok ל-Gemini לשיפור ניסוח. חילוץ מפרטי TDS רץ על Gemini בלבד.
          </p>
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
          GOOGLE_APPS_SCRIPT_URL, GOOGLE_SHEETS_API_KEY, GOOGLE_SPREADSHEET_ID, GOOGLE_DRIVE_FOLDER_ID,
          XAI_API_KEY (Grok), GEMINI_API_KEY, BETTER_AUTH_SECRET, BETTER_AUTH_URL / DATABASE_URL.
          המפתחות נשארים בשרת בלבד.
        </p>
      </Card>
    </div>
  );
}
