import React from "react";
import Image from "next/image";
import { Card } from "@/lib/types";

interface CardProps {
  card: Card | null;
}

export default function CardComponent({ card }: CardProps) {
  if (!card) {
    return (
      <div
        data-testid="placeholder"
        className="w-[226px] h-[314px] bg-gray-200 rounded-md"
      ></div>
    );
  }

  return <Image src={card.image} alt={card.code} width={226} height={314} />;
}
