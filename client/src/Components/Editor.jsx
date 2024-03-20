import React, { useEffect, useRef, useState } from 'react';
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/abbott.css';
import 'codemirror/theme/eclipse.css';
import 'codemirror/theme/solarized.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import ACTIONS from '../Actions';

function Editor({ socketRef, roomId, onCodeChange, onLangChange }) {
    const editorRef = useRef();
    const [newCode, setNewCode] = useState('');
    const [theme, setTheme] = useState(() => {
        // Retrieve the theme from localStorage if it exists, otherwise set the default theme
        return localStorage.getItem('theme') || 'dracula';
    });

    useEffect(() => {
        async function init() {
            editorRef.current = Codemirror.fromTextArea(
                document.getElementById('realtimeEditor'),
                {
                    mode: { name: 'javascript', json: true },
                    theme: theme,
                    autoCloseTags: true,
                    autoCloseBrackets: true,
                    lineNumbers: true,
                }
            );
        }
        init();
    }, [theme]);

    useEffect(() => {
        editorRef.current.on('change', (instance, changes) => {
            const { origin } = changes;
            const code = instance.getValue();
            onCodeChange(code);
            if (origin !== 'setValue') {
                socketRef.current.emit(ACTIONS.CODE_CHANGE, {
                    roomId,
                    code,
                });
            }
        });
    }, []);

    useEffect(() => {
        if (socketRef.current) {
            socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
                if (code !== null) {
                    setNewCode(code);
                    editorRef.current.setValue(code);
                }
            });
        }
        return () => {
            socketRef.current.off(ACTIONS.CODE_CHANGE);
        };
    }, [socketRef.current]);

    useEffect(() => {
        // Save the selected theme to localStorage
        localStorage.setItem('theme', theme);
    }, [theme]);

    function handleLang(e) {
        onLangChange(e.target.value);
    }

    function handleTheme(e) {
        setTheme(e.target.value);
    }

    return (
        <div>
            <div className='p-6 flex pt-9 gap-4 '>
                <select name='language' id='language' className='bg-white p-1 rounded-lg px-4 font-bold  flex justify-center items-center' onChange={handleLang}>
                    <option value='cpp' className='flex justify-center items-center'>C++</option>
                    <option value='python3'>Python3</option>
                    <option value='dart'>Dart</option>
                    <option value='rust'>Rust</option>
                    <option value='sql'>SQL</option>
                    <option value='nodejs'>NodeJS</option>
                    <option value='lolcode'>LOLCODE</option>
                </select>
                <select name='language' id='language' className='bg-white p-1 rounded-lg px-4 font-bold  flex justify-center items-center' onChange={handleTheme}>
                    <option value='dracula' className='flex justify-center items-center'>Dracula</option>
                    <option value='abbott'>Abbott</option>
                    <option value='eclipse'>Eclipse</option>
                    <option value='solarized'>Solarized</option>
                </select>
            </div>
            <textarea id='realtimeEditor' className='no-scrollbar'></textarea>
        </div>
    );
}

export default Editor;
