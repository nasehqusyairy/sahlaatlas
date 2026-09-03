import { Outlet, useMatches, type LoaderFunctionArgs, type MiddlewareFunction, type UIMatch } from "react-router";
import { requireAuthMiddleware } from "~/.server/middlewares/auth";
import { AppSidebar } from "~/components/sidebar/app-sidebar"
import { Separator } from "~/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar"
import { redirect, type ActionFunctionArgs } from "react-router";
import { createClient } from "~/.server/supabase";
import { userContext } from "~/context";

export const middleware: MiddlewareFunction[] = [
  requireAuthMiddleware
]

// Asumsikan middleware proteksi sudah dipasang
export async function loader({ context }: LoaderFunctionArgs) {
  // Mengambil user dari context yang sudah diisi oleh middleware
  const user = context.get(userContext);

  return { user };
}

export type LoaderData = Awaited<ReturnType<typeof loader>>

export async function action({ request }: ActionFunctionArgs) {
  const { supabase, headers } = createClient(request);
  const formData = await request.formData();

  if (formData.get("intent") === "logout") {
    await supabase.auth.signOut();
    // Redirect ini akan langsung dipatuhi oleh fetcher dan membawa user ke halaman login
    return redirect("/login", { headers });
  }

  return null;
}

export default function AdminLayout() {

  const matches = useMatches() as UIMatch<unknown, { title: string }>[]

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-muted dark:bg-background">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-16 border-b">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ms-1" />
            <Separator
              orientation="vertical"
              className="me-2 data-vertical:h-4 data-vertical:self-auto"
            />
            <div className="text-xs tracking-wide uppercase">{matches[2].handle.title}</div>
          </div>
        </header>
        <main className="p-4">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
