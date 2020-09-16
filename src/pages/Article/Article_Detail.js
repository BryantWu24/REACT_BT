import React from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { tags_type } from "../../core/base";
import Aux from "../../hoc/_Aux";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import * as actionTypes from "../../store/actions";

class Article_Detail extends React.Component {
    constructor(props) {
        super(props);
        this.goBack = this.goBack.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.switchMode = this.switchMode.bind(this);
        this.doDelete = this.doDelete.bind(this);
        this.state = {
            title: "",
            content: "",
            tags: {},
            modify: false,
            switchWord: "Modify",
        };
    }

    goBack = () => {
        this.props.history.goBack();
    };

    checkTwoDigits = (v) => {
        let strV = v.toString();
        if (strV.length === 1) {
            return "0" + strV;
        } else {
            return strV;
        }
    };

    getNowTime = () => {
        const newDate = new Date();
        const month = this.checkTwoDigits(newDate.getMonth());
        const day = this.checkTwoDigits(newDate.getDate());
        const hour = this.checkTwoDigits(newDate.getHours());
        const minute = this.checkTwoDigits(newDate.getMinutes());
        const second = this.checkTwoDigits(newDate.getSeconds());
        const nowTime = newDate.getFullYear() + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
        return nowTime;
    };

    validate = () => {
        return (this.state.title.length > 0 && this.state.content.length > 0 && Object.keys(this.state.tags).length > 0);
    };

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const now = this.getNowTime();
        let tags = [];

        for (const key in this.state.tags) {
            if (this.state.tags[key] === true) tags.push(key);
        }

        let data = {
            id: this.props.md_article_detail.id,
            userName: this.props.md_article_detail.userName,
            updateTime: now,
            title: this.state.title,
            content: this.state.content,
            tags: tags,
        };

        this.props.saveArticle(data);
        this.props.history.push("/article");
    };

    handleCheckboxChange(event) {
        const target = event.target;
        const checked = target.checked;
        const name = target.name;
        let tags = this.state.tags;

        if (!checked) delete tags[name];
        else tags[name] = checked;

        this.setState({
            tags: tags,
        });
    }

    componentDidMount = () => {
        let obj = this.props.md_article_detail;
        // Deep Clone Obj
        let stateObj = JSON.parse(JSON.stringify({ ...obj }));
        let tagsAry = stateObj.tags;
        stateObj.tags = {};
        tagsAry.forEach((v, i) => {
            stateObj.tags[v] = true;
        });
        this.setState(stateObj);
    };

    switchMode = () => {
        this.setState({
            modify: !this.state.modify,
            switchWord: this.state.modify ? "Modify" : "View",
        });
    };

    doDelete = () => {
        this.props.deleteArticle(this.props.md_article_detail.id);
        this.props.history.push('/article');
    }

    render() {
        const tagsType = tags_type;
        const mockDetailData = this.props.md_article_detail;
        const { title, content, modify, switchWord } = this.state;
        return (
            <Aux>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <div className="row align-items-center justify-content-between">
                                    <div>
                                        <i
                                            className="feather icon-arrow-left"
                                            style={{ cursor: "pointer" }}
                                            onClick={this.goBack}
                                        ></i>
                                        <span style={{ marginLeft: "10px" }}>
                                            {modify ? "Modify" : "View"} Article
                                        </span>
                                    </div>
                                    <div>
                                        <span
                                            className="label theme-bg text-white f-12"
                                            style={{ borderRadius: "10px", cursor: "pointer" }}
                                            onClick={this.switchMode}
                                            id="switchWording"
                                        >
                                            {switchWord}
                                        </span>
                                        <span
                                            className="label theme-bg text-white f-12"
                                            style={{ borderRadius: "10px", cursor: "pointer" }}
                                            onClick={this.doDelete}
                                        >
                                            <i
                                                className="feather icon-trash-2"
                                                style={{ cursor: "pointer" }}
                                            ></i>
                                        </span>
                                    </div>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Row>
                                        <Form.Group
                                            as={Col}
                                            md={12}
                                            xl={6}
                                            controlId="formGridTitle"
                                        >
                                            <Form.Label>Title</Form.Label>
                                            <Form.Control
                                                placeholder="Enter title"
                                                name="title"
                                                onChange={this.handleChange}
                                                value={title}
                                                disabled={!modify}
                                            />
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Group
                                        as={Col}
                                        md={12}
                                        lx={6}
                                        style={{ paddingLeft: "0" }}
                                        controlId="formGridCheckbox"
                                    >
                                        <Form.Label>Tags</Form.Label>
                                        <br></br>
                                        {tagsType.map((val, i) => {
                                            if (mockDetailData.tags.includes(val.value))
                                                return (
                                                    <Form.Check
                                                        inline
                                                        type="checkbox"
                                                        name={val.value}
                                                        onChange={this.handleCheckboxChange}
                                                        key={i}
                                                        label={val.text}
                                                        id={val.value}
                                                        value={val.value}
                                                        defaultChecked={true}
                                                        disabled={!modify}
                                                    />
                                                );
                                            else
                                                return (
                                                    <Form.Check
                                                        inline
                                                        type="checkbox"
                                                        name={val.value}
                                                        onChange={this.handleCheckboxChange}
                                                        key={i}
                                                        label={val.text}
                                                        id={val.value}
                                                        value={val.value}
                                                        disabled={!modify}
                                                    />
                                                );
                                        })}
                                    </Form.Group>
                                    <Form.Group controlId="formGridContent">
                                        <Form.Label>Content</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows="10"
                                            placeholder="Enter content"
                                            name="content"
                                            value={content}
                                            onChange={this.handleChange}
                                            disabled={!modify}
                                        />
                                    </Form.Group>
                                    <Form.Row></Form.Row>
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        id="submitBtn"
                                        disabled={!this.validate() && !modify}
                                    >
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

const mapStateToProps = (state) => {
    return {
        md_article_detail: state.md_article_detail,
        md_article_list: state.md_article_list,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        saveArticle: (data) =>
            dispatch({ type: actionTypes.ARTICLE_SAVE, value: { data: data } }),
        deleteArticle: (data) =>
            dispatch({ type: actionTypes.ARTICLE_DELETE, value: { data: data } }),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Article_Detail)
);
