import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import ContactSearch from "../components/ContactSearch";

describe("ContactSearch", () => {
  it("renders the search input", () => {
    render(<ContactSearch value="" onChange={vi.fn()} />);

    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });

  it("calls onChange when typing", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<ContactSearch value="" onChange={onChange} />);

    const input = screen.getByPlaceholderText(/search/i);

    await user.type(input, "John");

    expect(onChange).toHaveBeenCalled();
  });
});
