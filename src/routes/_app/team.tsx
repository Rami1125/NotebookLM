import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Badge, Button, Card, Notice, Select, messageOf } from "@/components/kit";
import { PageTitle } from "@/components/shell";
import { getLogs, getTeam, setRoleFn } from "@/lib/saban/api";
import { useLoad } from "@/lib/saban/load";
import type { Role } from "@/lib/saban/types";

export const Route = createFileRoute("/_app/team")({
  component: TeamPage,
});

function TeamPage() {
  const team = useLoad(() => getTeam(), []);
  const logs = useLoad(() => getLogs(), []);
  const [error, setError] = useState("");

  return (
    <div>
      <PageTitle eyebrow="הרשאות" title="מי יכול לערוך" lede="מנהל, עורך וצופה. המשתמש הראשון שנכנס הופך למנהל. צופה יכול לקרוא ולא לשמור." />
      {error ? <Notice tone="danger">{error}</Notice> : null}
      <div className="grid gap-3">
        {(team.data ?? []).map((member) => (
          <Card key={member.userId} className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-medium">{member.name || "בלי שם"}</p>
              <p className="text-sm text-muted">{member.email || member.userId}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge tone={member.role === "ADMIN" ? "accent" : "neutral"}>{member.role}</Badge>
              <Select
                className="max-w-36"
                value={member.role}
                onChange={(event) => {
                  const role = event.target.value as Role;
                  void setRoleFn({ data: { userId: member.userId, role } })
                    .then(() => team.reload())
                    .catch((err) => setError(messageOf(err)));
                }}
              >
                <option value="ADMIN">ADMIN</option>
                <option value="EDITOR">EDITOR</option>
                <option value="VIEWER">VIEWER</option>
              </Select>
            </div>
          </Card>
        ))}
      </div>
      <h2 className="mt-6 mb-2 font-medium">יומן פעולות</h2>
      <div className="grid gap-2">
        {(logs.data ?? []).length === 0 ? <p className="text-sm text-muted">אין רשומות, או שאין הרשאה לצפות ביומן.</p> : null}
        {(logs.data ?? []).map((log) => (
          <div key={log.logId} className="rounded-xl border border-line bg-surface px-3 py-2 text-sm">
            <span className="font-medium">{log.action}</span>
            <span className="text-muted"> · {log.entityType} {log.entityId} · {log.result}</span>
            {log.errorMessage ? <span className="text-warn"> · {log.errorMessage}</span> : null}
          </div>
        ))}
      </div>
      <Button className="mt-3" variant="ghost" onClick={() => logs.reload()}>רענון יומן</Button>
    </div>
  );
}
