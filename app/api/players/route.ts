import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const user = await prisma.players.create({
    data,
  });
  return Response.json({
    message: user ? "User created successfully" : "Failed to create user",
  });
}
