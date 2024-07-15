import prisma from "@/lib/prisma";

import { NextRequest } from "next/server";
export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log(req.body);
  const user = await prisma.users.create({
    data,
  });
  return Response.json({
    message: user ? "User created successfully" : "Failed to create user",
  });
}
