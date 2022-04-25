import React, { SetStateAction, useContext, useRef, useState } from 'react';
import ColourModeContext from '../../styles/ColourModeContext';
import InlineEdit from './InlineEdit';

interface Props {
    content: string;
    className?: string;
    setSaving?: React.Dispatch<SetStateAction<boolean>>;
}

function EditCardRow(props: Props) {
    const inputRef = useRef();
    const textareaRef = useRef();
    const [task, setTask] = useState(props.content);
    const [description, setDescription] = useState('');
    const { darkMode } = useContext(ColourModeContext);

    return (
        <InlineEdit
            text={task}
            placeholder="Write a task name"
            setSaving={props.setSaving}
            childRef={inputRef}
            type="input"
            className={props.className}
            tabIndex={0}
        >
            <input
                ref={inputRef}
                type="text"
                name="task"
                className={`shadow appearance-none border rounded w-full py-2 px-3 ${
                    darkMode ? 'text-white' : 'text-black'
                }text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    darkMode ? 'border-gray-30' : 'border-blue-30'
                } ${darkMode ? 'bg-gray-500' : 'bg-white'}`}
                placeholder="Write a task name"
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
        </InlineEdit>
    );
}

export default EditCardRow;
