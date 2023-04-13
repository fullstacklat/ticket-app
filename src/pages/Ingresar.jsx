import { Button, Divider, Form, Input, InputNumber, Typography } from 'antd';
import { useNavigate, Navigate } from 'react-router-dom';
import { SaveOutlined } from '@ant-design/icons';
import { useHideMenu } from '../hooks/useHideMenu';
import { useState } from 'react';
import { getUsuarioStorage } from '../helpers/getUsuarioStorage';

export const Ingresar = () => {
    const navigate = useNavigate();
    const [ usuario ] = useState(getUsuarioStorage());
    useHideMenu( false );
    const { Title, Text } = Typography;

    const onFinish = ({ agente, escritorio }) => {
        localStorage.setItem('agente', agente);
        localStorage.setItem('escritorio', escritorio);
        navigate('/escritorio');
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    if( usuario.agente && usuario.escritorio ) {
        return <Navigate to="/escritorio" />
    }

    return (
        <>
            <Title level={ 2 }>Ingresar</Title>
            <Text>Ingrese su nombre y número de escritorio.</Text>
            <Divider />
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 14 }}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                >
                <Form.Item
                label="Nombre del agente"
                name="agente"
                rules={[
                    {
                        required: true,
                        message: 'Por favor ingrese su nombre',
                    },
                ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                label="Escritorio"
                name="escritorio"
                rules={[
                    {
                    required: true,
                    message: 'Ingrese el número de escritorio',
                    },
                ]}
                >
                    <InputNumber min={ 1 } max={ 99 } />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 14,
                    }}
                    >
                    <Button type="primary" htmlType="submit" shape="round">
                        <SaveOutlined />
                        Ingresar
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}
