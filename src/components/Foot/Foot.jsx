import React from 'react'
import {injectIntl} from 'react-intl'
import {NavLink} from 'react-router-dom'
import styles from './Foot.scss'
import {Col, Row} from 'antd';
import zh_CN from '../../i18n/zh_CN'
import Menu from "antd/es/menu";
import Icon from "antd/es/icon";

class Foot extends React.Component {

    state = {
        current: 'video',
    };

    handleClick = e => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };


    render() {
        return (
            <Row gutter={16} className={styles.wrapper}>

                <Col span={4} className={styles.menuBottom}>
                    <NavLink to="/video" activeClassName={styles.selected}>{zh_CN.realTimeVideo}</NavLink>
                </Col>
                <Col span={4} className={styles.menuBottom}>
                    <NavLink to="/analysis" activeClassName={styles.selected}>{zh_CN.historicalRecord}</NavLink>
                </Col>
            </Row>
        )
    }
}

export default injectIntl(Foot)