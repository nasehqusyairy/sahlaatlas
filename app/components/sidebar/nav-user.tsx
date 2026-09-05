import { useRouteLoaderData } from "react-router";
import { User } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/components/ui/avatar";
import {
  SidebarMenu,
  SidebarMenuItem,
} from "~/components/ui/sidebar";
import type { LoaderData } from "~/routes/layouts/admin";

export function NavUser() {
  // Ambil data loader dari route layout utama (misal ID: 'routes/admin' atau 'routes/layout')
  const loaderData = useRouteLoaderData<LoaderData>("routes/layouts/admin");
  const user = loaderData?.user;

  // Nilai fallback jika data user belum dimuat
  const email = user?.email ?? "Guest";
  const name = user?.user_metadata?.full_name || email.split("@")[0];
  const avatar = user?.user_metadata?.avatar_url;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex items-center gap-2 p-2">
          <Avatar className="h-8 w-8">
            {avatar && <AvatarImage src={avatar} alt={name} />}
            <AvatarFallback className="text-xs">
              <User className="size-4" />
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-start text-sm leading-tight">
            <span className="truncate font-semibold">{name}</span>
            <span className="truncate text-xs text-muted-foreground">{email}</span>
          </div>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}