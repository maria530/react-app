import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from './connect';

console.log('functin connect',connect);

class ThemeSwitch extends Component {


    handleSwitchColor(color) {
        this.props.onSwitchColor(color);
    }

    render() {
        console.log('ThemeSwitch:',this.props);
        return (
            <div>
                <button onClick={ this.handleSwitchColor.bind(this, 'red') } style={{ color: this.props.themeColor }}>Red</button>
                <button onClick={ this.handleSwitchColor.bind(this, 'blue') } style={{ color: this.props.themeColor }}>Blue</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        themeColor: state.themeColor
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSwitchColor: (color) => {
            dispatch({ type: 'CHANGE_COLOR', themeColor: color })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ThemeSwitch);