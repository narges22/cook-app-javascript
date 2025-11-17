import { useTransformedIngredients } from "../../store/store";

type LabelTextProps = {
  ingredientId: string;
};
const LabelText = ({ ingredientId }: LabelTextProps) => {
  if (!ingredientId) return null;
  const transformedIngredients = useTransformedIngredients();

  return <span>({transformedIngredients[ingredientId].unit})</span>;
};
export default LabelText;
