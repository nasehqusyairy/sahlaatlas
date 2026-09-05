import { createContext } from "react-router";
import type { User } from "@supabase/supabase-js";

// Create a type-safe context for storing user data.
export const userContext = createContext<User | null>(null);