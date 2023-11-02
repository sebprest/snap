"use client";
import { useState } from "react";
import { draw } from "@/lib/api";
import { Card } from "@/lib/types";
import GameOverView from "@/app/components/GameOverView";
import dynamic from "next/dynamic";

const CardDisplay = dynamic(() => import("@/app/components/CardDisplay"), {
  ssr: false,
});

interface GameProps {
  deckId: string;
  deckSize: number;
}

export default function Game({ deckId, deckSize }: GameProps) {
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [previousCard, setPreviousCard] = useState<Card | null>(null);
  const [remaining, setRemaining] = useState<number>(deckSize);
  const [valueMatches, setValueMatches] = useState<number>(0);
  const [suitMatches, setSuitMatches] = useState<number>(0);
  const [statusText, setStatusText] = useState<string>("");

  const gameOver = remaining === 0;

  const drawCard = async () => {
    const drawResponse = await draw(deckId);
    const newCard = drawResponse.cards[0];
    const remaining = drawResponse.remaining;

    let newStatusText = "";
    let newValueMatches = valueMatches;
    let newSuitMatches = suitMatches;

    if (currentCard) {
      if (currentCard.value === newCard.value) {
        newValueMatches += 1;
        newStatusText = "SNAP VALUE!";
      }
      if (currentCard.suit === newCard.suit) {
        newSuitMatches += 1;
        newStatusText = "SNAP SUIT!";
      }
      if (
        currentCard.value === newCard.value &&
        currentCard.suit === newCard.suit
      ) {
        newStatusText = "SNAP!";
      }
    }

    setStatusText(newStatusText);
    setValueMatches(newValueMatches);
    setSuitMatches(newSuitMatches);
    setPreviousCard(currentCard);
    setCurrentCard(newCard);
    setRemaining(remaining);
  };

  return (
    <div>
      <p className="font-semibold">{statusText}</p>
      <CardDisplay previousCard={previousCard} currentCard={currentCard} />
      {gameOver ? (
        <GameOverView valueMatches={valueMatches} suitMatches={suitMatches} />
      ) : (
        <>
          <p className="font-semibold">
            Remaining: {remaining} of {deckSize}
          </p>
          <button
            onClick={drawCard}
            className="text-white font-semibold h-12 px-6 rounded-lg sm:w-auto bg-sky-500 highlight-white/20 hover:bg-sky-400"
          >
            Draw card
          </button>
        </>
      )}
    </div>
  );
}
