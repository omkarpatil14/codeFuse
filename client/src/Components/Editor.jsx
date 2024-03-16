import React, { useEffect, useRef, useState, useMemo } from 'react';
import '../App.css'
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import "E:/My Projects/CodeFuse/client/src/App.css";
import ACTIONS from '../Actions';
import { stringify } from 'uuid';

function Editor({socketRef,roomId, onCodeChange}) {
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



                


             
                  
                    
                
        }

        init();

    },[]);

    useEffect(()=>{
        // Adding a change event listener to the editor instance  which is a codemirror liabrary method 
        editorRef.current.on('change', (instance , changes)=>{
            // console.log(changes.text);
            // Destructuring the 'origin' property from the 'changes' object
            const {origin }= changes;

            
            // Getting the entire code from the editor instance after the change.
            
            
            const code =  instance.getValue(); 
            // setNewCode(  (prev)=> prev=instance.getValue());
            
            onCodeChange(code); // this will return code to the editor page (child- parent deata transfer)
            
               
            // console.log(newCode);   
            // console.log(code);

            if(origin !== 'setValue'){
                socketRef.current.emit(ACTIONS.CODE_CHANGE,{ 
                    roomId,
                    code,
                })
            }
            
            // console.log(code);
        });
    },[newCode])

    useEffect(()=>{
 
        if(socketRef.current){
         // we will receive edited code by any socket by server 
            socketRef.current.on(ACTIONS.CODE_CHANGE,({code})=>{
                if(code!== null){
                    setNewCode(code);
                    console.log(code);
                    editorRef.current.setValue(code);
                
                    // console.log(editorRef.current.getValue());
                }
          })
           
        }

       return ()=>{
        socketRef.current.off(ACTIONS.CODE_CHANGE);
       }

       
    },[socketRef.current])      

    useEffect(() => {
        console.log(newCode); 
      }, [newCode]);

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