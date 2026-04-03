"use client";

import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

export type CardVariant = "dark" | "light";

interface CardTemplateProps {
  userName: string;
  variant: CardVariant;
  onTextureReady: (dataUrl: string) => void;
  city?: string;
  date?: string;
}

export interface CardTemplateRef {
  captureTexture: () => Promise<void>;
}

const CANVAS_SIZE = 1376;

const CardTemplate = forwardRef<CardTemplateRef, CardTemplateProps>(
  ({ userName, variant, onTextureReady, city, date }, ref) => {
    const [baseImage, setBaseImage] = useState<HTMLImageElement | null>(null);

    const imageSrc = variant === "dark" ? "/card-base-dark.png" : "/card-base-light.png";
    const textColor = variant === "dark" ? "#ffffff" : "#000000";

    useEffect(() => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => setBaseImage(img);
      img.src = `${imageSrc}?v=${Date.now()}`;
    }, [imageSrc]);

    const captureTexture = async () => {
      const canvas = document.createElement("canvas");
      canvas.width = CANVAS_SIZE;
      canvas.height = CANVAS_SIZE;
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      if (baseImage) {
        ctx.drawImage(baseImage, 0, 0, CANVAS_SIZE, CANVAS_SIZE);
      } else {
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
      }

      const displayName = userName || "YOUR NAME";
      ctx.fillStyle = textColor;
      ctx.font = 'normal 48px "Geist Mono", monospace';
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.fillText(displayName.toUpperCase(), CANVAS_SIZE / 2 - 55, CANVAS_SIZE - 400);

      if (city) {
        ctx.fillStyle = textColor;
        ctx.font = 'normal 48px "Geist Mono", monospace';
        ctx.textAlign = "right";
        ctx.textBaseline = "middle";
        ctx.fillText(city.toUpperCase(), CANVAS_SIZE / 2 - 55, CANVAS_SIZE - 1226);
      }

      if (date) {
        ctx.fillStyle = "#878787";
        ctx.font = 'normal 48px "Geist Mono", monospace';
        ctx.textAlign = "right";
        ctx.textBaseline = "middle";
        ctx.fillText(date.toUpperCase(), CANVAS_SIZE / 2 - 55, CANVAS_SIZE - 1170);
      }

      onTextureReady(canvas.toDataURL("image/png"));
    };

    useImperativeHandle(ref, () => ({
      captureTexture,
    }));

    useEffect(() => {
      if (!baseImage) return;

      const renderAfterFonts = async () => {
        if (typeof document !== "undefined" && "fonts" in document) {
          await (document as Document & { fonts: FontFaceSet }).fonts.ready;
        }
        await captureTexture();
      };

      renderAfterFonts();
    }, [baseImage, userName, city, date, variant, onTextureReady]);

    return null;
  }
);

CardTemplate.displayName = "CardTemplate";

export default CardTemplate;
