import { useEffect } from 'react'
import { useRouter } from 'next/router';
import { Layout, Menu } from 'antd';

const { Header, Content, Footer } = Layout;

const ProtectedLayout = ({children}) => {
    const router = useRouter()
    
    useEffect(() => {
        const token = localStorage.getItem('authToken')

        if (!token) {
            router.push('/login')
        }
    })

    return (
        <Layout className="layout">
            <Header>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                {new Array(15).fill(null).map((_, index) => {
                const key = index + 1;
                return <Menu.Item key={key}>{`nav ${key}`}</Menu.Item>;
                })}
            </Menu>
            </Header>
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
