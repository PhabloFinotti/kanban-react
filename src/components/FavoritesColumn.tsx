import { CardProps } from "../interfaces";
import Card from "./Card";

interface Props {
  items: CardProps[];

  handleDragging: (dragging: boolean) => void;
  handleFavoriting: (id: number) => void;
}

export default function FavoritesColumn({items, handleDragging, handleFavoriting}: Props){
  return (
    <div 
    className="w-[350px] flex flex-col rounded-lg p-4 border-2 bg-gray-100 border-gray-200"
    >
      <h2 className="text-2xl font-bold">Favoritos</h2>
      <div className="mt-4 flex flex-col gap-y-3" >
        {items.map(card => (
          card.isFavorite &&
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