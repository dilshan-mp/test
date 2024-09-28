import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "../src/pages/home";

describe("Home component", () => {
  test("renders without crashing", () => {
    render(<Home />);
    const moonImage = screen.getByTestId("moon-image");
    const exploreButton = screen.getByTestId("explore-button");
    const spacemanImage = screen.getByTestId("spaceman");

    expect(moonImage).toBeInTheDocument();
    expect(exploreButton).toBeInTheDocument();
    expect(spacemanImage).toBeInTheDocument();
  });

  test("explore button is clickable", () => {
    render(<Home />);
    const exploreButton = screen.getByTestId("explore-button");
    expect(exploreButton).toBeEnabled();
    exploreButton.click();
    // Add assertions based on the behavior triggered by the button click
  });

  // Add more test cases as needed
});
