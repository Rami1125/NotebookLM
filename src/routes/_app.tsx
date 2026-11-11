import { createFileRoute, Outlet } from "@tanstack/react-router";
import { BootScreen, LoginPanel, Shell } from "@/components/shell";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  const { user, isPending } = useCurrentUserState();
  if (isPending) return <BootScreen />;
  if (!user) return <LoginPanel />;
  return (
    <Shell>
      <Outlet />
    </Shell>
  );
}
