import React from 'react'
import { injectIntl } from 'react-intl'
import { NavLink } from 'react-router-dom'
import styles from './Card.scss'
import {Col, Row } from 'antd';
import zh_CN from '../../../i18n/zh_CN'
import Result from "antd/es/result";

/**
 * author: ranzg1 on 2019/8/13
 */

class Card extends React.Component{
    render() {
        return (
            <Result
                status="404"
                title="无服务"
                subTitle="未发现服务，请先注册服务。"
                className={styles.result}
                // extra={<Button type="primary">Back Home</Button>}
            />
    )
    }
}

export default injectIntl(Card)