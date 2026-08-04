import { contactService } from "@/services/contact.service";
import { api } from "@/lib/api";
import { Contact } from "@/types/contact";

jest.mock("@/lib/api", () => ({
  api: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

describe("contactService", () => {
  const mockContact: Contact = {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "9876543210",
    company: "CampaignHQ",
    tags: ["VIP"],
    status: "Active",
  };

  const newContact: Omit<Contact, "id"> = {
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    phone: "9999999999",
    company: "CampaignHQ",
    tags: ["Lead"],
    status: "Active",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("gets contacts", async () => {
    (api.get as jest.Mock).mockResolvedValue({
      data: [mockContact],
    });

    const result = await contactService.getContacts();

    expect(api.get).toHaveBeenCalledWith("/contacts");
    expect(result).toEqual([mockContact]);
  });

  it("creates a contact", async () => {
    (api.post as jest.Mock).mockResolvedValue({
      data: {
        ...newContact,
        id: "2",
      },
    });

    const result = await contactService.createContact(newContact);

    expect(api.post).toHaveBeenCalledWith(
      "/contacts",
      newContact
    );

    expect(result.id).toBe("2");
  });

  it("updates a contact", async () => {
    (api.put as jest.Mock).mockResolvedValue({
      data: mockContact,
    });

    const result = await contactService.updateContact(mockContact);

    expect(api.put).toHaveBeenCalledWith(
      "/contacts/1",
      mockContact
    );

    expect(result).toEqual(mockContact);
  });

  it("deletes a contact", async () => {
    (api.delete as jest.Mock).mockResolvedValue({});

    await contactService.deleteContact("1");

    expect(api.delete).toHaveBeenCalledWith("/contacts/1");
  });
});