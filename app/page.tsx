import Game from "@/app/components/Game";
import { shuffle } from "@/lib/api";

export default async function Home() {
  const data = await shuffle();

  return (
    <main className="container mx-auto p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">Snap!</h1>
      <Game deckId={data.deck_id} deckSize={data.remaining} />
    </main>
  );
}
