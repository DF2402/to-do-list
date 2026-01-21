export const EditableText = ({
  text,
  onSave,
  editMode,
  onChange,
}: {
  text: string;
  onSave: (text: string) => void;
  editMode: boolean;
  onChange: (text: string) => void;
}) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSave(text);
    }
  };

  if (editMode) {
    return (
      <div
        className={`editable-text-container ${
          editMode ? "editing" : "not-editing"
        } `}
      >
        <input
          type="text"
          value={text}
          onKeyPress={handleKeyPress}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    );
  }

  return <div>{text}</div>;
};

export default EditableText;
