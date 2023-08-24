/* eslint-disable react/prop-types */

import PropTypes from 'prop-types'; // ES6
import { EditOutlined, DeleteOutlined, FileTextOutlined, AntDesignOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Tooltip } from 'antd';
import { Draggable } from 'react-beautiful-dnd';
import { useTodoContext } from '../context/TodoContext';
import ModalCardDetail from './ModalCardDetail';
import { useState } from 'react';
import ModalEditCard from './ModalEditCard';

const { Meta } = Card;

function CardItem({ card, index, listId }) {
  const { handleDeleteCard } = useTodoContext();

  const [detailModalVisible, setDetailModalVisible] = useState(false);

  const [editModalVisible, setEditModalVisible] = useState(false);

  const openEditModal = () => {
    setEditModalVisible(true);
  };

  const closeEditModal = () => {
    setEditModalVisible(false);
  };

  const _handleDeleteCard = () => {
    handleDeleteCard(listId, card.id);
  };

  const openDetailModal = () => {
    setDetailModalVisible(true);
  };

  const closeDetailModal = () => {
    setDetailModalVisible(false);
  };

  return (
    <>
      <Draggable draggableId={String(card.id)} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className='card'
          >
            <Card
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
              actions={[
                <Tooltip placement="top" title='View' key='view'>
                  <FileTextOutlined key="view" onClick={openDetailModal} />
                </Tooltip>,

                <Tooltip placement="top" title='Edit' key='edit'>
                  <EditOutlined key="edit" onClick={openEditModal} />
                </Tooltip>,

                <Tooltip placement="top" title='Delete' key='delete'>
                  <DeleteOutlined key="delete" onClick={_handleDeleteCard} />
                </Tooltip>,
              ]}
            >
              <Meta
                title={card.title}
                description={card.description}
              />
              <div className='avatarGroup'>
                <Avatar.Group
                  maxCount={2}
                  maxPopoverTrigger="click"
                  size="large"
                  maxStyle={{
                    color: '#f56a00',
                    backgroundColor: '#fde3cf',
                    cursor: 'pointer',
                  }}
                >
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  <Avatar
                    style={{
                      backgroundColor: '#f56a00',
                    }}
                  >
                    K
                  </Avatar>
                  <Tooltip title="Ant User" placement="top">
                    <Avatar
                      style={{
                        backgroundColor: '#87d068',
                      }}
                      icon={<UserOutlined />}
                    />
                  </Tooltip>
                  <Avatar
                    style={{
                      backgroundColor: '#1677ff',
                    }}
                    icon={<AntDesignOutlined />}
                  />
                </Avatar.Group>
              </div>
            </Card>
            <ModalCardDetail
              cardId={card.id}
              visible={detailModalVisible}
              onClose={closeDetailModal}
            />
            <ModalEditCard
              card={card}
              visible={editModalVisible}
              onClose={closeEditModal}
            />
          </div>
        )}
      </Draggable>
    </>
  )
}

export default CardItem

CardItem.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.description
  })
}