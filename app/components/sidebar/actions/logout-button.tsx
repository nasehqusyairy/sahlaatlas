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
            className="flex items-center justify-between"
        >
            <div className="flex items-center gap-2">
                <LogOut />
                <span>Log Out</span>
            </div>

            {isLoggingOut && (
                <Loader2 className="animate-spin" />
            )}
        </SidebarMenuButton>
    )
}