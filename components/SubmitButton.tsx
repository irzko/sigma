"use client";
import { Button } from "@nextui-org/react";
import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      color="primary"
      type="submit"
      disabled={pending}
      isLoading={pending}
    >
      Thêm
    </Button>
  );
}
