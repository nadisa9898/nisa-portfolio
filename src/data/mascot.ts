export interface MascotPupil {
  left: number;
  top: number;
  width: number;
}

export interface MascotVariant {
  /** Asset prefix: public/images/<prefix>-{base,eyemask,pupil-0,pupil-1}.webp */
  prefix: string;
  /** Art width and height in source pixels. */
  width: number;
  height: number;
  /** Eye center as a fraction of the art size. */
  eye: { x: number; y: number };
  pupils: readonly [MascotPupil, MascotPupil];
}

/** Eye-tracking layer geometry for each character pose (percent of art width/height). */
export const mascotVariants = {
  buddy: {
    prefix: "nadia-ok",
    width: 787,
    height: 1257,
    eye: { x: 0.596, y: 0.315 },
    pupils: [
      { left: 26.429, top: 27.765, width: 26.684 },
      { left: 66.074, top: 18.536, width: 26.557 },
    ],
  },
  stand: {
    prefix: "nadia-stand",
    width: 738,
    height: 1269,
    eye: { x: 0.566, y: 0.321 },
    pupils: [
      { left: 18.835, top: 27.266, width: 29.404 },
      { left: 55.691, top: 17.73, width: 31.436 },
    ],
  },
} as const satisfies Record<string, MascotVariant>;

export type MascotVariantName = keyof typeof mascotVariants;

/**
 * Buddy speech by section id. The reference indexed these against the nav, which put
 * "Superpowers, assemble!" on Contact; keying by section keeps each line on its own section.
 */
export const buddySays: Readonly<Record<string, string>> = {
  about: "That's Nadia, the designer behind all this!",
  work: "Psst… hover a project.",
};
