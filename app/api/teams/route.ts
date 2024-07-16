import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const teams = await prisma.teams.findMany();
  if (!teams) {
    return NextResponse.json(
      {
        message: "Failed to get team",
      },
      { status: 500 }
    );
  }
  return NextResponse.json(
    {
      data: teams,
    },
    { status: 200 }
  );
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const team = await prisma.teams.create({
    data,
  });
  return NextResponse.json({
    message: team ? "Team created successfully" : "Failed to create team",
  });
}
