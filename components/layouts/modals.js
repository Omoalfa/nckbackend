import { Modal, Button, Form, Input, Alert, InputNumber } from 'antd';


export const DeleteModal = ({ show, onContinue, onCancel, loading }) => (
    <Modal
        title="Delete Inventory"
        visible={show}
        onOk={onContinue}
        onCancel={onCancel}
        confirmLoading={loading}
    >
        <p>Are you sure you want to delete this Inventory?</p>
    </Modal>
)

export const RestockModal = ({ show, onContinue, onCancel, loading }) => {
    return (
        <Modal
            title="Restock Inventory"
            visible={show}
            footer={null}
            confirmLoading={loading}
        >
            <Form
            name="basic"
            laelCol={{ span: 8 }}
            wrapper={{ span: 16 }}
            onFinish={onContinue} 
            >
                <Form.Item
                    name="quantity"
                    label="Quantity"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter your name'
                        },
                        {
                            type: 'number',
                            message: 'Please enter a valid quantity'
                        },
                        {
                            min: 1,
                            message: 'you cannot add less than 1'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">Restock</Button>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="secondary" onClick={onCancel}>Cancel</Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export const CreateModal = ({ show, onContinue, onCancel, loading }) => (
    <Modal
        title="Restock Inventory"
        visible={show}
        footer={null}
        confirmLoading={loading}
    >
        <Form
        name="basic"
        laelCol={{ span: 8 }}
        wrapper={{ span: 16 }}
        onFinish={onContinue} 
        >
            <Form.Item
                name="name"
                label="Name"
                rules={[
                    {
                        required: true,
                        message: 'Please enter your name'
                    },
                    {
                        min: 2,
                        message: 'should have at least two character'
                    }
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="quantity"
                label="Quantity"
                rules={[
                    {
                        required: true,
                        message: 'Please the quantity of inventory available'
                    },
                ]}
            >
                <InputNumber />
            </Form.Item>
            <Form.Item
                name="price"
                label="Price"
                rules={[
                    {
                        required: true,
                        message: 'Please enter your name'
                    },
                ]}
            >
                <InputNumber />
            </Form.Item>
            
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">Create</Button>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="secondary" onClick={onCancel}>Cancel</Button>
            </Form.Item>
        </Form>
    </Modal>
)
