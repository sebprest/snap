import { render, screen } from "@testing-library/react";
import "framer-motion";
import CardDisplay from "./";
import { Card } from "@/lib/types";

jest.mock("framer-motion", () => {
  return {
    motion: {
      div: ({ children }: { children: JSX.Element }) => <div>{children}</div>,
    },
  };
});

test("renders placeholders when cards are null", () => {
  render(<CardDisplay currentCard={null} previousCard={null} />);

  const placeholderElements = screen.getAllByTestId("placeholder");
  expect(placeholderElements).toHaveLength(2);
});

test("renders card images when cards are not null", () => {
  const currentCard = { image: "/current-image", code: "current-code" };
  const previousCard = { image: "/previous-image", code: "previous-code" };
  render(
    <CardDisplay
      currentCard={currentCard as Card}
      previousCard={previousCard as Card}
    />,
  );

  const currentImageElement = screen.getByAltText("current-code");
  expect(currentImageElement).toHaveAttribute("src");

  const previousImageElement = screen.getByAltText("previous-code");
  expect(previousImageElement).toHaveAttribute("src");
});
