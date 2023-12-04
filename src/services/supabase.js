import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://ptmddsrbdrmwpggewlor.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0bWRkc3JiZHJtd3BnZ2V3bG9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE1MzU5OTEsImV4cCI6MjAxNzExMTk5MX0.M7noyyDlm1relAZ0qd3ygXE5J9FFL2GLKJDPhGCq7d0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
