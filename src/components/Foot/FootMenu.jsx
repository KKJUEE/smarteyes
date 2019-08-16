import React from 'react'
import {injectIntl} from 'react-intl'
import {NavLink, withRouter} from 'react-router-dom'
import styles from './FootMenu.scss'
import {Col, Row} from 'antd';
import zh_CN from '../../i18n/zh_CN'

class FootMenu extends React.Component {

    state = {
        current: 'analysis',
    };

    handleClick = e => {
        console.log('click ', e);
        this.setState({
            current: e,
        });
    };

    componentDidMount = () => {
        let inputCheckId = "";
        if(this.props.history.location.pathname === "/" || this.props.history.location.pathname === "/video") {
            inputCheckId = "stControl1";
        } else {
            inputCheckId = "stControl2";
        }

        let input = document.getElementById(inputCheckId);
        input.checked = "checked";
    }

    linkTo(linkHref){
        this.props.history.push(linkHref);
    }

    render() {
        return (
            <div>
                <div className={styles.stContainer}>
                    <input type="radio" name="radioset" id="stControl1" className={styles.stControl1} onClick={this.linkTo.bind(this, "video")}/>
                    <a>{zh_CN.realTimeVideo}</a>
                    <input type="radio" name="radioset" id="stControl2" className={styles.stControl2} onClick={this.linkTo.bind(this, "analysis")}/>
                    <a href="#/analysis">{zh_CN.historicalRecord}</a>
                </div>

            </div>
        )
    }
}

export default withRouter(FootMenu)