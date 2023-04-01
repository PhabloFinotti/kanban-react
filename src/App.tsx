import { useEffect, useState } from 'react';
import { data } from './assets/cards-data';
import Column from './components/Column'
import {CardProps, Status} from './interfaces'

const typeStatus: Status[] = ['todo', 'doing', 'done']

function App() {
  const [isDragging, setIsDragging] = useState(false);
  const [listItems, setListItems] = useState<CardProps[]>(data);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredListItems, setFilteredListItems] = useState<CardProps[]>(data);

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

  useEffect(() => {
    if(searchTerm.length){
      const arrItems = listItems.filter(
        item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
      console.log(filteredListItems)
      setFilteredListItems(arrItems)
    }else{
      setFilteredListItems(listItems)
    }
  }, [searchTerm])

  return (
    <div className="h-screen bg-white text-black p-10 flex flex-col gap-y-5">
      <div className="flex items-end gap-4">
        <h1 className='text-4xl font-light'>Phablo's Kanban</h1>
        <input
          type="text"
          placeholder="Procurar por Cards"
          className='bg-gray-100 border outline-none py-1 px-2 rounded-lg transition focus:w-[350px] focus:ring-2 focus:ring-indigo-600 ring-offset-2'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
        


      <div className='flex flex-1 gap-x-5'>
        {typeStatus.map(status => (
          <Column
            key={status} 
            status={status} 
            items={filteredListItems}  // Passar os itens filtrados

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
