import { createClient } from "@/utils/supabase/server";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default async function Page() {
  const supabase = createClient();
  const { data: teams, error } = await supabase
    .from("teams")
    .select("*")
    .order("id");
  return (
    <main className="flex justify-center">
      <div className="max-w-screen-md w-full flex flex-col gap-2">
        {teams?.map((team) => (
          <Button as={Link} href={`team/${team.id}`} key={team.id}>
            {team.name}
          </Button>
        ))}
      </div>
    </main>
  );
}
