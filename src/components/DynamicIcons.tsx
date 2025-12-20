import * as LucideIcons from "lucide-react";

type IconProps = {
  name: keyof typeof LucideIcons;
  color?: string;
  className?: string;
};

export function DynamicIcon({ name, color, className }: IconProps) {
  const Icon = LucideIcons[name];

  if (!Icon) return null;

  return <Icon className={className} style={{ color }} />;
}
