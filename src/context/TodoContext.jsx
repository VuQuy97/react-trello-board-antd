/* eslint-disable react/prop-types */
import React from 'react';

// mocks
import { data } from '../mocks/data'

const TodoContext = React.createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = React.useState(data);
  const [modalAddCard, setModalAddCard] = React.useState({
    listId: null,
    values: null,
    isOpen: false,
  })

  function handleDeleteCard(listId, cardId) {
    setTodos((prevState) => {
      const updatedLists = { ...prevState.lists };
      const updatedCards = { ...prevState.cards };

      // Remove card from the list's cards array
      updatedLists[listId].cards = updatedLists[listId].cards.filter((id) => id !== cardId);

      // Delete the card
      delete updatedCards[cardId];

      return {
        ...prevState,
        lists: updatedLists,
        cards: updatedCards,
      };
    });
  }

  function handleAddTodoList(values) {
    const cardItem = {
      id: `card-${Date.now()}`,
      title: values.title,
      description: values.description,
      member: values.member,
      status: values.status,
    };
    const listId = modalAddCard.listId;

    // add card.id into list
    // add card item into cards
    setTodos(prevState => ({
      ...prevState,
      lists: {
        ...prevState.lists,
        [listId]: {
          ...prevState.lists[listId],
          cards: [...prevState.lists[listId].cards, cardItem.id]
        }
      },
      cards: {
        ...prevState.cards,
        [cardItem.id]: cardItem
      }
    }))
  }
  
  const onDragEnd = React.useCallback((result) => {
    const { destination, source, draggableId, type } = result;

    // If the destination is null or the draggable item is dropped back into its original position, do nothing
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }

    // List dragging
    if (type === 'LIST') {
      const newListOrder = Array.from(todos.columns);
      newListOrder.splice(source.index, 1);
      newListOrder.splice(destination.index, 0, draggableId);

      setTodos((prevState) => ({
        ...prevState,
        columns: newListOrder,
      }));

      return;
    }

    // Card dragging
    const startList = todos.lists[source.droppableId];
    const endList = todos.lists[destination.droppableId];

    // If the card is dropped in the same list
    if (startList === endList) {
      const newCardOrder = Array.from(startList.cards);
      newCardOrder.splice(source.index, 1);
      newCardOrder.splice(destination.index, 0, draggableId);

      const newStartList = {
        ...startList,
        cards: newCardOrder,
      };

      setTodos((prevState) => ({
        ...prevState,
        lists: {
          ...prevState.lists,
          [newStartList.id]: newStartList,
        },
      }));
    } else {
      const startCardOrder = Array.from(startList.cards);
      startCardOrder.splice(source.index, 1);

      const newStartList = {
        ...startList,
        cards: startCardOrder,
      };

      const endCardOrder = Array.from(endList.cards);
      endCardOrder.splice(destination.index, 0, draggableId);

      const newEndList = {
        ...endList,
        cards: endCardOrder,
      };

      setTodos((prevState) => ({
        ...prevState,
        lists: {
          ...prevState.lists,
          [newStartList.id]: newStartList,
          [newEndList.id]: newEndList,
        },
      }));
    }
  }, [todos]);


  return (
    <TodoContext.Provider 
      value={{
        // states
        todos,
        setTodos,
        modalAddCard,

        // actions
        handleAddTodoList,
        onDragEnd,
        setModalAddCard,
        handleDeleteCard
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}

export const useTodoContext = () => React.useContext(TodoContext);