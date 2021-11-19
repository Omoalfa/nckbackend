import { useEffect } from 'react'
import { useRouter } from 'next/router';
import { Layout, Badge, message } from 'antd';
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingCartOutlined, ClearOutlined, LogoutOutlined } from '@ant-design/icons'

import { clearCart, clearCartCleanup } from '../../store/actions/clearCart'
import { getMe } from '../../store/actions/getMe'

import logo from '../../logo.png';

const { Content, Footer } = Layout;

const ProtectedLayout = ({children, cart}) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const cartState = useSelector(s => s.clearCart)

    const logoutAction = () => {
        localStorage.removeItem('authToken');

        router.push('/login');
    }

    const clearCartAction = () => {
        dispatch(clearCart())
    }

    useEffect(() => {
        if (cartState.isSuccessful) {
            message.success('Cart cleared successfully')
            dispatch(clearCartCleanup())
            dispatch(getMe())
        } else if (cartState.error) {
            message.error(cartState.error)
            dispatch(clearCartCleanup())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cartState])
    
    useEffect(() => {
        const token = localStorage.getItem('authToken')

        if (!token) {
            router.push('/login')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Layout className="layout">
            <header className="header">
            <div className="logo">
                <Image src={logo} alt='NCK' />
                <ul className="navbar">
                    <li key="1" disabled>
                        <Badge count={cart.length}>
                            <ShoppingCartOutlined style={{fontSize: '30px'}}/> My Cart
                        </Badge>
                    </li>
                    <li key="2" onClick={logoutAction}>
                        <LogoutOutlined style={{fontSize: '30px'}}/> Log Out
                    </li>
                    <li key="3" onClick={clearCartAction}>
                        <ClearOutlined style={{fontSize: '30px'}}/> Clear My Cart
                    </li>
                </ul>
            </div>
            
            </header>
            <Content style={{ padding: '0 50px' }}>
                <div>{children}</div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                <p>
                    NCK Backend Test Solution by <a href="mailto:engr.omoalfa@gmail.com">engr.omoalfa@gmail.com</a>
                </p>
                <p>Name: AbdulQuadri Sanni</p>
            </Footer>
        </Layout>
    )
}

export default ProtectedLayout;
