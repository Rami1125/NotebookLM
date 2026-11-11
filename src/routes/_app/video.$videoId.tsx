import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button, Card, Field, Input, Notice, TextArea, messageOf } from "@/components/kit";
import { PageTitle } from "@/components/shell";
import { getVideoFn, saveVideoFn } from "@/lib/saban/api";
import type { VideoProject, VideoScene } from "@/lib/saban/types";

export const Route = createFileRoute("/_app/video/$videoId")({
  component: VideoEditor,
});

function VideoEditor() {
  const { videoId } = Route.useParams();
  const [video, setVideo] = useState<VideoProject | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let live = true;
    getVideoFn({ data: { id: videoId } })
      .then((value) => {
        if (live) setVideo(value);
      })
      .catch((err: unknown) => {
        if (live) setError(messageOf(err));
      });
    return () => {
      live = false;
    };
  }, [videoId]);

  function patchScene(index: number, partial: Partial<VideoScene>) {
    setVideo((current) => {
      if (!current) return current;
      const storyboard = current.storyboard.map((scene, sceneIndex) => (sceneIndex === index ? { ...scene, ...partial } : scene));
      return { ...current, storyboard };
    });
  }

  async function save() {
    if (!video) return;
    try {
      const next = await saveVideoFn({
        data: {
          videoId: video.videoId,
          title: video.title,
          script: video.script,
          videoPrompt: video.videoPrompt,
          storyboard: video.storyboard,
        },
      });
      setVideo(next);
      toast.success("נשמרה גרסה. הקובץ לא נוצר.");
    } catch (err) {
      setError(messageOf(err));
    }
  }

  async function copyPrompt() {
    if (!video) return;
    await navigator.clipboard.writeText(video.videoPrompt);
    toast.success("הפקודה הועתקה");
  }

  if (!video) return <p className="text-sm text-muted">{error || "טוען תסריט…"}</p>;

  return (
    <div>
      <PageTitle eyebrow="עורך וידאו" title={video.title} lede={`${video.versions.length} גרסאות שמורות. סטטוס: ${video.status}. אין כתובת קובץ כי ספק הווידאו כבוי.`} />
      {error ? <Notice tone="danger">{error}</Notice> : null}
      <div className="mb-3 flex flex-wrap gap-2">
        <Button onClick={() => void save()}>שמירת גרסה</Button>
        <Button variant="ghost" onClick={() => void copyPrompt()}>העתקת פקודת וידאו</Button>
        <Button variant="soft" disabled title="יצירת קובץ וידאו כבויה כדי לא להפעיל ספק בלי אישור">
          יצירת קובץ וידאו כבויה
        </Button>
      </div>
      <Card className="mb-4">
        <Field label="שם"><Input value={video.title} onChange={(event) => setVideo({ ...video, title: event.target.value })} /></Field>
        <div className="mt-3">
          <Field label="תסריט"><TextArea className="min-h-40" value={video.script} onChange={(event) => setVideo({ ...video, script: event.target.value })} /></Field>
        </div>
      </Card>
      <div className="grid gap-3">
        {video.storyboard.map((scene, index) => (
          <Card key={scene.sceneNumber}>
            <p className="text-sm font-medium">סצנה {scene.sceneNumber} · {scene.duration} שניות</p>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <Field label="תיאור חזותי"><TextArea value={scene.visualDescription} onChange={(event) => patchScene(index, { visualDescription: event.target.value })} /></Field>
              <Field label="תנועת מצלמה"><Input value={scene.cameraMovement} onChange={(event) => patchScene(index, { cameraMovement: event.target.value })} /></Field>
              <Field label="תאורה"><Input value={scene.lighting} onChange={(event) => patchScene(index, { lighting: event.target.value })} /></Field>
              <Field label="קריינות"><TextArea value={scene.voiceover} onChange={(event) => patchScene(index, { voiceover: event.target.value })} /></Field>
              <Field label="טקסט על המסך"><Input value={scene.onScreenText} onChange={(event) => patchScene(index, { onScreenText: event.target.value })} /></Field>
              <Field label="פקודת AI"><TextArea value={scene.aiVideoPrompt} onChange={(event) => patchScene(index, { aiVideoPrompt: event.target.value })} /></Field>
            </div>
          </Card>
        ))}
      </div>
      <Card className="mt-4">
        <h2 className="font-medium">תצוגת פקודה מלאה</h2>
        <pre className="mt-2 overflow-auto whitespace-pre-wrap rounded-xl bg-paper p-3 text-xs leading-5">{video.videoPrompt}</pre>
        <p className="mt-2 text-xs text-muted">מוזיקה: אין קובץ שמע במערכת. השתמשו רק ביצירה ברישיון שאושר מחוץ לסטודיו.</p>
      </Card>
    </div>
  );
}
