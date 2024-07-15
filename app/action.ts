"use server";

import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export const createUser = async (prevState: any, formData: FormData) => {
  const user = await prisma.user.create({
    data: {
      name: formData.get("player-name") as string,
      team_id: parseInt(formData.get("team") as string),
    },
  });
  if (!user) {
    return {
      message: "Failed to create user",
    };
  }
  return {
    message: "User created successfully",
  };
};
