import React from 'react';
import { Row, Col, Card, Form, Button, InputGroup } from 'react-bootstrap';
import { city, tags_type } from '../../core/base';
import Aux from "../../hoc/_Aux";

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as actionTypes from "../../store/actions";

const Emoji = props => (
    <option
        className="emoji"
        role="img"
        aria-label={props.label ? props.label : ""}
        aria-hidden={props.label ? "false" : "true"}
        value={props.label}
    >
        {props.symbol}
    </option>
)
class Travel_Create extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectCity: ""
        };
        this.goBack = this.goBack.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    goBack = () => {
        this.props.history.goBack();
    }

    handleCityChange = (e) => {
        city.forEach(v => {
            if (v.value === e.target.value) {
                this.setState({
                    selectCity: v.text
                })
            }
        });
    }

    componentDidMount = () => {
        var citySelect = document.getElementById("formGridCity");
        citySelect.selectedIndex = -1;
    }

    handleSubmit = () => {
        this.props.createArticle({
            userName: 'John',
            avatarUrl: '',
            updateTime: '2020-09-10 15:05:10',
            createTime: '2020-09-09 12:02:10',
            title: '文章標題',
            content: '內文敘述...',
            tags: ['Recreation', 'Food']
        });
        this.props.history.push('/travel');
    }

    render() {
        const { selectCity } = this.state;
        const cityAry = city;
        const tagsType = tags_type;
        return (
            <Aux>
                <Row>
                    <Col >
                        <Card>
                            <Card.Header >
                                <i className="feather icon-arrow-left" onClick={this.goBack}></i>
                                <span style={{ marginLeft: '10px' }}>Create New Article</span>
                            </Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Row>
                                        <Form.Group as={Col} md={12} xl={6} controlId="formGridTitle">
                                            <Form.Label>Title</Form.Label>
                                            <Form.Control placeholder="Enter title" />
                                        </Form.Group>
                                        <Form.Group as={Col} md={6} xl={3} controlId="formGridCity">
                                            <Form.Label>City</Form.Label>
                                            <Form.Control as="select" onChange={this.handleCityChange}>
                                                {
                                                    cityAry.map((v, i) => {
                                                        return (
                                                            <option value={v.value} key={i}>{v.text}</option>
                                                        )
                                                    })
                                                }
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group as={Col} md={6} xl={3} controlId="formGridTags">
                                            <Form.Label>Tags</Form.Label>
                                            <Form.Control as="select" defaultValue={tagsType[0].value} >
                                                {
                                                    tagsType.map((v, i) => {
                                                        return (
                                                            <option value={v.value} key={i}>{v.text}</option>
                                                        )
                                                    })
                                                }
                                            </Form.Control>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Group controlId="formGridAddress">
                                        <Form.Label >
                                            Detail Address
                                        </Form.Label>
                                        <InputGroup className="mb-2">
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>{selectCity}</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <Form.Control placeholder="Enter detail address." />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Row>
                                        <Form.Group as={Col} sm={4} md={3} lx={3} controlId="formGridRate">
                                            <Form.Label>Rate</Form.Label>
                                            <Form.Control as="select" defaultValue="1">
                                                <Emoji label="1" symbol="⭐" />
                                                <Emoji label="2" symbol="⭐⭐" />
                                                <Emoji label="3" symbol="⭐⭐⭐" />
                                                <Emoji label="4" symbol="⭐⭐⭐⭐" />
                                                <Emoji label="5" symbol="⭐⭐⭐⭐⭐" />
                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group as={Col} sm={4} md={3} lx={3} controlId="formGridZip">
                                            <Form.Label>Date</Form.Label>
                                            <Form.Control as="input" type="date" />
                                        </Form.Group>
                                        <Form.Group as={Col} sm={4} md={6} lx={6} controlId="formGridCheckbox">
                                        <Form.Label>Tags</Form.Label>
                                        <br></br>
                                            {
                                                tagsType.map((data, i) => {
                                                    return (
                                                        <Form.Check  inline type="checkbox" key={i} label={data.text} id={data.value} value={data.value} />
                                                    )
                                                })
                                            }
                                        </Form.Group>
                                    </Form.Row>
                                    <Button variant="primary" onClick={this.handleSubmit}>
                                        Submit
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
}


const mapStateToProps = state => {
    return {
        mockData: state.mockData
    }
};

const mapDispatchToProps = dispatch => {
    return {
        createArticle: (data) => dispatch({ type: actionTypes.CREATE_ARTICLE, value: { data: data } }),
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Travel_Create));