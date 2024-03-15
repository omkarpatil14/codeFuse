import React, { useEffect, useRef, useState } from 'react';
import '../App.css'
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import "E:/My Projects/CodeFuse/client/src/App.css";
import ACTIONS from '../Actions';

function Editor({socketRef,roomId}) {
     // Using useRef hook to create a reference
    const editorRef = useRef();
    const [newCode, setNewCode]= useState(' ');
    useEffect(() => {
        async function init() {
              // Creating a CodeMirror instance from a textarea element with the id 'realtimeEditor'
            editorRef.current = Codemirror.fromTextArea(
                document.getElementById('realtimeEditor'),
                {
                    mode: { name: 'javascript', json: true },
                    theme: 'dracula',
                    autoCloseTags: true,
                     autoCloseBrackets: true,
                    lineNumbers: true,
                });



                // Adding a change event listener to the editor instance  which is a codemirror liabrary method 
                    editorRef.current.on('change', (instance , changes)=>{
                        // console.log(changes.text);
                        // Destructuring the 'origin' property from the 'changes' object
                        const {origin }= changes;

                        
                        // Getting the entire code from the editor instance after the change.

                        const code = instance.getValue();

                           setNewCode((prev)=> code);
                        console.log(newCode);
                        if(origin !== 'setValue'){
                            socketRef.current.emit(ACTIONS.CODE_CHANGE,{
                                roomId,
                                code,
                            })
                        }
                        // console.log(code);
                    });


             
                  
                    
                
        }

        init();

    },[]);

    useEffect(()=>{
 
        if(socketRef.current){
         // we will receive edited code by any socket by server 
            socketRef.current.on(ACTIONS.CODE_CHANGE,({code})=>{
                if(code!== null){
                    setNewCode(code);
                    console.log(newCode);
                    editorRef.current.setValue(code);
                
                    console.log(editorRef.current.getValue());
                }
          })
          
        }

       return ()=>{
        socketRef.current.off(ACTIONS.CODE_CHANGE);
       }

       
    },[socketRef.current])

  return (
    <div>
        <div className='p-6 flex pt-9 gap-4 ' >
            <button className='bg-white p-1 rounded-lg px-4 font-bold ' >Language </button>
            <button className='bg-white p-1 rounded-lg px-4 font-bold ' >Theme </button>
        </div>
        <textarea id='realtimeEditor' className='no-scrollbar'  ></textarea>
    </div>
  )
    
  
}

export default Editor