import { exportContacts } from "@/lib/export-contacts";
import { Contact } from "@/types/contact";

const mockGenerateCsv = jest.fn(() => "csv-data");
const mockDownload = jest.fn();

jest.mock("export-to-csv", () => ({
  mkConfig: jest.fn(() => ({
    filename: "contacts",
    useKeysAsHeaders: true,
  })),
  generateCsv: jest.fn(() => mockGenerateCsv),
  download: jest.fn(() => mockDownload),
}));

describe("exportContacts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("generates and downloads a CSV file", () => {
    const contacts: Contact[] = [
      {
        id: "1",
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phone: "9876543210",
        company: "CampaignHQ",
        tags: ["VIP"],
        status: "Active",
      },
    ];

    exportContacts(contacts);

    expect(mockGenerateCsv).toHaveBeenCalledWith([
      {
        id: "1",
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phone: "9876543210",
        company: "CampaignHQ",
        status: "Active",
      },
    ]);

    expect(mockDownload).toHaveBeenCalledWith("csv-data");
  });
});