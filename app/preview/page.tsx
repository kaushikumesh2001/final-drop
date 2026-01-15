
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function PreviewPage() {
  const [sections, setSections] = useState<any[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("builderPreview");
    if (data) setSections(JSON.parse(data));
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-100 p-4">
      {sections.map((section) => (
        <div
          key={section.id}
            className="
    border
    mb-4
    grid
    grid-cols-12
    auto-rows-[48px]
    min-h-[240px]
    relative
    bg-white
  "
        >
          {section.elements.map((element: any) => (
            <div
              key={element.id}
              style={{
                gridColumn: `${element.colStart} / span ${element.colSpan}`,
                gridRow: `${element.rowStart} / span ${element.rowSpan}`,
              }}
            >
              {/* TEXT */}
 {element.type === "text" && (
  <p    className="w-full h-full"
    style={{
      color: element.style?.color,
      fontSize: element.style?.fontSize,
      fontWeight: element.style?.fontWeight,
      fontStyle: element.style?.fontStyle,
      textDecoration: element.style?.textDecoration,
      textAlign: element.style?.textAlign,
      margin: element.style?.margin,
      padding: element.style?.padding,
      whiteSpace: "pre-wrap",   //  multiline support
      wordBreak: "break-word",  //  long word fix
    }}
    dangerouslySetInnerHTML={{
      __html: element.html || element.text,
    }}
  ></p>

)}



              {/* BUTTON */}
            {element.type === "button" && (
  <button
    style={element.style}
    className="w-full h-full bg-blue-600 text-white rounded"
  >
    {element.text || "Button"}
  </button>
)}


              {/* IMAGE */}
              {element.type === "image" && (
                <div className="relative w-full h-full ">
                  <Image
                    src={element.src || "/placeholder.png"}
                    alt="Preview Image"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
