"use client";

export default function Color({
  onChange,
}: {
  onChange: (color: string) => void;
}) {
  const colors = [
    "#000000",
    "#FF0000",
    "#00AEEF",
    "#008000",
    "#FFA500",
    "#800080",
    "#FFFFFF",
  ];

  return (
    <div className="border-2 p-2 rounded-3xl mb-2 border-blue-700">
      <div className="text-center font-bold text-cyan-600 mb-2">
        Colors
      </div>

      <div className="grid grid-cols-4 gap-2">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => onChange(color)}
            className="w-8 h-8 rounded-md border"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
}
