import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "../test/test-utils";
import App from "./app";

// Mock of Header component
vi.mock("./Header", () => ({
  default: () => <div>Header</div>,
}));

describe("<App />", () => {
  function setup() {
    render(<App />);
  }

  it("should render without error", () => {
    setup();

    expect(screen.getByText(/header/i)).toBeInTheDocument();
  });
});
