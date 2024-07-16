"use client";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Card, CardBody } from "@nextui-org/react";
import { createClient } from "@/utils/supabase/client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

const MemberTab = ({
  teamId,
  supabase,
}: {
  teamId: number;
  supabase: ReturnType<typeof createClient>;
}) => {
  const [members, setMembers] = useState<
    {
      id: number;
      name: string;
      score: number;
    }[]
  >([]);
  useEffect(() => {
    const fetchMembers = async () => {
      const { data: players } = await supabase
        .from("players")
        .select("*")
        .eq("team_id", teamId);
      if (players) {
        setMembers(
          players.map((player) => ({
            id: player.id,
            name: player.name,
            score: player.score,
          }))
        );
      }
    };
    fetchMembers();
  }, [teamId, supabase]);
  return (
    <Table aria-label="Example table with dynamic content">
      <TableHeader>
        <TableColumn key="id">ID</TableColumn>
        <TableColumn key="name">Tên</TableColumn>
        <TableColumn key="score">Điểm</TableColumn>
      </TableHeader>
      <TableBody items={members}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default function Dashboard({ teamId }: { teamId: number }) {
  const supabase = createClient();
  return (
    <Tabs fullWidth aria-label="Options">
      <Tab key="info" title="Thông tin">
        <Card>
          <CardBody>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </CardBody>
        </Card>
      </Tab>
      <Tab key="member" title="Thành viên">
        <MemberTab teamId={teamId} supabase={supabase} />
      </Tab>
      <Tab key="videos" title="Videos">
        <Card>
          <CardBody>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </CardBody>
        </Card>
      </Tab>
    </Tabs>
  );
}
