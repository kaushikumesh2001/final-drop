export default function SectionItem() {
    return (
        <div>
<div         className="w-24 mt-2 border-2 rounded-2xl border-blue-600 
                   hover:bg-blue-100 cursor-grab active:cursor-grabbing
                   text-center shadow-sm hover:shadow-md transition">
<p 
draggable
onDragStart={(e) =>
{
    e.dataTransfer.setData(
        "component",    // key name is "component" and when we drop it we can retrieve this data using this key name
        JSON.stringify({
            kind:"section",
            sectionType:"single",

        })
    )
}
}

className="font-medium  text-blue-700">Section</p>
</div>
</div>
    )}