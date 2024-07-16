"use client";
import { createClient } from "@/utils/supabase/client";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function Page() {
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);
  const [playerName, setPlayerName] = useState<string>();
  const [teamId, setTeamId] = useState<number>();
  const [teams, setTeams] = useState<{ key: number; label: string }[]>([]);
  useEffect(() => {
    const getTeams = async () => {
      const { data: teams } = await supabase.from("teams").select("id,name");
      setTeams(teams!.map((team) => ({ key: team.id, label: team.name })));
    };
    getTeams();
  }, [supabase]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    fetch("/api/players", {
      method: "POST",
      body: JSON.stringify({ name: playerName, team_id: teamId }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setPlayerName("");
        setTeamId(undefined);
      });
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="max-w-screen-md w-full">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
            <h2 className="text-2xl font-semibold mb-14">Nhập thông tin</h2>
            <Input
              fullWidth
              onChange={(e) => setPlayerName(e.target.value)}
              value={playerName}
              type="name"
              name="player-name"
              classNames={{
                label: "font-semibold text-md",
                input: "font-semibold text-md",
              }}
              label="Tên người chơi"
            />
            <Select
              items={teams}
              onChange={(e) => setTeamId(parseInt(e.target.value))}
              value={teamId}
              label="Đội"
              name="team"
              classNames={{
                label: "font-semibold text-md",
                value: "font-semibold text-md",
              }}
              fullWidth
            >
              {(teams) => (
                <SelectItem
                  classNames={{
                    title: "font-semibold text-md",
                  }}
                  key={teams.key}
                >
                  {teams.label}
                </SelectItem>
              )}
            </Select>
            <Button
              color="primary"
              className="font-semibold text-md"
              type="submit"
              isLoading={isLoading}
              isDisabled={isLoading}
            >
              Thêm
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
