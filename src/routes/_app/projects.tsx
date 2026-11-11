import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Badge, Button, Card, Notice, messageOf } from "@/components/kit";
import { PageTitle } from "@/components/shell";
import { deleteProjectFn, getProjects, setProjectStatusFn } from "@/lib/saban/api";
import { useLoad } from "@/lib/saban/load";

export const Route = createFileRoute("/_app/projects")({
  component: ProjectsPage,
});

function ProjectsPage() {
  const projects = useLoad(() => getProjects(), []);
  const [error, setError] = useState("");
  return (
    <div>
      <PageTitle eyebrow="פרויקטים" title="כל העבודות השמורות" lede="מצגות ותסריטי וידאו נשמרים כאן. מחיקה דורשת הרשאת עורך." />
      {error ? <Notice tone="danger">{error}</Notice> : null}
      <div className="grid gap-3">
        {(projects.data ?? []).map((project) => (
          <Card key={project.projectId} className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-medium">{project.projectName}</p>
              <p className="text-xs text-muted">{project.projectType} · {project.targetAudience} · {project.format}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge>{project.status}</Badge>
              {project.projectType === "presentation" ? (
                <Link to="/presentations/$projectId" params={{ projectId: project.projectId }} className="inline-flex min-h-11 items-center rounded-lg border border-line px-3 text-sm">
                  פתיחה
                </Link>
              ) : (
                <Link to="/video" className="inline-flex min-h-11 items-center rounded-lg border border-line px-3 text-sm">וידאו</Link>
              )}
              <Button variant="ghost" onClick={() => void setProjectStatusFn({ data: { id: project.projectId, status: "APPROVED" } }).then(() => projects.reload()).catch((err) => setError(messageOf(err)))}>
                אישור
              </Button>
              <Button variant="danger" onClick={() => void deleteProjectFn({ data: { id: project.projectId } }).then(() => projects.reload()).catch((err) => setError(messageOf(err)))}>
                מחיקה
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
