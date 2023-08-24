import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

// components
import ModalAddCard from './components/ModalAddCard';
import TrelloList from './components/TrelloList';

// context
import { useTodoContext } from './context/TodoContext';
import { data } from './mocks/data';

export default function App() {
  const { todos, setTodos, onDragEnd, setModalAddCard } = useTodoContext();

  function handleAddList() {

    const newListTitle = window.prompt("Enter the title of the new list:");

    if (newListTitle && newListTitle.trim() !== "") {

      const newListId = `list-${Math.random().toString(36).substr(2, 9)}`;


      const newList = {
        id: newListId,
        title: newListTitle,
        cards: [],
      };


      setTodos((prevState) => ({
        ...prevState,
        columns: [...prevState.columns, newListId],
        lists: {
          ...prevState.lists,
          [newListId]: newList,
        },
      }));
    }
  }

  //DELETE LIST 
  function handleDeleteList(listIdToDelete) {

    const updatedTodos = { ...todos };
    updatedTodos.columns = updatedTodos.columns.filter((id) => id !== listIdToDelete);
    delete updatedTodos.lists[listIdToDelete];
    setTodos(updatedTodos);
  }

console.log(todos)

  return (
    <>
      <div className="header_container">
        <div className="header_logo"></div>
        <div className="header_right">
          <div className="header_avatar">
            <img src="https://scontent.fhan4-3.fna.fbcdn.net/v/t39.30808-6/257251316_2993280940925497_4610702016163438599_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=WMl8o18cmGYAX_1bPcI&_nc_ht=scontent.fhan4-3.fna&oh=00_AfCYM57_7140W8mYSJMUy9ecmGmlG26V3vPOO7KFbf8QHw&oe=64EB47FD" alt="Avatar" />
          </div>
        </div>
      </div>

      <main>
        <div className="container">
          <DragDropContext
            onDragEnd={onDragEnd}
          >
            <Droppable droppableId="droppable" type="LIST" direction='vertical'>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  style={{
                    display: 'flex'
                  }}
                  {...provided.droppableProps}
                  className="listContainer"
                >
                  <>
                    {todos.columns.map((listId, listIndex) => {
                      const listItem = todos.lists[listId];
                      const cards = listItem.cards.map(cardId => todos.cards[cardId])
                      return (
                        <TrelloList
                          key={listItem.id}
                          index={listIndex}
                          title={listItem.title}
                          cards={cards}
                          listId={listItem.id}
                          setModalAddCard={setModalAddCard}
                          handleDeleteList={handleDeleteList}
                        />
                      )
                    })}
                  </>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

          </DragDropContext>


          <Button onClick={handleAddList} icon={<PlusOutlined />} >Add another List</Button>

        </div>
      </main>

      <ModalAddCard />

    </>
  );
}

