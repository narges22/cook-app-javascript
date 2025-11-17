import { useIngredientById } from "../../store/store";

type LabelTextProps = {
  ingredientId: string;
};
const LabelText = ({ ingredientId }: LabelTextProps) => {
  if (!ingredientId) return null;
  const ingredient = useIngredientById(ingredientId);

  return <span>({ingredient?.unit})</span>;
};
export default LabelText;
