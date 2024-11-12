export const Color = ({ color, isSelected, onSelect }) => {
  return (
    <div
      className={`rounded-full w-8 h-8 cursor-pointer ${isSelected ? 'border-3 border-[#b1b1b1]' : ''}`}
      style={{
        backgroundColor: color,
      }}
      onClick={() => onSelect(color)}
    ></div>
  );
};
