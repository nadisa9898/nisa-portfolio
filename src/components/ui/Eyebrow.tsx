interface EyebrowProps {
  children: React.ReactNode;
  /** Line and text color; defaults to the blue accent. */
  className?: string;
}

/** Small mono label with a leading rule. */
export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p className={`flex items-center gap-3 font-mono text-xs tracking-[.2em] text-blue uppercase ${className ?? ""}`}>
      <span aria-hidden="true" className="h-0.5 w-7 bg-current" />
      {children}
    </p>
  );
}
