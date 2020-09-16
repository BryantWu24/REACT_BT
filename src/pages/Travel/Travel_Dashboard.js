import React from 'react';
import { Row, Col, Card, Table, Badge } from 'react-bootstrap';

import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";
import { tags_type } from '../../core/base'


import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as actionTypes from "../../store/actions";


class Travel_Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.addArticleBtn = this.addArticleBtn.bind(this);
    }

    addArticleBtn = () => {
        this.props.history.push('/travel/create');
    }

    render() {
        const mockRectArticle = this.props.mockData;
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
                                                    <tr className="unread" key={i}>
                                                        {/* <td><img className="rounded-circle" style={{ width: '40px' }} src={v.avatarUrl} alt="activity-user" /></td> */}
                                                        <td> <span>{v.userName}</span></td>
                                                        <td>
                                                            <h6 className="mb-1" style={{width:"300px",overflow:"hidden"}} title={v.title}>{v.title}</h6>
                                                            <p className="m-0" style={{width:"300px",overflow:"hidden"}}>{v.content}</p>
                                                        </td>
                                                        <td>
                                                            <a href={DEMO.BLANK_LINK} className="label theme-bg2 text-white f-12">more</a>
                                                            <a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12"><i className="feather icon-edit"></i>Edit</a>
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
        mockData: state.mockData
    }
};

const mapDispatchToProps = dispatch => {
    return {
        createArticle: (data) => dispatch({ type: actionTypes.CREATE_ARTICLE, value: { data: data } }),
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Travel_Dashboard));
