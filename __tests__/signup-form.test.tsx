import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignupForm from "@/features/auth/components/signup-form";

// Mock Next.js router
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock Zustand auth store
jest.mock("@/stores/auth-store", () => ({
  useAuthStore: () => jest.fn(),
}));

// Mock React Query mutation
jest.mock("@tanstack/react-query", () => ({
  useMutation: () => ({
    mutateAsync: jest.fn(),
    isPending: false,
  }),
}));

// Mock auth query
jest.mock("@/queries/auth.query", () => ({
  authMutations: {
    signup: () => ({}),
  },
}));

describe("SignupForm", () => {
  it("renders all fields and the submit button, disabled by default", () => {
    render(<SignupForm />);

    expect(screen.getByLabelText(/work email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/company \/ workspace name/i),
    ).toBeInTheDocument();

    const submitButton = screen.getByRole("button", {
      name: /start free trial/i,
    });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it("enables the submit button once all fields are valid", async () => {
    const user = userEvent.setup();

    render(<SignupForm />);

    await user.type(screen.getByLabelText(/work email/i), "jordan@acme.com");
    await user.type(screen.getByLabelText(/^password$/i), "password123");
    await user.type(
      screen.getByLabelText(/company \/ workspace name/i),
      "Acme Inc",
    );

    const submitButton = screen.getByRole("button", {
      name: /start free trial/i,
    });

    expect(submitButton).not.toBeDisabled();
  });
});
