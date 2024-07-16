"use server";

import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { randomCode } from "@/lib/randomCode";
import { revalidateTag } from "next/cache";

export const createPlayer = async (formData: FormData) => {
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

export const addScore = async (formData: FormData) => {
  await prisma.codes.create({
    data: {
      code: randomCode(),
      score: parseInt(formData.get("score") as string),
    },
  });
  revalidateTag("code");
  redirect("/code");
};
