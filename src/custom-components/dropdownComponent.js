import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

/**
 * With the `maxHeight` property set, the Select Field will be scrollable
 * if the number of items causes the height to exceed this limit.
 */
export default class DropDownListComponent extends Component {
    constructor(properties) {
        super(properties);
        this.state = {
            value : this.props.defaultValue,
            items: this.props.items,
        };
    }
 
    handleChange = (event, index, value) => {
        this.setState({value});
    };

    render() {
        let contentStyle = {fontSize: "12px"};      
        return (
            <SelectField style={{width:"120px"}}               
                autoWidth = {false}
                selectedMenuItemStyle = {contentStyle}
                menuItemStyle = {contentStyle}
                labelStyle = {contentStyle}
                hintStyle = {contentStyle}
                value={this.state.value}
                onChange={this.handleChange}
                maxHeight={200}
            >
                {this.state.items}
            </SelectField>
        );
    }
}