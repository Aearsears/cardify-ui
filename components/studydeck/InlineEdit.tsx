import React, { useState, useEffect, useContext } from 'react';
import useSWR from 'swr';
import ColourModeContext from '../../styles/ColourModeContext';

const InlineEdit = ({
    text,
    type,
    placeholder,
    setSaving,
    children,
    childRef,
    ...props
}) => {
    const [isEditing, setEditing] = useState(false);

    const { darkMode } = useContext(ColourModeContext);
    const fetcher = (url) => fetch(url).then((res) => res.json());
    //call api
    const { data, error } = useSWR('/api/users', fetcher);
    if (!data) {
        console.log('there is no data.');

        setSaving(false);
    } else {
        console.log('there is data.');
        setSaving(true);
    }

    useEffect(() => {
        if (childRef && childRef.current && isEditing === true) {
            childRef.current.focus();
            console.log('in use effect');
        }
        setSaving(true);
    }, [isEditing, childRef]);

    const handleKeyDown = (event, type) => {
        console.log(event);
        console.log(type);
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
