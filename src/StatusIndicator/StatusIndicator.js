import React, { Component } from 'react';
import { connect } from 'react-redux';

class StatusIndicator extends Component{
	render(){
		let status = this.props.status.loading ? <span>Loading..!</span> : <span></span>;
		return (
			<div>
				{status}
			</div>
		);
	}
}
export default connect(
	function mapStateToProps(state){
		 return { status : state.status}; 
	}, 
	function mapDispatchToProps(dispatch){
		return {};
	}
)(StatusIndicator);