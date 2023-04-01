import { useEffect, useState } from "react";
import Card from "./Card";
import clsx from "clsx";
import { CardProps, Status } from "../interfaces";

interface ColumProps {
  status: Status;
  items: CardProps[];

  isDragging: boolean;
  handleDragging: (dragging: boolean) => void;
  handleUpdateList: (id: number, status: Status) => void
}

export default function Column({status, items, isDragging, handleDragging, handleUpdateList}: ColumProps){
  const [searchTerms, setSearchTerms] = useState('')
  const [isDraggingOver, setIsDraggingOver] = useState(false)
  const [cardItems, setCardItems] = useState<CardProps[]>(items)

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
  
  const handleColumnSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerms(e.currentTarget.value)
  }

  useEffect(() => {
    if(searchTerms.length > 0){
      setCardItems(cardItems.filter(item => item.title.toLowerCase().includes(searchTerms.toLowerCase()))) 
    }else{
      setCardItems(items)
    }
  }, [searchTerms])

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
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{status.charAt(0).toUpperCase() + status.slice(1)}</h2>
        <input className="bg-white border rounded-lg p-1" type="text" onInput={handleColumnSearch} />
      </div>
      <div className="mt-4 flex flex-col gap-y-3" >
        {cardItems.map(card => (
          status === card.status &&
          <Card
            key={card.id} 
            content={card} 
            handleDragging={handleDragging}
          />
        ))}
      </div>
    </div>
  )
}