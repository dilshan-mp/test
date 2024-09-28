import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import TestPage from "../src/pages/testPage";

describe("ErrorMessage", () => {
  it("Renders default error state.", () => {
    render(<TestPage />);
    expect(screen.getByTestId("message-container"));
  });
});
