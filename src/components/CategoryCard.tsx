import { DynamicIcon } from "./DynamicIcons";

interface CategoryCardProps {
  title: string;
  description: string;
  icon: any;
  color: string;
  onClick?: () => void;
  selected?: boolean;
}

const CategoryCard = ({ title, description, icon, color, onClick, selected }: CategoryCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`group relative p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer card-hover ${
        selected
          ? 'border-primary bg-primary/5 shadow-hover'
          : 'border-border bg-card hover:border-primary/50'
      }`}
    >
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}
        style={{ backgroundColor: `${color}20` }}
      >
        <DynamicIcon className="w-6 h-6" name={icon} color={color}/>
      </div>
      <h3 className="font-semibold text-lg text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      {selected && (
        <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
          <svg className="w-4 h-4 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default CategoryCard;
