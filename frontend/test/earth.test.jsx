import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Earth from "../src/pages/earth";

describe("Earth component", () => {
  test("renders without crashing", () => {
    render(<Earth />);
    const datepicker = screen.getByTestId("Date");
    const longitudeSlider = screen.getByTestId("Longitude");
    const latitudeSlider = screen.getByTestId("Latitude");

    expect(datepicker).toBeInTheDocument();
    expect(longitudeSlider).toBeInTheDocument();
    expect(latitudeSlider).toBeInTheDocument();
  });

  test("updates longitude and latitude values", () => {
    render(<Earth />);
    const longitudeSlider = screen.getByTestId("Longitude");
    const latitudeSlider = screen.getByTestId("Latitude");

    fireEvent.change(longitudeSlider, { target: { value: 50 } });
    fireEvent.change(latitudeSlider, { target: { value: -20 } });

    expect(longitudeSlider).toHaveValue(50);
    expect(latitudeSlider).toHaveValue(-20);
  });
});
