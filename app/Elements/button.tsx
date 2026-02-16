// export default function Button()    
// {   
//     return (
//         <div className="my-2">
//             <div className="w-16 p-2 border-2 rounded-2xl border-blue-700 hover:bg-blue-100 cursor-grab">
//             <span className="font-medium">Button</span>
//             </div>
//         </div>
//     )}

"use client";

export default function Button() {
  return (
    <div className="my-2">
      <div
        draggable
        className="w-24 p-2 border-2 rounded-2xl border-blue-600 
                   hover:bg-blue-900 cursor-grab active:cursor-grabbing
                   text-center "
        onDragStart={(e) => {
          e.dataTransfer.setData(
            "component",
            JSON.stringify({
              kind: "element",
              elementType: "button",
              text: "Click Me",
            })
          );
        }}
      >
        <span className="font-medium text-blue-700"> Button</span>
      </div>
    </div>
  );
}
