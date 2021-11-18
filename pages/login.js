import { Card, Form, Input, Button, Alert } from 'antd'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'


import { login, loginCleanup } from '../store/actions/login'

const Login = () => {
    const dispatch = useDispatch()
    const loginState = useSelector(s => s.login)
    const router = useRouter()
    const [error, setError] = useState(null)

    const onFinish = (values) => {
        if (error) {
            setError(null)
        }
        dispatch(login(values))
    }

    useEffect(() => {
        if (loginState.isSuccessful) {
            router.push('/')
            dispatch(loginCleanup())
        } else if (loginState.error) {
            setError(loginState.error)
            dispatch(loginCleanup())
        }
    }, [loginState])

    return (
    <div className="login">
        <Card
            style={{ width: '70%' }}
            title='Login'
        >
            <p>You can login you account here</p>
            <Form
            name="basic"
            laelCol={{ span: 8 }}
            wrapper={{ span: 16 }}
            onFinish={onFinish} 
            >
                {
                    error && <Alert message={error} closable type='error' />
                }
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                            {
                            required: true,
                            message: "please input an email",
                            },
                            {
                            type: "email",
                            message: "Enter a valid email",
                            },
                        ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter a password'
                        },
                        {
                            min: 8,
                            message: 'Please enter at least 8 characters'
                        }
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">Login</Button>
                </Form.Item>
            </Form>
            <p>Don't have an account? Register <Link href='/register'><a>here</a></Link></p>
        </Card> 
    </div>
    
)}

export default Login
