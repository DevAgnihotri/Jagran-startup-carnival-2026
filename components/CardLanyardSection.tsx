"use client";

import { useCallback, useRef, useState } from "react";
import CardTemplate, { CardTemplateRef, CardVariant } from "@/components/card-template";
import Lanyard from "@/components/ui/lanyard";

interface CardLanyardSectionProps {
  className?: string;
  containerClassName?: string;
  position?: [number, number, number];
}

export default function CardLanyardSection({
  className,
  containerClassName = "relative aspect-square w-full h-[760px]",
  position = [0, 0, 18],
}: CardLanyardSectionProps) {
  const cardTemplateRef = useRef<CardTemplateRef>(null);
  const [cardTextureUrl, setCardTextureUrl] = useState<string | undefined>(undefined);
  const [textureKey, setTextureKey] = useState(0);

  const handleTextureReady = useCallback((dataUrl: string) => {
    setCardTextureUrl(dataUrl);
    setTextureKey((prev) => prev + 1);
  }, []);

  return (
    <div className={className}>
      <Lanyard
        key={textureKey}
        position={position}
        containerClassName={containerClassName}
        cardTextureUrl={cardTextureUrl}
      />

      <CardTemplate
        ref={cardTemplateRef}
        userName="your name"
        variant={"dark" as CardVariant}
        city="kanpur"
        date="23-04-26"
        onTextureReady={handleTextureReady}
      />
    </div>
  );
}
