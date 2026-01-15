"use client";

export default function ImageBuilder() {
  return (
    <div>
      <div
        draggable
        onDragStart={(e) => {
          e.dataTransfer.setData(
            "component",
            JSON.stringify({
              kind: "element",
              elementType: "image",
            })
          );
        }}
        className="
          w-24 p-2 border-2 rounded-2xl border-blue-600
          hover:bg-blue-100 cursor-grab active:cursor-grabbing
          text-center shadow-sm hover:shadow-md transition
        "
      >
        <span className="font-medium text-blue-700">Image</span>
      </div>
    </div>
  );
}
