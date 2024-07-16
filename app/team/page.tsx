import { createClient } from "@/utils/supabase/server";

export default async function Page() {
  const supabase = createClient();
  const { data: teams, error } = await supabase.from("teams").select("*");
  return (
    <main>
      <ul>
        {teams?.map((team) => (
          <li key={team.id}>{team.name}</li>
        ))}
      </ul>
    </main>
  );
}
