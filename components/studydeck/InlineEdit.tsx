import React from 'react';

function InlineEdit<P extends Object>(
    Component: React.ComponentType<P>,
    text: string
) {
    // if clicked, then show the textfield

    //else show typography
    return class InlineEdit extends React.Component<
        { P },
        { clicked: boolean }
    > {
        constructor(props) {
            super(props);

            this.state = {
                clicked: false
            };
        }
        clickhandler = () => {
            console.log('hello');
        };
        render() {
            return (
                <Component
                    clicked={this.state.clicked}
                    onClick={this.clickhandler}
                    {...(this.props as P)}
                ></Component>
            );
        }
    };
}

export default InlineEdit;
