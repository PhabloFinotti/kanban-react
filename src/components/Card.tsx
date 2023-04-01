import {clsx} from 'clsx';
import { CardProps } from '../interfaces';

interface Props{
  content: CardProps;
  handleDragging: (dragging: boolean) => void;
}

export default function Card({content, handleDragging}: Props){

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text', `${content.id}`)
    handleDragging(true)
  }

  const handleDragEnd = () => handleDragging(false)
  
  return (
    <div
      draggable="true"
      className={clsx('bg-indigo-200 text-indigo-600 rounded-xl min-h-[100px] p-4 shadow flex flex-col justify-center transition hover:bg-indigo-300 hover:cursor-grab',{
        
      })}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <h3 className="text-lg font-semibold mb-1">{content.title}</h3>
      <p>{content.content}</p>
    </div>
  )
}