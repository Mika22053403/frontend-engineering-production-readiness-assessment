import { NextRequest, NextResponse } from "next/server";
import { contacts } from "@/mocks/data/contacts";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  request: NextRequest,
  { params }: Params
) {
  const { id } = await params;

  const contact = contacts.find((c) => c.id === id);

  if (!contact) {
    return NextResponse.json(
      { message: "Contact not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(contact);
}

export async function PUT(
  request: NextRequest,
  { params }: Params
) {
  const { id } = await params;

  const body = await request.json();

  const index = contacts.findIndex((c) => c.id === id);

  if (index === -1) {
    return NextResponse.json(
      { message: "Contact not found" },
      { status: 404 }
    );
  }

  contacts[index] = body;

  return NextResponse.json(contacts[index]);
}

export async function DELETE(
  request: NextRequest,
  { params }: Params
) {
  const { id } = await params;

  const index = contacts.findIndex((c) => c.id === id);

  if (index === -1) {
    return NextResponse.json(
      { message: "Contact not found" },
      { status: 404 }
    );
  }

  contacts.splice(index, 1);

  return NextResponse.json({
    success: true,
  });
}