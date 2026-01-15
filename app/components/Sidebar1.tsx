"use client"

import Button from "../Elements/button";
import ImageBuilder from "../Elements/image";
import SectionItem from "../Elements/Section";
// import Image from "../Elements/image";
import Text from "../Elements/text";
export default function Sidebar1({
  onPreview,
}: {
  onPreview: () => void;
}) {

    return (
        <div  className="w-28 h-screen overflow-y-auto ">
            <span className="  font-bold ">
Elements
</span>
<Text />

<Button />
<ImageBuilder />
<SectionItem/>

{/* 🔥 PREVIEW BUTTON */}
      <button
        onClick={onPreview}
        className="mt-4 w-full bg-blue-600 text-white text-sm py-2 rounded hover:bg-blue-700"
      >
        Preview
      </button>

        </div>
    )}