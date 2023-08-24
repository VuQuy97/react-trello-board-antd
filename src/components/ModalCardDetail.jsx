import React from 'react';
import { Modal, Typography } from 'antd';
import { useTodoContext } from '../context/TodoContext';
import { List } from 'antd'
import { ContactsTwoTone, FileTextTwoTone, PushpinTwoTone } from '@ant-design/icons';


const { Text } = Typography;

// eslint-disable-next-line react/prop-types
function ModalCardDetail({ cardId, visible, onClose }) {
  const { todos } = useTodoContext();
  const card = todos.cards[cardId];

  console.log('card', card)

  return (
    <Modal
      title={card.title}
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <div className='description'>
        <FileTextTwoTone style={{ fontSize: '16px', marginRight: '10px' }} />
        <Text strong >Description:</Text>
        <br />
        <div style={{ marginTop: "10px", marginLeft: "30px" }}>
          <Text >{card.description}</Text>
        </div>
      </div>

      <div className='member' style={{ marginTop: "10px" }}>
        <ContactsTwoTone style={{ fontSize: '16px', marginRight: '10px' }} />
        <Text strong >Member:</Text>
        <br />
        <div style={{ marginTop: "10px", marginLeft: "30px" }}>
          <Text>{card.member.join(', ')}</Text>
        </div>
      </div>

      <div className='status' style={{ marginTop: "10px" }}>
        <PushpinTwoTone style={{ fontSize: '16px', marginRight: '10px' }} />
        <Text strong >Status:</Text>
        <br />
        <div style={{ marginTop: "10px", marginLeft: "30px" }}>
          <Text >{card.status}</Text>
        </div>
      </div>

    </Modal>
  );
}

export default ModalCardDetail;
