import React, { useEffect, useRef } from 'react';
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import "E:/My Projects/CodeFuse/client/src/App.css";

function Editor() {
 
    useEffect(() => {
        async function init() {
             Codemirror.fromTextArea(
                document.getElementById('realtimeEditor'),
                {
                    mode: { name: 'javascript', json: true },
                    theme: 'dracula',
                    autoCloseTags: true,
                    autoCloseBrackets: true,
                    lineNumbers: true,
                });
        }

        init();

    },[]);

  return (
    <div>
        <div className='p-6 flex pt-9 ' >
            <button className='bg-white p-1 rounded-lg px-4 font-bold ' >language </button>
        </div>
        <textarea id='realtimeEditor' className='no-scrollbar'  ></textarea>
    </div>
  )
    
  
}

export default Editor