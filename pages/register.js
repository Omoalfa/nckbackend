import { Card, Form, Input, Button, Alert } from 'antd'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'


import { register, registerCleanup } from '../store/actions/register'

const Register = () => {
    const dispatch = useDispatch()
    const registerState = useSelector(s => s.register)
    const router = useRouter()
    const [error, setError] = useState(null)

    const onFinish = (values) => {
        if (error) {
            setError(null)
        }
        console.log(values)
        dispatch(register(values))
    }

    useEffect(() => {
        if (registerState.isSuccessful) {
            router.push('/')
            dispatch(registerCleanup())
        } else if (registerState.error) {
            setError(registerState.error)
            dispatch(registerCleanup())
        }
    }, [registerState])

    return (
    <div className="register">
        <Card
            style={{ width: '70%' }}
            title='Register'
        >
            <p>Create your new Account</p>
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
                    name="name"
                    label="Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter your name'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
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
                <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    rules={[
                        {
                          required: true,
                          message: "Please confirm your password!",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error("The two passwords that you entered do not match!")
                            );
                          },
                        }),
                      ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">Register</Button>
                </Form.Item>
            </Form>
            <p>Already have an account? Login <Link href='/login'><a>here</a></Link></p>
        </Card> 
    </div>
    
)}

export default Register
