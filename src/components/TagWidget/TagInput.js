import React from 'react';

export default class TagInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        const separator = this.props.field.get('separator', ', ');
        this.props.onChange(e.target.value.split(separator).map((el) => el.trim()));
    }
    render() {
        const separator = this.props.field.get('separator', ',');
        let val = this.props.value;
        return (
            <input
                id={this.props.forID}
                className={this.props.classNameWrapper}
                type='text'
                value={val ? val.join(separator) : ''}
                onChange={this.handleChange}
                autoComplete={false}
                autoCapitalize={false}
                autoCorrect={false}
            />
        );
    }
}