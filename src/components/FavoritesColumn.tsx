import { CardProps } from "../interfaces";
import Card from "./Card";

interface Props {
  items: CardProps[];

  handleFavoriting: (id: number) => void;

  handleIsModalOpen: (modalState: boolean) => void;
  handleModalContent: (modalContent: CardProps) => void;
}

export default function FavoritesColumn({items, handleFavoriting, handleIsModalOpen, handleModalContent}: Props){
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
              
              handleFavoriting={handleFavoriting}
              
              handleIsModalOpen={handleIsModalOpen}
              handleModalContent={handleModalContent}
            />
          ))}
      </div>
    </div>
  )
}