import { useEffect, useState } from "react";
import Card from "./Card";
import clsx from "clsx";
import { CardProps, Status } from "../interfaces";

interface ColumProps {
  items: CardProps[];
  status: Status;

  isDragging: boolean;
  handleDragging: (dragging: boolean) => void;
  handleUpdateList: (id: number, status: Status) => void;
  handleFavoriting: (id: number) => void
}

export default function Column({items, status, isDragging, handleDragging, handleUpdateList, handleFavoriting}: ColumProps){
  const [isDraggingOver, setIsDraggingOver] = useState(false)

  const handleDragEnter = () => {
    setIsDraggingOver(true)
  }
  const handleDragLeave = () => {
    setIsDraggingOver(false)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDraggingOver(true)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const id = Number(e.dataTransfer.getData('text'))

    handleUpdateList(id, status)
    handleDragging(false)
    setIsDraggingOver(false)
  }

  return (
    <div 
      className={clsx( 
      "w-[350px] h-full flex flex-col rounded-lg p-4 border-2", {
        'bg-gray-100 border-gray-200': !isDraggingOver,
        'bg-gray-200 border-gray-400 border-dashed cursor-copy': isDraggingOver
      })}

      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <h2 className="text-2xl font-bold">{status.charAt(0).toUpperCase() + status.slice(1)}</h2>
      <div className="mt-4 flex flex-col gap-y-3" >
        {items.map(card => (
          status === card.status &&
          <Card
            key={card.id} 
            content={card} 
            handleDragging={handleDragging}
            handleFavoriting={handleFavoriting}
          />
        ))}
      </div>
    </div>
  )
}