import {clsx} from 'clsx';
import { CardProps } from '../interfaces';
import {Star} from '@phosphor-icons/react'

interface Props{
  content: CardProps;
  handleDragging: (dragging: boolean) => void;
  handleFavoriting: (id: number) => void;
}

export default function Card({content, handleDragging, handleFavoriting}: Props){
  const starWeight = content.isFavorite ? 'fill' : undefined;

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text', `${content.id}`)
    handleDragging(true)
  }

  const handleDragEnd = () => handleDragging(false)
  
  return (
    <div
      draggable="true"
      className="relative bg-indigo-200 text-indigo-600 rounded-xl min-h-[100px] p-4 shadow flex flex-col justify-center transition hover:bg-indigo-300 hover:cursor-grab"
        
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <Star
        className='absolute top-2 right-2 cursor-pointer' 
        size={20} 
        weight={starWeight}
        onClick={() => handleFavoriting(content.id)}
      />
      <h3 className="text-lg font-semibold mb-1">{content.title}</h3>
      <p>{content.content}</p>
    </div>
  )
}