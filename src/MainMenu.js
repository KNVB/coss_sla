import { Col, Container, Row } from 'react-bootstrap';
export default function MainMenu(props) {
    return (
        <Container fluid={true}>
            <Row>
                <Col className="font-weight-bold text-center" md={12} lg={12} sm={12} xl={12} xs={12}>COSS-SLA Page</Col>
            </Row>
            <Row>
                <Col md={12} lg={12} sm={12} xl={12} xs={12}>
                    <ul>
                        <li><a href="/inputIncident">Input Incident</a></li>
                        <li><a href="/inputSystemBaseCount">Input System Base Count</a></li>
                        <li><a href="/listIncident">List Incident</a></li>
                        <li><a href="/showStat">Show Stat</a></li>
                    </ul>
                </Col>
            </Row>
        </Container>
    )
}