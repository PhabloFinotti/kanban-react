import { useState } from 'react';
import { data } from './assets/cards-data';
import Column from './components/Column'
import {CardProps, Status} from './interfaces'

const typeStatus: Status[] = ['todo', 'doing', 'done']

function App() {
  const [isDragging, setIsDragging] = useState(false);
  const [listItems, setListItems] = useState<CardProps[]>(data)

  const handleDragging = (dragging: boolean) => setIsDragging(dragging);

  const handleUpdateList = (id: number, status: Status) => {
    let card = listItems.find(item => item.id === id)

    if(card && card.status !== status){
      card.status = status;

      setListItems(prev => ([
          ...prev.filter(item => item.id !== id),
          card!
        ]
      ))
    }
  }

  return (
    <div className="h-screen bg-white text-black p-10 flex flex-col gap-y-5">
      <h1 className='text-4xl font-light'>Phablo's Kanban</h1>
      <div className='flex flex-1 gap-x-5'>
        {typeStatus.map(status => (
          <Column
            key={status} 
            status={status} 
            items={listItems} 

            isDragging={isDragging}
            handleDragging={handleDragging}
            handleUpdateList={handleUpdateList}
          />
        ))}
      </div>
    </div>
  )
}

export default App
