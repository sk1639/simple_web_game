import React, { Component, PureComponent } from 'react'

export default class Try extends Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.props !== nextProps) {
            return false
        }
        return true

    }

    render() {

        return (
            <li key={this.props.data}>{this.props.data.try} {this.props.data.result}</li>
        )
    }
}
