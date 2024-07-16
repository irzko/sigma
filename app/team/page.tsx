import { teams } from "@prisma/client";

const getTeams = async () => {
  const res = await fetch("/api/teams", {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
};

export default async function Page() {
  const teams: teams[] = await getTeams();
  return (
    <main>
      <ul>
        {teams.map((team) => (
          <li key={team.id}>{team.name}</li>
        ))}
      </ul>
    </main>
  );
}
