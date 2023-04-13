import { Link, Routes, Route, Navigate } from 'react-router-dom';
import { Layout, Menu, theme } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Ingresar } from './Ingresar';
import { Cola } from './Cola';
import { CrearTicket } from './CrearTicket';
import { Escritorio } from './Escritorio';
import { useContext } from 'react';
import { UiContext } from '../context/UiContext';
const { Sider, Content } = Layout;

export const RouterPage = () => {
    const { ocultarMenu } = useContext( UiContext );

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout style={{ height:'100vh' }}>
            <Sider
                breakpoint="md"
                collapsedWidth="0"
                hidden={ ocultarMenu }
            >
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: <Link to='/login'>Login</Link>,
                        },
                        {
                            key: '2',
                        icon: <VideoCameraOutlined />,
                        label: <Link to='/cola'>Cola de tickets</Link>,
                        },
                        {
                        key: '3',
                        icon: <UploadOutlined />,
                        label: <Link to='/crear'>Create tickets</Link>,
                    },
                ]}
                />
            </Sider>
            <Layout className="site-layout">
                <Content
                style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 280,
                    background: colorBgContainer,
                }}
                >
                    <Routes>
                        <Route path='/login' element={ <Ingresar /> }></Route>
                        <Route path='/cola' element={ <Cola /> }></Route>
                        <Route path='/crear' element={ <CrearTicket /> }></Route>
                        <Route path='/escritorio' element={ <Escritorio /> }></Route>
                    
                        <Route path='/*' element={ <Navigate to='/login' /> }></Route>
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    )
}
