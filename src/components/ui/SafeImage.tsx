"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type SafeImageProps = Omit<ImageProps, "onError"> & {
  /** Background shown if the asset is missing or fails to load. */
  fallbackColor?: string;
};

/** next/image with a clean colored fallback when the file is missing. */
export function SafeImage({ fallbackColor = "#BCEBFF", alt, className, ...rest }: SafeImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        role="img"
        aria-label={alt}
        className={className}
        style={{ background: fallbackColor, display: "block", width: "100%", height: "100%" }}
      />
    );
  }

  return <Image alt={alt} className={className} onError={() => setFailed(true)} {...rest} />;
}
