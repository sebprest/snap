interface GameOverViewProps {
  valueMatches: number;
  suitMatches: number;
}

export default function GameOverView({
  valueMatches,
  suitMatches,
}: GameOverViewProps) {
  return (
    <>
      <p>Value matches: {valueMatches}</p>
      <p>Suit matches: {suitMatches}</p>
    </>
  );
}
