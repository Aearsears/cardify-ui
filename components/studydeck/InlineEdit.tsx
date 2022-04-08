import React from 'react';

function withInlineEdit<T>(Component: React.ComponentType<T>) {
    // if clicked, then show the textfield
    //else show typography
    return class InlineEdit extends React.Component<T, { clicked: boolean }> {
        constructor(props) {
            super(props);
            this.clickhandler = this.clickhandler.bind(this);
            this.state = {
                clicked: false
            };
        }
        clickhandler = () => {
            console.log('hello in HOC');
        };
        render() {
            return (
                <Component onClick={this.clickhandler} {...(this.props as T)} />
            );
        }
    };
}

export default withInlineEdit;
