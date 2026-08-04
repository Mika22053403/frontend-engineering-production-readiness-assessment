import { render, screen } from "@testing-library/react";
import LoginForm from "@/features/auth/components/login-form";

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
    login: () => ({}),
  },
}));

describe("LoginForm", () => {
  it("renders the login button", () => {
    render(<LoginForm />);

    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });
});
