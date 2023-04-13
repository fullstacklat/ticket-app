import { useContext, useState } from 'react';
import { getUsuarioStorage } from '../helpers/getUsuarioStorage';
import { Button, Col, Divider, Row, Typography } from "antd"
import { CloseCircleOutlined, RightOutlined } from "@ant-design/icons";
import { useHideMenu } from "../hooks/useHideMenu";
import { useNavigate, Navigate } from 'react-router-dom';
import { SocketContext } from '../context/SocketContext';

export const Escritorio = () => {
    const [ usuario ] = useState(getUsuarioStorage());
    const [ticket, setTicket] = useState(null);
    const { socket } = useContext( SocketContext );
    const { Title, Text } = Typography;
    const navigate = useNavigate();
    useHideMenu( false );

    const salir = () => {
        localStorage.removeItem('agente');
        localStorage.removeItem('escritorio');
        navigate('/login');
    }

    const siguienteTicket = () => {
        socket.emit('siguiente-ticket-trabajar', usuario, ( ticket ) => {
            setTicket( ticket );
        } );
    }

    if( !usuario.agente && !usuario.escritorio ) {
        return <Navigate to="/login" />
    }

    return (
        <>
            <Row align={'middle'} justify={'space-between'}>
                <Col span={ 20 }>
                    <Title level={2}>{ usuario.agente }</Title>
                    <Text>Usted está trabajando en el escritorio: </Text>
                    <Text type="success">{ usuario.escritorio }</Text>
                </Col>
                <Col>
                    <Button shape="round" onClick={ salir } type="primary" danger>
                        <CloseCircleOutlined />
                        Salir
                    </Button>
                </Col>
            </Row>
            <Divider />
            {
                ticket && 
                (
                    <Row align={'middle'} justify={'space-between'}>
                        <Col span={20}>
                            <Text>Está atendiendo el ticket número: </Text>
                            <Text style={{  fontSize:30 }} type="danger">{ ticket.numero }</Text>
                        </Col>
                    </Row>
                )
            }
            <Row align={'middle'} justify={'end'}>
                <Col>
                    <Button onClick={ siguienteTicket } shape="round" type="primary">
                        <RightOutlined />
                        Siguiente
                    </Button>
                </Col>
            </Row>
        </>
    )
}
