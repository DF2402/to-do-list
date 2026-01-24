import { Check, X } from "lucide-react";

export const EditingActions = ({
  handleSave,
  handleCancel,
}: {
  handleSave: () => void;
  handleCancel: () => void;
}) => {
  return (
    <>
      <button type="button" onClick={handleSave}>
        <Check />
      </button>
      <button type="button" onClick={handleCancel}>
        <X />
      </button>
    </>
  );
};
