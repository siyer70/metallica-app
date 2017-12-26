import React, { Component } from 'react';
import { connect } from 'react-redux';
import LinearProgress from 'material-ui/LinearProgress';

class StatusIndicator extends Component{
	render(){
		let status = this.props.status.loading 
			? <span><LinearProgress mode="indeterminate" /></span> 
			: <span></span>;
		return (
			<div style={{marginBottom:"3px"}}>
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