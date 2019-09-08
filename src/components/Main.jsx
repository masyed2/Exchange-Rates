import React from 'react';
import { Form,  Row, Col, Container } from "react-bootstrap";
import styled from 'styled-components';
import Axios from 'axios';
import { convert } from '../lib';

const FormModified = styled(Form.Group)`
width: 100%;
`

const FieldSet = styled(Container)`
border: 1px solid ;
max-width: 510px;
margin-top: 100px;
padding: 20px;
`
const SpaceMobile = styled.div`
display: none;

@media(max-width: 768px) {
    margin: 30px auto;
    display: block;
    height: 1px;
    background: black;
}
`

const formSelect = {};


const Main = () => {

    const [amount, setAmount] = React.useState(0);
    const [from, setFrom] = React.useState('EUR');
    const [converted, setConverted] = React.useState(0);
    const [to, setTo] = React.useState('USD');

    const [currencies, setCurrencies] = React.useState([])


    React.useEffect(() => {
        // store all currencies from api in state
        const api = 'http://data.fixer.io/api/latest?access_key=cf0d6aecd1009775a81c453922afdbb0&format=1'

        Axios.get(api).then(res => {
            setCurrencies(res.data.rates);
        }).catch(err => console.log('error from api', err));
        
    }, [])



    React.useEffect(() => {
        if (currencies[from]) {
            const val = convert(amount, from, to, currencies);
            setConverted(val);
        }
        
    }, [from, to])

    console.log('check')

    function handleReverseConvert(e) {
        setConverted(e.target.value)

        const val = convert(e.target.value, to, from, currencies);
        setAmount(val);
    }

    function handleAmountChange(e) {
        setAmount(e.target.value)

        const val = convert(e.target.value, from, to, currencies);
        setConverted(val);
    }

    return (
            <FieldSet fluid>
                <Row>
                    <Col xs={12} sm={8}>
                        <FormModified controlId="formBasicEmail" className='text-left'>
                            <Form.Label>Type in amount and select currency :</Form.Label>
                            <Form.Control type="number" placeholder="0.00" value={amount} 
                                onChange={handleAmountChange} />
                        </FormModified> 
                    </Col>
                    <Col xs={12} sm={4}>
                    <Form.Group controlId="exampleForm.ControlSelect2">
                        <Form.Label>&nbsp;</Form.Label>
                        <Form.Control as="select" style={formSelect} 
                            onChange={e => setFrom(e.target.value)} value={from}>
                            <option value='USD'>USD</option>
                            <option value='CAD'>CAD</option>
                            <option value='EUR'>EUR</option>
                        </Form.Control>
                    </Form.Group>
                    </Col>     
                </Row>
                <Row>
                    <Col><SpaceMobile /></Col>
                </Row>
                <Row>
                    <Col xs={12} sm={8}>
                        <FormModified controlId="formGroupEmail"  className='text-left'>
                            <Form.Label>Converted amount :</Form.Label>
                            <Form.Control type="number" placeholder="0.00" value={converted} 
                                onChange={handleReverseConvert}/>
                        </FormModified> 
                    </Col>
                    <Col xs={12} sm={4}>
                        <Form.Group controlId="exampleForm.ControlSelect2">
                            <Form.Label>&nbsp;</Form.Label>
                            <Form.Control as="select" style={formSelect} value={to} onChange={e => setTo(e.target.value)}>
                                <option value='USD'>USD</option>
                                <option value='CAD'>CAD</option>
                                <option value='EUR'>EUR</option>
                            </Form.Control>
                        </Form.Group>
                        <p className='text-right'>
                            <a href='#' className='' target='_blank'>Disclaimer</a>
                        </p>
                    </Col>     
                </Row>     
            </FieldSet>
    );
};

export default Main;

