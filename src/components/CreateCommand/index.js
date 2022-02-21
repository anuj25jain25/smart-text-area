import MonacoEditor from 'react-monaco-editor';
import { useState } from 'react';
import { defaultCode } from './constants';

import "./index.scss";

const editorOptions = {
    selectOnLineNumbers: true,
    minimap: {
        enabled: false
    },
};

function CreateComponent(props) {
    const {
        saveCommand,
        cancel,
    } = props;
    const [commandName, setCommandName] = useState('');
    const [noOfParams, setNoOfParams] = useState(0);
    const [code, setCode] = useState(defaultCode);

    const onChange = (newValue, e) => {
        console.log('onChange', newValue, e);
        setCode(newValue);
    }
    const editorDidMount = (editor, monaco) => {
        // console.log('editorDidMount', editor);
    }
    const saveCode = () => {
        saveCommand({
            name: commandName,
            noOfParams: noOfParams,
            code
        });
        setCode(defaultCode);
        setNoOfParams(0);
        setCommandName('');
    }
    const commandNameOnchange = (ev) => {
        setCommandName(ev.target.value);
    }
    const noOfParamsOnchange = (ev) => {
        setNoOfParams(ev.target.value);
    }
    return <div className='create-component-wrapper'>
        <div className='create-component-box'>
            <div className='line-one'>
                <p className='generic-title'>Write command name.</p>
                <input
                    className='custom-input'
                    placeholder='/lower'
                    value={commandName}
                    onChange={commandNameOnchange} />
            </div>
            <div className='line-two'>
                <p className='generic-title'>Write number of command parameters if there are any.</p>
                <input
                    className='custom-input'
                    type='number'
                    placeholder='Write number of command parameters if there are any...'
                    value={noOfParams}
                    onChange={noOfParamsOnchange} />
            </div>

            <p className='editor-title'>
                Write down the function.
            </p>

            <div className='editor-wrapper'>
                <MonacoEditor
                    width="100%"
                    height="300px"
                    language="javascript"
                    theme="vs-light"
                    value={code}
                    options={editorOptions}
                    onChange={onChange}
                    editorDidMount={editorDidMount}
                />
            </div>
            <div className='action-btns'>
                <button className='green' onClick={saveCode}>Submit</button>
                <button className='red' onClick={() => cancel()}>Cancel</button>
            </div>
        </div>
    </div>
}

export default CreateComponent;