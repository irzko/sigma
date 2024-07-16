"use server";

import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export const createPlayer = async (prevState: any, formData: FormData) => {
  const player = await prisma.players.create({
    data: {
      name: formData.get("player-name") as string,
      team_id: parseInt(formData.get("team") as string),
    },
  });
  if (!player) {
    return {
      message: "Failed to create user",
    };
  }
  return {
    message: "User created successfully",
  };
};
