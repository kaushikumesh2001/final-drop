"use client";

export default function Size({
  value,
  onChange,
}: {
  value: number;
  onChange: (val: number) => void;
}) {
  const sizes = [12, 16, 20, 24, 30, 36, 48];

  return (
    <div className="border-2 p-2 rounded-3xl mt-2 border-blue-700">
      <div className="text-center font-bold text-cyan-600 mb-2">
        Size
      </div>

      <div className="grid grid-cols-3 gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onChange(size)}
            className={`border rounded-md py-1 text-sm hover:bg-gray-200 ${
              value === size ? "bg-blue-100 border-blue-600" : ""
            }`}
          >
            {size}px
          </button>
        ))}
      </div>
    </div>
  );
}
