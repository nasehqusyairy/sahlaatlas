import { redirect } from "react-router";
import { createClient } from "~/.server/supabase";
import { userContext } from "~/context";

// Middleware untuk route yang WAJIB LOGIN (misal: /admin)
export async function requireAuthMiddleware({ request, context }: any, next: any) {
  const { supabase } = createClient(request);
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw redirect("/login");
  }

  // Simpan data user ke context agar bisa dibaca loader/action
  context.set(userContext, user);

  // Lanjutkan eksekusi ke loader/action
  return await next();
}

// Middleware untuk route GUEST ONLY (misal: /login)
export async function redirectIfLoggedInMiddleware({ request }: any, next: any) {
  const { supabase } = createClient(request);
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    throw redirect("/admin");
  }

  return await next();
}