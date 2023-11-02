import { render, screen, fireEvent } from "@testing-library/react";
import "framer-motion";
import { draw } from "@/lib/api";
import Game from "./";

jest.mock("framer-motion", () => {
  return {
    motion: {
      div: ({ children }: { children: JSX.Element }) => <div>{children}</div>,
    },
  };
});

jest.mock("@/lib/api", () => ({
  draw: jest.fn(),
}));

test("renders initial state", () => {
  render(<Game deckId="test-deck" deckSize={52} />);

  expect(screen.getByText("Remaining: 52 of 52")).toBeInTheDocument();
});

test("updates state on card draw", async () => {
  (draw as jest.Mock).mockResolvedValue({
    cards: [{ image: "/test-image", code: "test-code" }],
    remaining: 51,
  });

  render(<Game deckId="test-deck" deckSize={52} />);

  fireEvent.click(screen.getByText("Draw card"));

  await screen.findByText("Remaining: 51 of 52");

  expect(screen.getByAltText("test-code")).toHaveAttribute("src");
});

describe("when card is drawn", () => {
  test("renders game over state when no cards are remaining", async () => {
    (draw as jest.Mock).mockResolvedValue({
      cards: [{ image: "/test-image", code: "test-code" }],
      remaining: 0,
    });

    render(<Game deckId="test-deck" deckSize={1} />);

    fireEvent.click(screen.getByText("Draw card"));

    await screen.findByText("Value matches: 0");
    await screen.findByText("Suit matches: 0");
  });

  test("updates status text on card draw with value match", async () => {
    (draw as jest.Mock)
      .mockResolvedValueOnce({
        cards: [
          {
            image: "/test-image",
            code: "test-code",
            value: "2",
            suit: "HEARTS",
          },
        ],
        remaining: 51,
      })
      .mockResolvedValueOnce({
        cards: [
          {
            image: "/test-image-2",
            code: "test-code-2",
            value: "2",
            suit: "DIAMONDS",
          },
        ],
        remaining: 50,
      });

    const { getByText } = render(<Game deckId="test-deck" deckSize={52} />);

    fireEvent.click(getByText("Draw card"));
    await screen.findByText("Remaining: 51 of 52");

    fireEvent.click(getByText("Draw card"));
    await screen.findByText("Remaining: 50 of 52");

    expect(screen.getByText("SNAP VALUE!")).toBeInTheDocument();
  });

  test("updates status text on card draw with suit match", async () => {
    (draw as jest.Mock)
      .mockResolvedValueOnce({
        cards: [
          {
            image: "/test-image",
            code: "test-code",
            value: "5",
            suit: "HEARTS",
          },
        ],
        remaining: 51,
      })
      .mockResolvedValueOnce({
        cards: [
          {
            image: "/test-image-2",
            code: "test-code-2",
            value: "2",
            suit: "HEARTS",
          },
        ],
        remaining: 50,
      });

    const { getByText } = render(<Game deckId="test-deck" deckSize={52} />);

    fireEvent.click(getByText("Draw card"));
    await screen.findByText("Remaining: 51 of 52");

    fireEvent.click(getByText("Draw card"));
    await screen.findByText("Remaining: 50 of 52");

    expect(screen.getByText("SNAP SUIT!")).toBeInTheDocument();
  });

  test("updates status text on card draw with suit and value match", async () => {
    (draw as jest.Mock)
      .mockResolvedValueOnce({
        cards: [
          {
            image: "/test-image",
            code: "test-code",
            value: "5",
            suit: "HEARTS",
          },
        ],
        remaining: 51,
      })
      .mockResolvedValueOnce({
        cards: [
          {
            image: "/test-image-2",
            code: "test-code-2",
            value: "5",
            suit: "HEARTS",
          },
        ],
        remaining: 50,
      });

    const { getByText } = render(<Game deckId="test-deck" deckSize={52} />);

    fireEvent.click(getByText("Draw card"));
    await screen.findByText("Remaining: 51 of 52");

    fireEvent.click(getByText("Draw card"));
    await screen.findByText("Remaining: 50 of 52");

    expect(screen.getByText("SNAP!")).toBeInTheDocument();
  });
});
