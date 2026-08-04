import { contactSchema } from "@/schemas/contact.schema";

describe("contactSchema", () => {
  it("accepts valid contact data", () => {
    const result = contactSchema.safeParse({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "9876543210",
      company: "OpenAI",
      tags: ["VIP"],
      status: "Active",
    });

    expect(result.success).toBe(true);
  });

  it("rejects invalid email", () => {
    const result = contactSchema.safeParse({
      firstName: "John",
      lastName: "Doe",
      email: "wrong-email",
      phone: "9876543210",
      company: "OpenAI",
      tags: ["VIP"],
      status: "Active",
    });

    expect(result.success).toBe(false);
  });

  it("rejects empty first name", () => {
    const result = contactSchema.safeParse({
      firstName: "",
      lastName: "Doe",
      email: "john@example.com",
      phone: "9876543210",
      company: "OpenAI",
      tags: [],
      status: "Active",
    });

    expect(result.success).toBe(false);
  });
});