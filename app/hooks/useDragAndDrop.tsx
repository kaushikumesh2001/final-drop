"use client";
import { useState } from "react";

export default function useDragAndDrop() {
  const [dragData, setDragData] = useState(null);

  // When dragging starts
  const handleDragStart = (data) => (e) => {
    setDragData(data);   //dragged element ko data state me save krta hai
    e.dataTransfer.setData("component", JSON.stringify(data));
  }; //it tells browser what we drag

  // Allow drop because default behaviour me drop allow nhi hota
  const allowDrop = (e) => {
    e.preventDefault();
  };

  // When dropped on target call the callback function
  const handleDrop = (callback) => (e) => {
    e.preventDefault();
    const raw = e.dataTransfer.getData("application/custom");  //Browser se drag data niklane ki kosis krta hai taaki hame drop k tym pta ho konsa component gira hai

    const data = raw ? JSON.parse(raw) : dragData;

    // Return drop position
    const rect = e.currentTarget.getBoundingClientRect(); //jha element drop hua h uski position,width or height niklta hai
    const x = e.clientX - rect.left; //mouse ki x position nikalta hai element k inside se

    const y = e.clientY - rect.top;//ye Y position nikalata hai

    callback({ data, x, y }); //main component ko bhejta hai konsa element drop hua hai 
    //because  element add ho position fix ho 
  };

  return {  //hooks se function bhar deta hai
    handleDragStart,
    allowDrop,
    handleDrop,
  };
}
