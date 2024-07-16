import { Input } from "@nextui-org/react";

import { addScore } from "../action";
import { codes } from "@prisma/client";
import TableCode from "./components/TableCode";
import SubmitButton from "@/components/SubmitButton";

const AddCodeForm = () => {
  return (
    <>
      <form
        action={addScore}
        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
      >
        <Input size="sm" name="score" label="Điểm" />
        <SubmitButton />
      </form>
    </>
  );
};

const getCodes = async (): Promise<codes[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/codes`, {
    next: { tags: ["code"] },
  });
  const data = await res.json();
  return data;
};

export default async function Page() {
  const codes = await getCodes();

  return (
    <main className="flex justify-center">
      <div className="max-w-screen-md w-full">
        <AddCodeForm />
        <TableCode codes={codes} />
      </div>
    </main>
  );
}
