import { useContext, useState } from 'react';
import ColourModeContext from '../../styles/ColourModeContext';
interface Props {
    value: string;
    setValue: (value: string) => void;
    setSaving: (state: boolean) => void;
}
const InlineEdit = (props: Props) => {
    const { darkMode } = useContext(ColourModeContext);

    const [editingValue, setEditingValue] = useState(props.value);
    const [focus, setFocus] = useState(false);

    const onChange = (event) => setEditingValue(event.target.value);

    const onKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === 'Escape') {
            event.target.blur();
        }
    };

    const onBlur = (event) => {
        if (event.target.value.trim() === props.value) {
            setEditingValue(props.value);
        } else {
            props.setValue(event.target.value);
            props.setSaving(true);
            //post to the card's id and field
            fetch('/api/cards', { method: 'POST' })
                .then((req) => req.json())
                .then((data) => {
                    console.log(data);
                    props.setSaving(false);
                });
        }
        setFocus(!focus);
    };
    const onFocus = (event) => {
        setFocus(!focus);
    };

    return (
        <input
            type="text"
            aria-label="Field name"
            value={editingValue}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            onFocus={onFocus}
            className={`appearance-none rounded w-full py-2 px-2 ${
                darkMode ? 'text-white' : 'text-black'
            } leading-tight focus:outline-none focus:shadow-outline ${
                !darkMode && focus
                    ? ' bg-slate-200 border-blue-30 border'
                    : 'border-blue-30'
            } ${
                darkMode && focus
                    ? 'bg-gray-500 border-gray-30 border'
                    : 'bg-transparent'
            }`}
        />
    );
};

export default InlineEdit;
