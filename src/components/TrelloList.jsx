/* eslint-disable react/prop-types */
import { Card, Button, Tooltip } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Draggable, Droppable } from 'react-beautiful-dnd';

// compoents
import CardItem from './CardItem';

function TrelloList({ index, listId, title, cards, setModalAddCard, handleDeleteList }) {

  function _handleOpenModalAddCard() {
    setModalAddCard(prevState => ({
      ...prevState,
      listId,
      isOpen: true
    }))
  }

  function _handleDeleteList() {
    handleDeleteList(listId);
  }

  return (
    <Draggable draggableId={String(listId)} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className='todoList'
        >
          <Droppable droppableId={String(listId)} type="CARD">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <Card
                  className="cardList"
                  title={title}
                  extra={
                    <>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <Tooltip placement="top" title="Add a card">
                          <Button shape="circle" icon={<PlusOutlined />} onClick={_handleOpenModalAddCard} />
                        </Tooltip>
                        <Tooltip placement="top" title="Delete this list">
                          <Button shape="circle" icon={<DeleteOutlined />} onClick={_handleDeleteList} />
                        </Tooltip>
                      </div>
                    </>
                  }
                  style={{
                    width: 300,
                  }}
                >
                  {cards.map((card, cardIndex) => {
                    return (
                      <CardItem
                        key={card.id}
                        card={card}
                        index={cardIndex}
                        listId={listId}
                      />
                    )
                  })}

                  {provided.placeholder}
                </Card>
              </div>

            )}
          </Droppable>

        </div>
      )}
    </Draggable>

  )
}

export default TrelloList