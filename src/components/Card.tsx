import {clsx} from 'clsx';
import { CardProps } from '../interfaces';
import {Star} from '@phosphor-icons/react'
import { useState } from 'react';

interface Props{
  content: CardProps;
  cardStyles?: string;
  handleFavoriting: (e: React.MouseEvent<SVGSVGElement>, id: number) => void;
  
  handleIsModalOpen: (modalState: boolean) => void;
  handleModalContent: (modalContent: CardProps) => void;
}

export default function Card({content, cardStyles = '', handleFavoriting, handleIsModalOpen, handleModalContent}: Props){
  const starWeight = content.isFavorite ? 'fill' : undefined;

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text', `${content.id}`)
  }


  const handleClick = () => {
    handleIsModalOpen(true)
    handleModalContent(content)
  }

  const DEFAULT_STYLE = "relative rounded-xl min-h-[100px] p-4 shadow flex flex-col justify-center transition hover:cursor-grab"
  const cardFinalStyle = cardStyles || "bg-indigo-200 text-indigo-600 hover:bg-indigo-300 "

  return (
    <div
      draggable="true"
      className={`${cardFinalStyle}  ${DEFAULT_STYLE}`}
        
      onDragStart={handleDragStart}
      onClick={handleClick}
    >
      <Star
        className='absolute top-2 right-2 cursor-pointer' 
        size={20} 
        weight={starWeight}
        onClick={(e: React.MouseEvent<SVGSVGElement>) => handleFavoriting(e, content.id)}
      />
      <h3 className="text-lg font-semibold mb-1">{content.title}</h3>
      <p>{content.content}</p>
    </div>
  )
}