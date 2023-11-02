import { render, screen } from "@testing-library/react";
import GameOverView from "./";

test("renders value and suit matches", () => {
  render(<GameOverView valueMatches={3} suitMatches={2} />);

  const valueMatchesElement = screen.getByText(/Value matches: 3/i);
  expect(valueMatchesElement).toBeInTheDocument();

  const suitMatchesElement = screen.getByText(/Suit matches: 2/i);
  expect(suitMatchesElement).toBeInTheDocument();
});
