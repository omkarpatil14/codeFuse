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
    const [theme, setTheme] = useState("dracula");

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
            // console.log(origin);
            const code = instance.getValue(); 
            // console.log(code);
            localStorage.setItem(`${roomId}`,JSON.stringify(code) );
           
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
           <div className='p-6 flex pt-9 gap-4'>
    <select 
        name='language' 
        id='language' 
        className=' bg-slate-800 text-yellow-400 border border-yellow-400 cursor-pointer p-1 rounded-lg px-4 font-bold flex justify-center items-center' 
        onChange={handleLang}
    >
        <option value='cpp' className='flex justify-center items-center'>C++</option>
        <option value='python3'>Python3</option>
        <option value='dart'>Dart</option>
        <option value='rust'>Rust</option>
        <option value='sql'>SQL</option>
        <option value='nodejs'>NodeJS</option>
        <option value='lolcode'>LOLCODE</option>
    </select>   
</div>

            <textarea id='realtimeEditor' className='no-scrollbar'></textarea>
        </div>
    );
}

export default Editor;
