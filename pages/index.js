import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row, Card, Button, Title, Text, message } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

import PrivateLayout from '../components/layouts'
import { DeleteModal, CreateModal, RestockModal } from '../components/layouts/modals'

import { getInventories, getInventoriesCleanup } from '../store/actions/inventories'
import { getMe, getMeCleanup } from '../store/actions/getMe'
import { createInventory, createInventoryCleanup } from '../store/actions/createInventory'
import { deleteInventory, deleteInventoryCleanup } from '../store/actions/deleteInventory'
import { restockInventory, restockInventoryCleanup } from '../store/actions/restockInventory'


const Home = () => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);
  const [create, setCreate] = useState(false);
  const [dlt, setDelete] = useState(false)
  const [restock, setRestock] = useState(false);
  const [deletId, setDeleteId] = useState(null);
  const [restockId, setRestockId] = useState(null);
  const [loading, setLoading] = useState(false);
  const inventoriesState = useSelector(s => s.inventories)
  const deleteState = useSelector(s => s.deleteInventory)
  const createState = useSelector(s => s.createInventory)
  const restockState = useSelector(s => s.restockInventory)
  const getMeState = useSelector(s => s.getMe)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getInventories());
    dispatch(getMe());
  }, [])

  useEffect(() => {
    if (getMeState.isSuccessful) {
      setUser(getMeState.data)
      dispatch(getMeCleanup())
    } else if (getMeState.error) {
      message.error(getMeState.error)
      dispatch(getMeCleanup())
    }
  }, [getMeState])

  useEffect(() => {
    if (createState.isLoading) {
      setLoading(true)
    } else if (createState.isSuccessful) {
      dispatch(getInventories())
      setCreate(false)
      setLoading(false)
      dispatch(createInventoryCleanup())
    } else if (createState.error) {
      message.error(createState.error)
      setLoading(false)
      dispatch(createInventoryCleanup())
    }
  }, [createState])

  useEffect(() => {
    if (restockState.isLoading) {
      setLoading(true)
    } else if (restockState.isSuccessful) {
      dispatch(getInventories())
      setLoading(false)
      setRestock(false)
      dispatch(restockInventoryCleanup())
    } else if (restockState.error) {
      message.error(restockState.error)
      setLoading(false)
      dispatch(restockInventoryCleanup())
    }
  }, [restockState])

  useEffect(() => {
    if (deleteState.isLoading) {
      setLoading(true)
    } else if (deleteState.isSuccessful) {
      dispatch(getInventories())
      setLoading(false)
      setDelete(false)
      dispatch(deleteInventoryCleanup())
    } else if (deleteState.error) {
      message.error(deleteState.error)
      setLoading(false)
      dispatch(deleteInventoryCleanup())
    }
  }, [deleteState])

  useEffect(() => {
    if (inventoriesState.isSuccessful) {
      console.log(inventoriesState.data)
      setData(inventoriesState.data)
      dispatch(getInventoriesCleanup())
    } else if (inventoriesState.error) {
      message.error(inventoriesState.error)
      dispatch(getInventoriesCleanup())
    }
  }, [inventoriesState])

  const showCreateInventory = () => {
    setCreate(true);
  }

  const showRestockInventory = (id) => {
    setRestockId(id)
    setRestock(true);
  }

  const showDeleteModal = (id) => {
    setDeleteId(id)
    showDelete(true);
  }

  const restockAction = (value) => {
    dispatch(restockInventory({...value, restockId}))
  }

  const deleteAction = () => {
    dispatch(deleteInventory(deleteId))
  }

  const createAction = (value) => {
    dispatch(createInventory(value))
  }

  return (
    <PrivateLayout>
      { user && <>
      <div className="user-details">
        <div>
          <h2>Welcome, {user.name} </h2>
          <p>{user.role}</p>
        </div>
        {
          user.role === 'admin' && <Button type="secondary" onClick={showCreateInventory}>Create Inventory</Button>
        }

      </div>
      
      <div>
        <Row gutter={16}>
          { user.role === 'admin' ?
            data.map(inventory => (
              <Col key={inventory._id} span={8}>
                <Card 
                  title={inventory.name} 
                  bordered={false}
                  actions={[
                    <EditOutlined key='restock' onClick={()=>showRestockInventory(inventory._id)} />,
                    <DeleteOutlined key='delele' onClick={()=>showDeleteModal(inventory._id)} />
                  ]}
                >
                  <p>Quantity: {inventory.quantity}</p>
                  <Button type="primary" size="middle">Add to Cart</Button>

                </Card>
              </Col>
            )) 
            :
            data.map(inventory => (
              <Col key={inventory._id} span={8}>
                <Card 
                  title={inventory.name} 
                  bordered={false}
                >
                  <p>Quantity: {inventory.quantity}</p>
                  <Button type="primary" size="middle">Add to Cart</Button>

                </Card>
              </Col>
            )) 
          }
        </Row>
      </div>
      </>}
      <DeleteModal show={dlt} onContinue={deleteAction} onCancel={()=>setDelete(false)} loading={loading} />
      <CreateModal show={create} onContinue={createAction} onCancel={()=>setCreate(false)} loading={loading} />
      <RestockModal show={restock} onContinue={restockAction} onCancel={()=>setRestock(false)} loading={loading} />
    </PrivateLayout>
  )
}

export default Home
