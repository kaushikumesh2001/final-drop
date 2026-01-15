"use client";

export default function Padding({
  value,
  onChange,
}: {
  value: number;
  onChange: (val: number) => void;
}) {
  const paddingValues = [0, 5, 10, 15, 20, 25, 30];

  return (
    <div className="border-2 p-2 rounded-3xl border-blue-700 mb-2">
      <div className="text-center font-bold text-cyan-600 mb-2">
        Padding
      </div>

      <div className="grid grid-cols-3 gap-1">
        {paddingValues.map((p) => (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`px-1 py-1 border hover:bg-gray-200 ${
              value === p ? "bg-blue-100 border-blue-600" : ""
            }`}
          >
            {p}px
          </button>
        ))}
      </div>
    </div>
  );
}
