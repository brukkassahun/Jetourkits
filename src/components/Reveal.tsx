// Reveal is currently a no-op placeholder.
// Entrance animations are disabled to guarantee content is always visible
// across all browsers, bots, and screenshot tools. Hover/lift micro-interactions
// still provide liveliness via Tailwind classes.

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

export default function Reveal({ children, className = "" }: RevealProps) {
  return <div className={className}>{children}</div>;
}
