

"use client";

import Image from "next/image";
import { useState } from "react";
export default function Mainbar({
  sections,
  setSections, //props comes from parent component
  activeElement,
  setActiveElement,
}: {
  sections: any[];
  setSections: any;
  activeElement: any;
  setActiveElement: any;
}) {


  const [resizing, setResizing] = useState<null | { //user resize handle which section, which element, from where mouse start
    sectionId: number;
    elementId: number;
    startX: number;
    startY: number;
    startColSpan: number;
    startRowSpan: number;
  }>(null);

  const [moving, setMoving] = useState<null | { //when user drag the element then it update the position when mouse move
    sectionId: number;
    elementId: number;
  }>(null);

 

  const isOverlapping = (a: any, b: any) => { //check overlap function
    const aColEnd = a.colStart + a.colSpan - 1; //where  element A is finished (column)
    const aRowEnd = a.rowStart + a.rowSpan - 1;//for row
    const bColEnd = b.colStart + b.colSpan - 1; //B for ending position
    const bRowEnd = b.rowStart + b.rowSpan - 1;

    return !( //overlap ka ulta logic if these condition false then overlap
      aColEnd < b.colStart ||  //a is completely left from b
      a.colStart > bColEnd ||  // a is right
      aRowEnd < b.rowStart ||  //a is upper
      a.rowStart > bRowEnd   // a is lower
    );
  };








  const getGridPosition = ( // it convert mouse position in grid row/column
    e: React.DragEvent<HTMLDivElement>, //mouse event and section Dom
    sectionEl: HTMLDivElement
  ) => {
    const rect = sectionEl.getBoundingClientRect();  //section size and position

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;  //tells the position where is mouse inside section

    const COLS = 12;
    const ROW_HEIGHT = 48;

    const colWidth = rect.width / COLS;  //one column width

    const colStart = Math.min(COLS, Math.max(1, Math.floor(x / colWidth) + 1));  //column boundary limit and in which column does mouse have

    const rowStart = Math.max(1, Math.floor(y / ROW_HEIGHT) + 1);

    return { colStart, rowStart }; //final grid position return
  };

  //resize logic
  const startResize = (
    e: React.MouseEvent,
    sectionId: number,
    elementId: number
  ) => {
    e.stopPropagation();

    const section = sections.find((s) => s.id === sectionId);
    if (!section) return;

    const element = section.elements.find((el) => el.id === elementId);
    if (!element) return;

    setResizing({
      sectionId,
      elementId,
      startX: e.clientX,
      startY: e.clientY,
      startColSpan: element.colSpan,
      startRowSpan: element.rowSpan,
    });
    setActiveElement({ sectionId, elementId });
  };

  const startMove = (
    e: React.MouseEvent,
    sectionId: number,
    elementId: number
  ) => {
    e.stopPropagation();
    setMoving({ sectionId, elementId });
    setActiveElement({ sectionId, elementId });
  };

  const handleResize = (e: React.MouseEvent) => {
    if (!resizing) return;

    const dx = e.clientX - resizing.startX;
    const dy = e.clientY - resizing.startY;

    const COL_WIDTH = 100;
    const ROW_HEIGHT = 48;

    const newColSpan = resizing.startColSpan + Math.round(dx / COL_WIDTH);

    const newRowSpan = resizing.startRowSpan + Math.round(dy / ROW_HEIGHT);

    setSections((prev) =>
      prev.map((section) => {
        if (section.id !== resizing.sectionId) return section;

        return {
          ...section,
          elements: section.elements.map((el) => {
            if (el.id !== resizing.elementId) return el;

            const resized = {
              ...el,
              colSpan: Math.max(1, Math.min(12, newColSpan)),
              rowSpan: Math.max(1, newRowSpan),
            };

            const hasCollision = section.elements.some(
              (other) => other.id !== el.id && isOverlapping(resized, other)
            );

            //  Takra gaya → resize cancel
            if (hasCollision) return el;

            //  Safe → resize allow
            return resized;
          }),
        };
      })
    );
  };

  const handleMove = (e: React.MouseEvent) => {
    if (!moving) return;

    setSections((prev) =>
      prev.map((section) => {
        if (section.id !== moving.sectionId) return section;

        const sectionEl = document.getElementById(
          `section-${section.id}`
        ) as HTMLDivElement;

        if (!sectionEl) return section;

        const rect = sectionEl.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const COLS = 12;
        const ROW_HEIGHT = 48;
        const colWidth = rect.width / COLS;

        const colStart = Math.min(
          COLS,
          Math.max(1, Math.floor(x / colWidth) + 1)
        );

        const rowStart = Math.max(1, Math.floor(y / ROW_HEIGHT) + 1);

        return {
          ...section,
          elements: section.elements.map((el) => {
            if (el.id !== moving.elementId) return el;

            const moved = {
              ...el,
              colStart,
              rowStart,
            };

            const hasCollision = section.elements.some(
              (other) => other.id !== el.id && isOverlapping(moved, other)
            );

            //overlap → move cancel
            if (hasCollision) return el;

            // free → move allow
            return moved;
          }),
        };
      })
    );
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("component"));

    if (data.kind === "section") {
      setSections((prev) => [
        ...prev,
        {
          id: Date.now(),
          type: data.sectionType,
          elements: [],
        },
      ]);
    }
  };

  const updateText = (sectionId: number, elementId: number, value: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              elements: section.elements.map((el) =>
                el.id === elementId ? { ...el, text: value } : el
              ),
            }
          : section
      )
    );
  };

  const deleteElement = (sectionId: number, elementId: number) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              elements: section.elements.filter((el) => el.id !== elementId),
            }
          : section
      )
    );

    setActiveElement(null);
  };

  //section delete logic
  const deleteSection = (sectionId: number) => {
    setSections((prev) => prev.filter((section) => section.id !== sectionId));
  };

  const handleElementDrop = (
    e: React.DragEvent<HTMLDivElement>,
    sectionId: number
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const raw = e.dataTransfer.getData("component");
    if (!raw) return;

    const data = JSON.parse(raw);
    const sectionEl = e.currentTarget;

    const { colStart, rowStart } = getGridPosition(e, sectionEl);

    const newElement = {
      id: Date.now(),
      type: data.elementType,

      text: data.elementType === "text" ? "Write..." : "",

      src: data.elementType === "image" ? "/placeholder.png" : undefined,

      colStart,
      colSpan: 1,
      rowStart,
      rowSpan: 1,
      style: {
  color: "#000000",
  fontSize: 16,
  fontWeight: "normal",
  fontStyle: "normal",
  textDecoration: "none",
  margin: 0,
  padding: 0,
},

    };

    setSections((prev) =>
      prev.map((section) => {
        if (section.id !== sectionId) return section;

        const hasCollision = section.elements.some((el) =>
          isOverlapping(newElement, el)
        );

        //  Agar jagah bhari hai → drop mat karo
        if (hasCollision) return section;

        //  Jagah free hai → drop karo
        return {
          ...section,
          elements: [...section.elements, newElement],
        };
      })
    );
  };

  return (
    <div
      className="w-full h-screen bg-green-200 overflow-hidden "
      onMouseDown={() => setActiveElement(null)}
      onMouseMove={(e) => {
        handleResize(e);
        handleMove(e);
      }}
      onMouseUp={() => {
        setResizing(null);
        setMoving(null);
      }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <div className="bg-white h-full p-0 overflow-y-auto canvas-grid">
        {sections.map((section) => (
          <div
            id={`section-${section.id}`}
            key={section.id}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleElementDrop(e, section.id)}
            style={{ alignContent: "start" }}
            className="
border-2
  
  p-0 mb-0
  grid
  grid-cols-12
  auto-rows-[48px]
  gap-0
  relative
  min-h-[240px]
  
"
          >
            {/* SECTION DELETE BUTTON */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteSection(section.id);
              }}
              className="
      absolute
      top-1
      right-1
      z-20
      bg-red-500
      text-white
      text-xs
      px-2
      py-1
      rounded
      hover:bg-red-600
    "
            >
              Delete Section
            </button>

            {section.elements.map((element: any) => (
              <div
                key={element.id}
                onMouseDown={(e) => startMove(e, section.id, element.id)}
                style={{
                  gridColumn: `${element.colStart} / span ${element.colSpan}`,
                  gridRow: `${element.rowStart} / span ${element.rowSpan}`,
                }}
                className={`
  group relative text-sm
  ${
    activeElement?.sectionId === section.id &&
    activeElement?.elementId === element.id
      ? "border p-2 bg-gray-50 shadow cursor-move"
      : "border-none bg-transparent p-0"
  }
`}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // move / resize ruk jaaye
                    deleteElement(section.id, element.id);
                  }}
                  className="
    absolute -top-2 -right-2
    hidden group-hover:flex
    items-center justify-center
    w-6 h-6
    rounded-full
    bg-red-500 text-white text-xs
    hover:bg-red-600
    shadow
  "
                >
                  ✕
                </button>

                {element.type === "text" && (
                  <p
                    contentEditable
                    suppressContentEditableWarning

                        style={{
      color: element.style?.color,
      fontSize: element.style?.fontSize,
      fontWeight: element.style?.fontWeight,
      fontStyle: element.style?.fontStyle,
      textDecoration: element.style?.textDecoration,
      margin: element.style?.margin,
      padding: element.style?.padding,
    }}
                    onMouseDown={(e) => {
                      // sirf typing ke liye
                      if (document.activeElement === e.currentTarget) {
                        e.stopPropagation();
                      }
                    }}
                    onFocus={() =>
                      setActiveElement({
                        sectionId: section.id,
                        elementId: element.id,
                      })
                    }
                    className="outline-none cursor-text
      h-full
      max-h-full
      overflow-y-auto
      whitespace-pre-wrap
      break-words"
                  onBlur={(e) => {
  if (!activeElement) return; // ✅ FIX (MOST IMPORTANT)

  const html = e.currentTarget.innerHTML;
  const text = e.currentTarget.innerText;

  setSections((prev) =>
    prev.map((section) =>
      section.id === activeElement.sectionId
        ? {
            ...section,
            elements: section.elements.map((el) =>
              el.id === activeElement.elementId
                ? {
                    ...el,
                    html,
                    text,
                  }
                : el
            ),
          }
        : section
    )
  );
}}

                  >
                    {element.text}
                  </p>
                )}
{element.type === "button" && (
  <button 
    style={{
      color: element.style?.color,
          
      fontSize: element.style?.fontSize,
      fontWeight: element.style?.fontWeight,
      fontStyle: element.style?.fontStyle,
      margin: element.style?.margin,
      padding: element.style?.padding,
    }}
    className="btn btn-primary w-full"
    onMouseDown={(e) => {
      e.stopPropagation();
      setActiveElement({
        sectionId: section.id,
        elementId: element.id,
      });
    }}
  >
    {element.text || "Button"}
  </button>
)}

                {element.type === "image" && (
                  <div className="relative w-full h-full">
                    <Image
                      src={element.src || "/placeholder.png"}
                      alt="Dropped Image"
                      fill
                      className="object-cover"
                      draggable={false}
                    />
                  </div>
                )}

                {activeElement?.sectionId === section.id &&
                  activeElement?.elementId === element.id && (
                    <div
                      className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500 cursor-se-resize"
                      onMouseDown={(e) =>
                        startResize(e, section.id, element.id)
                      }
                    />
                  )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
