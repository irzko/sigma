"use client";

import { createClient } from "@/utils/supabase/client";
import {
  getKeyValue,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Button,
} from "@nextui-org/react";

import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { addScore } from "../action";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button color="primary" type="submit" disabled={pending}>
      Thêm
    </Button>
  );
}

const AddCodeForm = () => {
  return (
    <>
      <form
        action={addScore}
        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
      >
        <Input name="score" label="Điểm" />
        <Input name="code" hidden />
        <SubmitButton />
      </form>
    </>
  );
};

export default function Page() {
  const supabase = createClient();
  const [codes, setCodes] = useState<
    {
      id: number;
      code: string;
    }[]
  >([]);
  useEffect(() => {
    const getCodes = async () => {
      const { data: codes, error } = await supabase
        .from("codes")
        .select("*")
        .order("id");
      if (codes) {
        setCodes(
          codes.map((code) => ({
            id: code.id,
            code: code.code,
          }))
        );
      }
    };
    getCodes();
  }, [supabase]);

  return (
    <main className="flex justify-center">
      <div className="max-w-screen-md w-full">
        <AddCodeForm />
        <Table aria-label="Example table with dynamic content">
          <TableHeader>
            <TableColumn key="id">ID</TableColumn>
            <TableColumn key="name">Mã</TableColumn>
            {/* <TableColumn key="score">Trạng thái</TableColumn> */}
          </TableHeader>
          <TableBody items={codes}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
