import { createFileRoute } from "@tanstack/react-router";
import { LoginPanel } from "@/components/shell";

export const Route = createFileRoute("/login")({
  component: LoginPanel,
});
