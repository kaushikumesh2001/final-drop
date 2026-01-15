"use client";
const DEFAULT_TEXT = "Write!!!";
export default function Text()  
{   
    return (
        <div className="my-2">
<div         className="w-24  border-2 rounded-2xl border-blue-600 
                   hover:bg-blue-100 cursor-grab active:cursor-grabbing
                   text-center shadow-sm hover:shadow-md transition">
<p 
draggable
onDragStart={(e) =>
{

     e.dataTransfer.effectAllowed = "move";
            e.dataTransfer.setData("text/plain", "");
    e.dataTransfer.setData(
        "component",    // key name is "component" and when we drop it we can retrieve this data using this key name
        JSON.stringify({
            kind:"element",
            elementType:"text",
            text:DEFAULT_TEXT,
        })
    )
}
}

className="font-medium  text-blue-700 ">Text</p>
</div>
        </div>
    )}