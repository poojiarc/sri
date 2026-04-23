import { createFileRoute } from "@tanstack/react-router";

// Stub index route — required by the TanStack Router generator. The real
// home page is rendered via react-router-dom in src/App.tsx.
export const Route = createFileRoute("/")({
  component: () => null,
});