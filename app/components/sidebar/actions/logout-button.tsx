import { useFetcher } from "react-router";
import { LogOut, Loader2 } from "lucide-react";
import {
    SidebarMenuButton,
} from "~/components/ui/sidebar";

export function LogoutButton() {
    const fetcher = useFetcher();
    const isLoggingOut = fetcher.state !== 'idle'
    const logout = () => fetcher.submit(
        { intent: "logout" },
        { method: "post", action: "/admin" }
    )

    return (
        <SidebarMenuButton
            onClick={logout}
            disabled={isLoggingOut}
            className="w-full flex items-center justify-between"
        >
            <div className="flex items-center gap-2">
                <LogOut className="size-4" />
                <span>Log Out</span>
            </div>

            {/* Spinner indikator loading ditaruh di sebelah kanan */}
            {isLoggingOut && (
                <Loader2 className="size-4 animate-spin text-muted-foreground ml-auto" />
            )}
        </SidebarMenuButton>
    )
}