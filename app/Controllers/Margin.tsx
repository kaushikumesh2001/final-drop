"use client";




export default function Margin({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  
  const margins = [0, 5, 10, 15, 20, 30, 40];

  

 

  return (
    <div className="border-2 p-2 rounded-3xl h-40 mb-2 mt-3 border-blue-700">
      <div className="text-center font-bold text-cyan-600 mb-2">Margin</div>

      <div className="grid grid-cols-3 gap-1">
        {margins.map((m) => (
          <button
            key={m}
              onClick={() => onChange(m)}
          
              className={`
    px-2 py-1 border rounded-md text-sm
    ${value === m ? "bg-blue-500 text-white" : "hover:bg-gray-200"}
  `}
          >
            {m}px
          </button>
        ))}
      </div>
    </div>
  );
}
