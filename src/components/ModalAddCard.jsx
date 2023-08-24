/* eslint-disable react/prop-types */
import { Modal, Form, Input, Select, Space, Avatar } from 'antd';
import { useForm } from 'antd/es/form/Form';

const { TextArea } = Input;

// context
import { useTodoContext } from '../context/TodoContext'

function ModalAddCard() {

  const { modalAddCard, setModalAddCard, handleAddTodoList } = useTodoContext();

  const [form] = useForm();

  const handleMemberSelectedChange = (value) => {
    console.log(`Selected: ${value}`);
  };

  const onFinish = (values) => {
    form.resetFields();
    handleAddTodoList(values);
    _handleClose();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleStatusChange = (value) => {
    console.log(`selected ${value}`);
  };

  function _handleClose() {
    setModalAddCard(prevState => ({
      ...prevState,
      listId: null,
      isOpen: false
    }))
  }

  return (
    <>
      <Modal title="Add Card" open={modalAddCard.isOpen} onOk={form.submit} onCancel={_handleClose}>
        <Form
          name="basic"
          form={form}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            title: '',
            description: '',
            member: undefined,
            status: 'new'
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: 'Please input title!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: 'Please input description!',
              },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item
            name="member"
            label="Member"
            rules={[
              {
                required: true,
                message: 'Please input your member!',
              },
            ]}
          >
            <Select
              mode="multiple"
              size="middle"
              placeholder="Please select"
              onChange={handleMemberSelectedChange}
              style={{
                width: '100%',
              }}
              options={[
                {
                  value: 'Quy',
                  label: (
                    <>
                      <Space direction="vertical" size={16}>
                        <Space wrap size={16}>
                          <Avatar src="https://scontent.fhan4-3.fna.fbcdn.net/v/t39.30808-6/257251316_2993280940925497_4610702016163438599_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=WMl8o18cmGYAX_1bPcI&_nc_ht=scontent.fhan4-3.fna&oh=00_AfCYM57_7140W8mYSJMUy9ecmGmlG26V3vPOO7KFbf8QHw&oe=64EB47FD" />
                        </Space>
                      </Space>
                      <span>Quy Vu Van</span>
                    </>
                  ),
                },
                {
                  value: 'Lucy',
                  label: (
                    <>
                      <Space direction="vertical" size={16}>
                        <Space wrap size={16}>
                          <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxG7Yll-Mqdj3Ce_9XfWDQ3qqvNTpEX82IeQ&usqp=CAU" />
                        </Space>
                      </Space>
                      <span>Lucy</span>
                    </>
                  ),
                },
                {
                  value: 'Tom',
                  label: (
                    <>
                      <Space direction="vertical" size={16}>
                        <Space wrap size={16}>
                          <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvmI2RMfPSRXyXnYQYtF3tdjvwF4x2HnZH29Q-MjH0i3Ly-UAahLK3rq_mIEwcomCFNxk&usqp=CAU" />
                        </Space>
                      </Space>
                      <span>Tom</span>
                    </>
                  ),
                },
              ]}
            />

          </Form.Item>


          <Form.Item
            name="status"
            label="Status" >
            <Select
              style={{ width: 120 }}
              onChange={handleStatusChange}
              options={[
                { value: 'New', label: 'New' },
                { value: 'In-process', label: 'In process' },
                { value: 'Done', label: 'Done' },
              ]}
            />
          </Form.Item>


        </Form>
      </Modal >
    </>
  )
}

export default ModalAddCard