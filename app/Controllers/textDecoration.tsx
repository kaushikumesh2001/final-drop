"use client";

export default function TextDecoration({
  onBold,
  onItalic,
  onUnderline,
}: {
  onBold: () => void;
  onItalic: () => void;
  onUnderline: () => void;
}) {
  return (
    <div className="flex w-full border-blue-700 rounded-2xl p-1 border-2 gap-1">
      
      <button
        onClick={onBold}
        className="px-2 py-1 border rounded hover:bg-gray-200"
      >
        Bold
      </button>

      <button
        onClick={onItalic}
        className="px-1 py-1 border rounded hover:bg-gray-200"
      >
        Italic
      </button>

      <button
        onClick={onUnderline}
        className="px-1 py-1 border rounded hover:bg-gray-200"
      >
        Undrlin
      </button>

    </div>
  );
}
