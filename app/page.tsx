"use client";

import { useState } from "react";
import Mainbar from "./components/Mainbar";
import Sidebar1 from "./components/Sidebar1";
import Sidebar2 from "./components/Sidebar2";

export default function BuilderPage() {
  const [sections, setSections] = useState<any[]>([]);          //complete page structure  setsection-style chnge elemennt add delete
  const [activeElement, setActiveElement] = useState<any>(null);

  const openPreview = () => {
  localStorage.setItem(
    "builderPreview",
    JSON.stringify(sections)
  );

  window.open("/preview", "_blank");
};


 const onStyleChange = (key: string, value: any) => {     //Right sidebar se jab color width padding change hoe hai to ye function call hota hai
  if (!activeElement) return; //no element select mainly use for errors preventation

  setSections((prev) => //state ko directly modify nhi karna --isliye previous state copy krke update karte hai
    prev.map((section) => {
      if (section.id !== activeElement.sectionId) return section; //agar active element ka section nhi h tom usse change mt kro

      return {
        ...section,
        elements: section.elements.map((el) => {
          if (el.id !== activeElement.elementId) return el;  //sirf selected element ko update karna hai

          //  IMAGE SRC SPECIAL CASE
          if (key === "src") {
            return {
              ...el,
              src: value,
            };
          }

          //  NORMAL STYLE UPDATE
          return {
            ...el,
            style: {
              ...el.style,
              [key]: value,
            },
          };
        }),
      };
    })
  );
};


const applyTextColor = (color: string) => { //selected text ka color change krne k liye
  const selection = window.getSelection();  //user ne jo text select kiya hai uska refrence milta hai
  if (!selection || selection.rangeCount === 0) return;
  if (selection.isCollapsed) return; //khuch select nhi h to apply nhi karna 

  document.execCommand("styleWithCSS", false, "true");  //browser ko bolta hai css k through style lagao
  document.execCommand("foreColor", false, color);  //selected text ka color badlo
};

const applyBold = () => {
  document.execCommand("bold");
};


const applyItalic = () => {
  document.execCommand("italic");
};

const applyUnderline = () => {
  document.execCommand("underline");
};






const applyFontSize = (size: number) => {
  const selection = window.getSelection();
  if (!selection || selection.isCollapsed) return;

  document.execCommand("styleWithCSS", false, "true");
  document.execCommand("fontSize", false, "7"); // browser sirf 1-7 values accept karta hai 

  // 🔧 fontSize=7 ko REAL px me convert
  const spans = document.querySelectorAll("font[size='7']");
  spans.forEach((el: any) => {
    el.removeAttribute("size");
    el.style.fontSize = `${size}px`;
  });
};



  const activeStyle = (() => {       //Right sidebar ko sirf active element ka style chaiye
    if (!activeElement) return null;  //koi selection nhi---style bi nhi

    const section = sections.find(
      (s) => s.id === activeElement.sectionId   //Active element ka section dhoondhna
    );
    if (!section) return null;

    const element = section.elements.find(   //Us section k ander active element
      (el) => el.id === activeElement.elementId
    );

    return element?.style ?? null;
  })();



  const activeFullElement = (() => {
  if (!activeElement) return null;

  const section = sections.find(
    (s) => s.id === activeElement.sectionId
  );
  if (!section) return null;

  return section.elements.find(
    (el) => el.id === activeElement.elementId
  );
})();


  return (
    <div className="flex h-160 ">
      <div className="col-span-2 border-r p-2">
        <Sidebar1
         onPreview={openPreview} />
      </div>

      <div className="col-span-8 p-2 w-full border-r">
        <Mainbar
          sections={sections}
          setSections={setSections}
          activeElement={activeElement}
          setActiveElement={setActiveElement}
        
        />
      </div>

      <div className="col-span-2 p-2">
        <Sidebar2
          activeStyle={activeStyle}
          onStyleChange={onStyleChange}
           onTextColor={applyTextColor}

           onBold={applyBold}
            onItalic={applyItalic}
  onUnderline={applyUnderline}
  onFontSize={applyFontSize}
  activeFullElement={activeFullElement} 
activeElement={activeElement}     // ✅ REQUIRED
  setSections={setSections}         // ✅ REQUIRED
  setActiveElement={setActiveElement} // ✅ REQUIRED
          
        />
      </div>
    </div>
  );
}
