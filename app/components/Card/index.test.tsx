import { render, screen } from "@testing-library/react";
import CardComponent from "./";

test("renders placeholder when card is null", () => {
  render(<CardComponent card={null} />);

  const placeholderElement = screen.getByTestId("placeholder");
  expect(placeholderElement).toBeInTheDocument();
});

test("renders card image when card is not null", () => {
  const card = { image: "/test-image", code: "test-code" };
  render(<CardComponent card={card} />);

  const imageElement = screen.getByRole("img");
  expect(imageElement).toHaveAttribute("src");
  expect(imageElement).toHaveAttribute("alt", "test-code");
});
