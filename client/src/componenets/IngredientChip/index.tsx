import { Chip } from "primereact/chip";
import { useIngredientById } from "../../store/store";

interface IngredientChipProps {
  ingredientId: string;
  qty: number;
  onRemove: (ingredientId: string) => boolean;
  disabled?: boolean;
}

const IngredientChip = ({
  ingredientId,
  qty,
  onRemove,
  disabled = false,
}: IngredientChipProps) => {
  const ingredient = useIngredientById(ingredientId);

  const ingredientName = ingredient?.name || ingredientId;
  const ingredientUnit = ingredient?.unit || "";
  const chipLabel = `${ingredientName} (${qty} ${ingredientUnit})`;

  return (
    <Chip
      key={ingredientId}
      label={chipLabel}
      removable={!disabled}
      onRemove={() => onRemove(ingredientId)}
      className="!bg-purple-50 !border-purple-200 !text-purple-700 hover:!bg-purple-100 transition-all duration-200 shadow-sm"
    />
  );
};

export default IngredientChip;
