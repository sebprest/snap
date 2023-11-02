import React from "react";
import { motion } from "framer-motion";
import Card from "@/app/components/Card";
import { Card as CardType } from "@/lib/types";

interface CardDisplayProps {
  currentCard: CardType | null;
  previousCard: CardType | null;
}

export default function CardDisplay({
  currentCard,
  previousCard,
}: CardDisplayProps) {
  return (
    <div className="flex justify-center space-x-4">
      <Card card={previousCard} />
      <motion.div
        key={currentCard?.code}
        initial={currentCard ? { rotateY: 180 } : { rotateY: 0 }}
        animate={{ rotateY: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card card={currentCard} />
      </motion.div>
    </div>
  );
}
