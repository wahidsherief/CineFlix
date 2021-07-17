import React, { Component } from "react"
import { View } from "react-native"
import App from "./Routes"

export default class Index extends Component {
	render() {
		return (
				<App
					navigation={this.props.navigation}
				></App>
		)
	}
}