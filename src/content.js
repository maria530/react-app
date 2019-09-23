import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ThemeSwitch from './themeSwitch';
import { connect } from './connect';

class Content extends Component {

    render() {
        return (
            <div>
                <div style={{ color: this.props.themeColor }}>React.js小书内容</div>
                <ThemeSwitch addedProps="string nothing" />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        themeColor: state.themeColor,
        themeName: state.themeName
    }
}

export default connect(mapStateToProps)(Content);