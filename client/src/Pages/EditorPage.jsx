import React, { useEffect, useState } from 'react'
import logo from "../assets/logo.png"
import Client from '../Components/Client';
import Editor from '../Components/Editor';
import Output from '../Components/Output';

function EditorPage() {

  useEffect(()=>{
    console.log(output);
  },[])
  const[output,setOutPut]=useState("HOLAAAAA");
   
  const [clients, setClients]= useState([
    {socketId:1, username: "Omkar Patil"},
    {socketId:2,username:"Tejas Jagtap"},
    {socketId:2,username:"Tejas Jagtap"},
    {socketId:2,username:"Tejas Jagtap"},
   
   
   

  ]);


  return (
    <div id='mainWrap' className=' flex    h-[100%]   no-scrollbar '  >
      <div id="aside" className='bg-[#1c1e29] text-[#fff] flex  flex-col w-[18%] h-screen ' >
        <div id='asideInner' className=' h-screen pl-3 gap-1 ' >
        <div id='logo'
          className="flex
            p-2 items-center justify-center "
        >
          <img src={logo} className="w-[80px] h-[80px] border-[#424242] "></img>
          <h1 className="m-3 text-[30px] text-[#ffd800]">CodeFuse</h1>
        </div>
         <h3 className='text-white font-bold mb-5  '  >Connected</h3>
          <div id='clientsList' className='flex flex-wrap h-[30rem] gap-[20px] overflow-x-auto no-scrollbar  '  >
            {clients.map((client)=>(
                
                   <Client  
                    key={client.socketId}
                   userName={client.username} />
            ))}
          </div>

        </div>
        <div className='flex flex-col justify-center  items-center  gap-2 bg-[#1c1e29] p-[18px]' >
        <button className=" w-[80%]  bg-[#00ff00] p-[5px] text-black font-bold rounded-[10px]   " >RUN</button>
        <button className=" w-[80%]  bg-white p-[5px] text-black font-bold rounded-[10px]   " >Copy room ID</button>
        <button className=" w-[80%] bg-white p-[5px] text-red-600 font-bold rounded-[10px]  " >Leave</button>
        </div>
      </div>
      <div id="editorwrap" className=' w-[50%] h-screen overflow-hidden   ' >
        <Editor/>
      </div>
      <div className=' w-[32%] '  >
      <Output  output={output} />
      </div>
      
    </div>
  )
}

export default EditorPage