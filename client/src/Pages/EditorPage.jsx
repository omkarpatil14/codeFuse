import React, { useState } from 'react'
import logo from "../assets/logo.png"
import Client from '../Components/Client';

function EditorPage() {
   
  const [clients, setClients]= useState([
    {socketId:1, username: "Omkar Patil"},
    {socketId:2,username:"Tejas Jagtap"},
   

  ]);


  return (
    <div id='mainWrap' >
      <div id="aside" >
        <div id='asideInner' >
        <div id='logo'
          className="flex
            p-3 items-center "
        >
          <img src={logo} className="w-[70px] h-[70px] "></img>
          <h1 className="m-3 text-[30px] text-[#ffd800]">CodeFuse</h1>
        </div>
         <h3 className='text-white' >Connected</h3>
          <div id='clientsList'  >
            {clients.map((client)=>(
                
                   <Client 
                    key={client.socketId}
                   userName={client.username} />
            ))}
          </div>

        </div>
      </div>
      <div id="editorwrap" ></div>
      <div id="output"  ></div>
    </div>
  )
}

export default EditorPage