import { createRootRoute, Outlet } from "@tanstack/react-router";

// Stub root route — required by the TanStack Router generator running in the
// Lovable preview sandbox. The actual app boots from src/main.tsx via
// react-router-dom's BrowserRouter, so this file is intentionally minimal.
export const Route = createRootRoute({
  component: () => <Outlet />,
  notFoundComponent: () => <div>Not Found</div>,
});