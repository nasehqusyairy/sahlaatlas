import { createContext } from "react-router";
import type { User } from "@supabase/supabase-js";

// Buat context type-safe untuk menyimpan data user
export const userContext = createContext<User | null>(null);