import React from 'react';
import { Row, Col, Card, Table, Badge } from 'react-bootstrap';

import Aux from "../../hoc/_Aux";
import { tags_type } from '../../core/base'


import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as actionTypes from "../../store/actions";


class Article_Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.addArticleBtn = this.addArticleBtn.bind(this);
        this.doMore = this.doMore.bind(this);
    }

    addArticleBtn = () => {
        this.props.history.push('/article/create');
    }

    doMore = (e) => {
        let moreData = e.target.getAttribute("article_data");
        this.props.setArticleData(moreData);
        this.props.history.push('/article/detail')
    }

    render() {
        const mockRectArticle = this.props.md_article_list;
        const tagsType = tags_type;
        return (
            <Aux>
                <Row>
                    <Col md={12} xl={12}>
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title >
                                    <div className="row align-items-center justify-content-between">
                                        <div className="col">
                                            <h5 className="m-0">Recent Article</h5>
                                        </div>
                                        <div className="col-auto">
                                            <i className="feather icon-plus-square float-right" onClick={this.addArticleBtn} > </i>
                                        </div>
                                    </div>
                                </Card.Title>
                            </Card.Header>
                            <Card.Body className='px-0 py-2'>
                                <Table responsive hover>
                                    <tbody>
                                        {
                                            mockRectArticle.data.map((v, i) => {
                                                return (
                                                    <tr className="unread" key={i} >
                                                        <td><img className="rounded-circle" style={{ width: '40px' }} src={v.avatarUrl} alt="activity-user" /></td>
                                                        <td> <span>{v.userName}</span></td>
                                                        <td>
                                                            <h6 className="mb-1" style={{ width: "300px", overflow: "hidden" }} title={v.title}>{v.title}</h6>
                                                            <p className="m-0" style={{ width: "300px", overflow: "hidden" }}>{v.content}</p>
                                                        </td>
                                                        <td>
                                                            <span className="label theme-bg text-white f-12" article_data={v.id}  style={{cursor:'pointer'}} onClick={this.doMore}>more</span>
                                                        </td>
                                                        <td>
                                                            <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15" />{v.createTime}</h6>
                                                        </td>

                                                        <td>
                                                            {v.tags.map((val, i) => {
                                                                return (tagsType.map((v, idx) => {
                                                                    if (v.value === val) {
                                                                        return (
                                                                            <Badge pill style={{ background: v.color, color: 'black' }} key={idx}>
                                                                                {v.text}
                                                                            </Badge>
                                                                        )
                                                                    } else {
                                                                        return (<span key={idx}></span>)
                                                                    }
                                                                })
                                                                )
                                                            })}
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>
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
        setArticleData: (data) => dispatch({ type: actionTypes.ARTICLE_GETDATA, value: { data: data } })
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Article_Dashboard));
