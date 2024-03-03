import React, { useState } from "react";
import logo from "../assets/logo.png";
import {v4 as uuidV4} from "uuid"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom";

import Button from "../Components/Button";

function Home() {
  const [roomId,setRoomId]=useState('');
  const [userName,setUserName]=useState('');
  const navigte= useNavigate();

   const createNewRoom=(e)=>{
      e.preventDefault();
      const id = uuidV4();
     setRoomId(id);
     toast.success("New room is created")
     
   }
  
   const joinRoom= ()=>{
      if(!roomId ){
         toast.error('ROOM ID is required')
      }else if(!userName){
         toast.error('User Name is required')
      }else{
         navigte(`/editor/${roomId}`,{
            state:{
               userName
            }
         })
      }
      

   }

   const handleInput=(e)=>{
      if(e.code=="Enter"){
         joinRoom();
      }
   }



  return (
    <div
      id="homePageWrapper "
      className="flex
     items-center justify-center  text-[#fff]  h-[100vh]   "
    >
      <div
        id="formWrapper"
        className="bg-[#282a36] p-[20px]  rounded-[10px] w-[400px] max-w-[90%] gap-8 "
      >
        <div
          className="flex
            p-3 gap- items-center "
        >
          <img src={logo} className="w-[120px] "></img>
          <h1 className="m-3 text-[40px] text-[#ffd800]">CodeFuse</h1>
        </div>
        <div id="mainLabel" className="mb-[20px] mt-0 font-bold ">
          {" "}
          Past invitaion Room ID{" "}
        </div>
        <div id="inputGroup" className="flex flex-col w-[100%] ">
          <input
            type="text"
            id="inputBox"
            
            placeholder="Room ID"
            value={roomId}
            onChange={(e)=> setRoomId(e.target.value)}
            onKeyUp={handleInput}
            className="border border-[#ffd800] rounded-[10px] p-[8px] outline-none mb-[14px] bg-transparent font-bold "
          />
        </div>
        <div id="inputGroup">
          <input
            type="text"
            id="inputBox"
            placeholder="User Name"
            value={userName}
            onKeyUp={handleInput}
            onChange={(e)=>setUserName(e.target.value)}
            className="border border-[#ffd800] rounded-[10px] p-[8px] outline-none mb-[14px] bg-transparent w-[100%] font-bold "
          />
        </div>

        <div className="flex  w-[100%] ">
          <button className=" w-[100px]  bg-[#ffd800] p-[5px] text-black font-bold rounded-[10px] ml-auto hover:bg-[#897608] " onClick={joinRoom}  >
            JOIN
          </button>
        </div>
        <div className="mt-5">
          <span id="createInfo"  onClick={createNewRoom} >
            If you don't have an invite then create &nbsp;
            <a href="" id="createNewBtn" className="text-[#FFD800]  hover:text-[#897608] font-bold ">
             
            New Room
            </a>
          </span>
        </div>
      </div>
      <footer className="fixed bottom-0 m-6 ">
        <h4>
          {" "}
          Made with ❤️ by &nbsp;
          <a href="https://github.com/omkarpatil14" className="text-[#FFD800]  hover:text-[#897608] font-bold ">
             Omkar Patil
          </a>
        </h4>
      </footer>
    </div>
  );
}

export default Home;
