import { useContext, useState } from 'react';
import ColourModeContext from '../../styles/ColourModeContext';

const InlineEdit2 = ({ value, setValue, setSaving }) => {
    const { darkMode } = useContext(ColourModeContext);

    const [editingValue, setEditingValue] = useState(value);

    const onChange = (event) => setEditingValue(event.target.value);

    const onKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === 'Escape') {
            event.target.blur();
        }
    };

    const onBlur = (event) => {
        if (event.target.value.trim() === value) {
            setEditingValue(value);
        } else {
            setValue(event.target.value);
            setSaving(true);
            //post to the card's id and field
            fetch('/api/cards', { method: 'POST' })
                .then((req) => req.json())
                .then((data) => {
                    console.log(data);
                    setSaving(false);
                });
        }
    };

    return (
        <input
            type="text"
            aria-label="Field name"
            value={editingValue}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            className={`shadow appearance-none border rounded w-full py-2 px-3 ${
                darkMode ? 'text-white' : 'text-black'
            }text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                darkMode ? 'border-gray-30' : 'border-blue-30'
            } ${darkMode ? 'bg-gray-500' : 'bg-white'}`}
        />
    );
};

export default InlineEdit2;
