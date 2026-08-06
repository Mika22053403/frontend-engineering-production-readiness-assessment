import { NextResponse } from "next/server";
import { contacts } from "@/mocks/data/contacts";

export async function GET() {
  return NextResponse.json(contacts);
}