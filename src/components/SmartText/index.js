import { useState } from 'react';
import CreateComponent from '../CreateCommand';
import './index.scss';

function SmartText() {
    const [textVal, setTextVal] = useState('');
    const [isCommandActive, setIsCommandActive] = useState(false);
    const [addNewCommand, setAddNewCommand] = useState(false);
    const [currentCommand, setCurrentCommand] = useState('');
    const [commandSets, setCommandSets] = useState({
        "/upper": {
            code: (currentVal) => currentVal.split(" ").map((val, idx, arr) => {
                if (arr.length >= 2 && idx === arr.length - 2) {
                    return val.toUpperCase();
                }
                return val;
            }).join(" "),
            noOfParams: 0
        },
        "/add": {
            code: (currentVal, num1, num2) => {
                const sum = Number(num1) + Number(num2);
                return currentVal + sum.toString();
            },
            noOfParams: 2
        },
        "/addCommand": {
            code: (currentVal) => {
                setAddNewCommand(true);
                return currentVal;
            },
            noOfParams: 0
        },
    });
    const changeInTextArea = (ev) => {
        if (isCommandActive) {
            const command = ev.target.value.replace(textVal, "");
            setCurrentCommand(command);
        } else if (currentCommand) {
            setTextVal(getCommandResult(currentCommand));
            setCurrentCommand('');
        } else {
            setTextVal(ev.target.value);
        }
    }
    const checkIfCommandCompleted = () => {
        const comms = currentCommand.split(" ");
        return Object.keys(commandSets).some(command => {
            if (command === comms[0]
                && ((comms.length - 1) === Number(commandSets[command].noOfParams))
            ) return true;
            return false;
        });
    }
    const keyDownPressed = (ev) => {
        if (ev.code === "Slash") {
            setTextVal(textVal + currentCommand);
            setIsCommandActive(true);
            setCurrentCommand('');
        }
        if (isCommandActive
            && (ev.code === "Enter" || ev.code === "Space")
            && checkIfCommandCompleted()
        ) {
            setIsCommandActive(false);
        }
    }
    const getCommandResult = (command) => {
        const extraParams = command.split(" ");
        const newCommand = extraParams.splice(0, 1);
        const paramsToPass = [textVal, ...extraParams].join("', '");
        if (!commandSets[newCommand]) return textVal;

        if (typeof commandSets[newCommand].code === 'string')
            return eval(`(${commandSets[newCommand].code})('${paramsToPass}')`);
        return commandSets[newCommand].code(textVal, ...extraParams);
    }
    const saveCommand = (data) => {
        const { name, code, noOfParams } = data;
        setCommandSets({
            ...commandSets, [name]: {
                code,
                noOfParams
            }
        });
        setAddNewCommand(false);
    }
    return <div className='smart-text-wrapper'>
        <div className='heading-title'>Smart Text-Area</div>
        <div className='text-area-wrapper'>
            <textarea
                placeholder='Start writing here...'
                onKeyDown={keyDownPressed}
                value={`${textVal}${currentCommand}`}
                onChange={changeInTextArea} />
        </div>
        {addNewCommand ?
            <CreateComponent
                saveCommand={saveCommand}
                cancel={() => setAddNewCommand(false)}
            />
            : null}

    </div>
}

export default SmartText;