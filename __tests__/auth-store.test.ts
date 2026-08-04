import { useAuthStore } from "@/stores/auth-store";

describe("Auth Store", () => {
  beforeEach(() => {
    useAuthStore.setState({
      token: null,
      user: null,
    });
  });

  it("has the correct initial state", () => {
    const state = useAuthStore.getState();

    expect(state.token).toBeNull();
    expect(state.user).toBeNull();
  });

  it("logs in the user", () => {
    useAuthStore.getState().login("token123", {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
    });

    const state = useAuthStore.getState();

    expect(state.token).toBe("token123");
    expect(state.user).toEqual({
      id: "1",
      name: "John Doe",
      email: "john@example.com",
    });
  });

  it("logs out the user", () => {
    useAuthStore.getState().login("token123", {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
    });

    useAuthStore.getState().logout();

    const state = useAuthStore.getState();

    expect(state.token).toBeNull();
    expect(state.user).toBeNull();
  });
});