import { Reveal } from "./Reveal";

interface SectionHeaderProps {
  label: string;
  className?: string;
}

export function SectionHeader({ label, className = "" }: SectionHeaderProps) {
  return (
    <Reveal className={className}>
      <span className="section-label">{label}</span>
    </Reveal>
  );
}
