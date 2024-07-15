import { createClient } from "@/utils/supabase/server";

export default async function Page() {
  const supabase = createClient();
  const { data: teams } = await supabase.from("teams").select("id,name");
  return <pre>{JSON.stringify(teams)}</pre>;
}
