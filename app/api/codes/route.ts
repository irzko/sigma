import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const code = await prisma.codes.create({
    data,
  });
  return Response.json({
    message: code ? "Code created successfully" : "Failed to create code",
  });
}

export async function GET() {
  const codes = await prisma.codes.findMany();
  return Response.json(codes);
}
