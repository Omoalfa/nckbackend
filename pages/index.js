import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row, Card, Button, message } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

import PrivateLayout from '../components/layouts'
import { DeleteModal, CreateModal, CartModal, RestockModal } from '../components/modals'

import { getInventories, getInventoriesCleanup } from '../store/actions/inventories'
import { getMe, getMeCleanup } from '../store/actions/getMe'
import { createInventory, createInventoryCleanup } from '../store/actions/createInventory'
import { deleteInventory, deleteInventoryCleanup } from '../store/actions/deleteInventory'
import { restockInventory, restockInventoryCleanup } from '../store/actions/restockInventory'
import { addToCart, addToCartCleanup } from '../store/actions/addToCart'


const Home = () => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);
  const [create, setCreate] = useState(false);
  const [dlt, setDelete] = useState(false)
  const [restock, setRestock] = useState(false);
  const [cart, setCart] = useState(false);
  const [cartId, setCartId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [restockId, setRestockId] = useState(null);
  const [loading, setLoading] = useState(false);
  const inventoriesState = useSelector(s => s.inventories)
  const deleteState = useSelector(s => s.deleteInventory)
  const createState = useSelector(s => s.createInventory)
  const restockState = useSelector(s => s.restockInventory)
  const cartState = useSelector(s => s.addToCart)
  const getMeState = useSelector(s => s.getMe)
  const dispatch = useDispatch()
  

  useEffect(() => {
    dispatch(getInventories());
    dispatch(getMe());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (getMeState.isSuccessful) {
      setUser(getMeState.data)
      dispatch(getMeCleanup())
    } else if (getMeState.error) {
      message.error(getMeState.error)
      dispatch(getMeCleanup())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getMeState])

  useEffect(() => {
    if (createState.isLoading) {
      setLoading(true)
    } else if (createState.isSuccessful) {
      setCreate(false)
      dispatch(getInventories())
      setLoading(false)
      dispatch(createInventoryCleanup())
    } else if (createState.error) {
      message.error(createState.error)
      setLoading(false)
      dispatch(createInventoryCleanup())
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteState])

  useEffect(() => {
    if (cartState.isLoading) {
      setLoading(true)
    } else if (cartState.isSuccessful) {
      message.success('Added sucessfully')
      dispatch(getMe())
      dispatch(getInventories())
      setLoading(false)
      setDelete(false)
      dispatch(addToCartCleanup())
    } else if (cartState.error) {
      message.error(cartState.error)
      setLoading(false)
      dispatch(addToCartCleanup())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartState])

  useEffect(() => {
    if (inventoriesState.isSuccessful) {
      console.log(inventoriesState.data)
      setData(inventoriesState.data)
      dispatch(getInventoriesCleanup())
    } else if (inventoriesState.error) {
      message.error(inventoriesState.error)
      dispatch(getInventoriesCleanup())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    setDelete(true);
  }

  const showCartModal = (id) => {
    setCartId(id)
    setCart(true);
  }

  const restockAction = (value) => {
    dispatch(restockInventory({...value, restockId}))
    setRestock(false);
  }

  const deleteAction = () => {
    dispatch(deleteInventory(deleteId))
    setDelete(false)
  }

  const createAction = (value) => {
    dispatch(createInventory(value))
    setCreate(false)
  }

  const cartAction = (value) => {
    dispatch(addToCart({ ...value, _id: cartId }))
  }

  return (<>
    { user && 
    <PrivateLayout cart={user.cart}>
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
                  <p>Price: ${inventory.price}</p>
                  <Button type="primary" size="medium" onClick={()=>showCartModal(inventory._id)}>Add to Cart</Button>

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
                  <p>Price: ${inventory.price}</p>
                  <Button type="primary" size="medium" onClick={()=>showCartModal(inventory._id)}>Add to Cart</Button>

                </Card>
              </Col>
            )) 
          }
        </Row>
      </div>
      
      <DeleteModal show={dlt} onContinue={deleteAction} onCancel={()=>setDelete(false)} loading={loading} />
      <CreateModal show={create} onContinue={createAction} onCancel={()=>setCreate(false)} loading={loading} />
      <RestockModal show={restock} onContinue={restockAction} onCancel={()=>setRestock(false)} loading={loading} />
      <CartModal show={cart} onContinue={cartAction} onCancel={()=>setCart(false)} loading={loading} />
    </PrivateLayout>}</>
  )
}

export default Home
