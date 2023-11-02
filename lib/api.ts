import { Card } from "@/lib/types";

interface ShuffleResponse {
  success: boolean;
  deck_id: string;
  shuffled: boolean;
  remaining: number;
}

interface DrawResponse {
  success: boolean;
  cards: Card[];
  deck_id: string;
  remaining: number;
}

export async function shuffle(): Promise<ShuffleResponse> {
  const res = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/", {
    cache: "no-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to shuffle deck");
  }

  return res.json();
}

export async function draw(deckId: string): Promise<DrawResponse> {
  const res = await fetch(
    `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`,
  );

  if (!res.ok) {
    throw new Error("Failed to draw a card");
  }

  return res.json();
}
