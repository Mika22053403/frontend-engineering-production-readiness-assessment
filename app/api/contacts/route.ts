import { NextResponse } from "next/server";
import { contacts } from "@/mocks/data/contacts";

export async function GET() {
  return NextResponse.json(contacts);
}

export async function POST(request: Request) {
  const body = await request.json();

  const newContact = {
    id: crypto.randomUUID(),
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    phone: body.phone ?? "",
    company: body.company ?? "",
    tags: body.tags ?? [],
    status: body.status ?? "Active",
  };

  contacts.push(newContact);

  return NextResponse.json(newContact, { status: 201 });
}