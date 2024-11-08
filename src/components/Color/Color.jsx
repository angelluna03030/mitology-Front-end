export const Color = ({ color, isSelected, onSelect }) => {
  return (
    <div
      className={`rounded-full w-12 h-12 cursor-pointer ${isSelected ? 'border-4 border-colorprimary' : ''}`}
      style={{
        backgroundColor: color,
      }}
      onClick={() => onSelect(color)}
    ></div>
  );
};
