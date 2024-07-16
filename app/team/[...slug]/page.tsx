import { createClient } from "@/utils/supabase/server";
import Dashboard from "./components/dashboard";

export default async function Page({ params }: { params: { slug: string } }) {
  const supabase = createClient();

  const { data: team } = await supabase
    .from("teams")
    .select("*")
    .eq("id", params.slug)
    .single();

  return (
    <main className="flex justify-center">
      <div className="max-w-screen-md w-full p-4">
        <h1 className="text-3xl font-bold mb-8">{team?.name}</h1>
        <Dashboard teamId={team.id} />
      </div>
    </main>
  );
}
