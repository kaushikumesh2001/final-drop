"use client";

export default function ButtonTextInput({
  value,
  onChange,
  disabled,
}: {
  value: string;
  onChange: (text: string) => void;
  disabled: boolean;
}) {
  return (
    <div className="border-2 p-1 rounded-2xl border-blue-700 w-51">
      <div className="text-center font-bold text-cyan-600 mb-1">
        Button Text
      </div>

      <input
        type="text"
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-sm w-full border px-2 py-1 rounded"
        placeholder="Enter button text"
      />
    </div>
  );
}
