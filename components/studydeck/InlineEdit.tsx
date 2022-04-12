import React, { useState, useEffect, useContext } from 'react';
import ColourModeContext from '../../styles/ColourModeContext';

const InlineEdit = ({
    text,
    type,
    placeholder,
    children,
    childRef,
    ...props
}) => {
    const [isEditing, setEditing] = useState(false);

    const { darkMode } = useContext(ColourModeContext);

    useEffect(() => {
        if (childRef && childRef.current && isEditing === true) {
            childRef.current.focus();
        }
    }, [isEditing, childRef]);

    const handleKeyDown = (event, type) => {
        const { key } = event;
        const keys = ['Escape', 'Tab'];
        const enterKey = 'Enter';
        const allKeys = [...keys, enterKey];
        if (
            (type === 'textarea' && keys.indexOf(key) > -1) ||
            (type !== 'textarea' && allKeys.indexOf(key) > -1)
        ) {
            setEditing(false);
        }
    };

    return (
        <section {...props}>
            {isEditing ? (
                <div
                    onBlur={() => setEditing(false)}
                    onKeyDown={(e) => handleKeyDown(e, type)}
                >
                    {children}
                </div>
            ) : (
                <div
                    className={`rounded py-2 px-3 leading-tight whitespace-pre-wrap hover:shadow-outline`}
                    onClick={() => setEditing(true)}
                >
                    <span
                        className={`${
                            text
                                ? darkMode
                                    ? 'text-white'
                                    : 'text-black'
                                : 'text-gray-500'
                        }`}
                    >
                        {text || placeholder || 'Editable content'}
                    </span>
                </div>
            )}
        </section>
    );
};

export default InlineEdit;
