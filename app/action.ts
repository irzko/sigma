"use server";

import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";

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
  const supabase = createClient();
  function taoChuoiNgauNhien() {
    const chuoiKiTu = "0123456789";
    let chuoi = "";
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * chuoiKiTu.length);
      chuoi += chuoiKiTu[randomIndex];
    }
    return chuoi;
  }
  const { data, error } = await supabase.from("scores").insert([
    {
      code: taoChuoiNgauNhien(),
      score: parseInt(formData.get("score") as string),
    },
  ]);
  redirect("/code");
};
