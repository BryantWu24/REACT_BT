import React from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { tags_type } from '../../core/base';
import Aux from "../../hoc/_Aux";

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as actionTypes from "../../store/actions";

class Article_Create extends React.Component {

    constructor(props) {
        super(props);
        this.goBack = this.goBack.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.state = {
            title: "",
            content: "",
            tags: {},
            submitted: false
        }
    }

    goBack = () => {
        this.props.history.goBack();
    }

    checkTwoDigits = (v) => {
        let strV = v.toString();
        if (strV.length === 1) {
            return ('0' + strV);
        } else {
            return strV;
        }
    }

    getNowTime = () => {
        const newDate = new Date();
        const month = this.checkTwoDigits(newDate.getMonth());
        const day = this.checkTwoDigits(newDate.getDate());
        const hour = this.checkTwoDigits(newDate.getHours());
        const minute = this.checkTwoDigits(newDate.getMinutes());
        const second = this.checkTwoDigits(newDate.getSeconds());
        const nowTime = newDate.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
        return nowTime;
    }

    validate = () => {
        return this.state.title.length > 0 && this.state.content.length > 0 && Object.keys(this.state.tags).length > 0
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const now = this.getNowTime();
        let tags = [];

        for (const key in this.state.tags) {
            if (this.state.tags[key] === true)
                tags.push(key);
        };
        let id = this.props.md_article_list.data.length + 1;

        let data = {
            id: id.toString(),
            userName: 'Bryant',
            avatarUrl: '',
            updateTime: '',
            createTime: now,
            title: this.state.title,
            content: this.state.content,
            tags: tags
        }

        this.props.createArticle(data);
        this.props.history.push('/article');
    }

    handleCheckboxChange(event) {
        const target = event.target;
        const checked = target.checked;
        const name = target.name;
        let tags = this.state.tags;

        if (!checked)
            delete tags[name];
        else
            tags[name] = checked;

        this.setState({
            tags: tags
        });
    }

    render() {
        const tagsType = tags_type;
        return (
            <Aux>
                <Row>
                    <Col >
                        <Card>
                            <Card.Header >
                                <i className="feather icon-arrow-left" style={{ cursor: 'pointer' }} onClick={this.goBack}></i>
                                <span style={{ marginLeft: '10px' }}>Create New Article</span>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Row>
                                        <Form.Group as={Col} md={12} xl={6} controlId="formGridTitle">
                                            <Form.Label>Title</Form.Label>
                                            <Form.Control placeholder="Enter title" name="title" onChange={this.handleChange} />
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Group as={Col} md={12} lx={6} style={{ paddingLeft: '0' }} controlId="formGridCheckbox" >
                                        <Form.Label>Tags</Form.Label>
                                        <br></br>
                                        {
                                            tagsType.map((data, i) => {
                                                return (
                                                    <Form.Check inline type="checkbox" name={data.value} onChange={this.handleCheckboxChange} key={i} label={data.text} id={data.value} value={data.value} />
                                                )
                                            })
                                        }
                                    </Form.Group>
                                    <Form.Group controlId="formGridContent">
                                        <Form.Label >
                                            Content
                                        </Form.Label>
                                        <Form.Control as="textarea" rows="10" placeholder="Enter content" name="content" onChange={this.handleChange} />
                                    </Form.Group>
                                    <Form.Row>

                                    </Form.Row>
                                    <Button variant="primary" type="submit" id="submitBtn" disabled={!this.validate()}>
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
        md_article_list: state.md_article_list
    }
};

const mapDispatchToProps = dispatch => {
    return {
        createArticle: (data) => dispatch({ type: actionTypes.CREATE_ARTICLE, value: { data: data } }),
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Article_Create));