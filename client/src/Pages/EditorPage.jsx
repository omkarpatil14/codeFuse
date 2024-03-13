import React, { useEffect, useRef, useState } from "react";
import { initSocket } from "../socket";
import { Navigate, useLocation, useNavigate , useParams} from "react-router-dom";
import logo from "../assets/logo.png";
import Client from "../Components/Client";
import toast from "react-hot-toast";
import Editor from "../Components/Editor";
import Output from "../Components/Output";
import ACTIONS from "../Actions";

function EditorPage() {
   // Create a reference to hold the socket instance.
  const socketRef = useRef();
    // Get the current location using the useLocation hook.
  const location = useLocation();
  const {roomId} = useParams();
  const [clients, setClients] = useState([]);

  const reactNavigator = useNavigate();

  useEffect(() => {
    const init = async () => {
        // Wait for the socket initialization and store the instance in the ref.
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      function handleErrors(e) {
        console.log("socket error", e);
        toast.error("socket connection failed , try again later");
        reactNavigator("/");
      }

      console.log(import.meta.env.VITE_REACT_APP_BACKEND_URL);
      // Emit a 'JOIN' action to the server using the current socket instance and pass roomId and username which we will store in our map 
      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username,

      });

      socketRef.current.on(ACTIONS.JOINED,({clients,username,socketId})=>{
           if(username !== location.state?.username){
            toast.success(`${username} joined the room `);
            console.log(`${username} joined the room `);
           }
           setClients(clients);


      });

      //listening for disconnected 
      socketRef.current.on(ACTIONS.DISCONNECTED,({socketId,username})=>{
           toast.success(`${username} left the room`);
             // Update the client list state by filtering out the disconnected client.
           setClients((prev)=>{
             return  prev.filter(client => client.socketId != socketId)
           })
      })

    };
    init();
    //  a cleanup function to be executed when the component is unmounted or the effect is re-run.
    return ()=>{
       // Disconnect the current socket instance from the server.
      socketRef.current.disconnect();

       // Remove event listeners for the 'JOINED' and 'DISCONNECTED' actions from the current socket instance.
      socketRef.current.off(ACTIONS.JOINED);
      socketRef.current.off(ACTIONS.DISCONNECTED);
      
    }
  }, []);
  const [output, setOutPut] = useState("YOUR CODE OUTPUT");

  
  
  if(!location.state){
   return  <Navigate  to='/' />
  }
 

  return (
    <div id="mainWrap" className=" flex    h-[100%]   no-scrollbar ">
      <div
        id="aside"
        className="bg-[#1c1e29] text-[#fff] flex  flex-col w-[18%] h-screen "
      >
        <div id="asideInner" className=" h-screen pl-3 gap-1 ">
          <div
            id="logo"
            className="flex md:flex-row flex-col
            p-2 items-center justify-center "
          >
            <img
              src={logo}
              className=" max-w-[80px] max-h-[80px] border-[#424242] "
            ></img>
            <h1 className="m-3 md:text-[25px] text-[20px]  text-[#ffd800]">
              CodeFuse
            </h1>
          </div>
          <h3 className="text-white font-bold mb-5  ">Connected</h3>
          <div
            id="clientsList"
            className="flex flex-wrap max-h-[30rem] gap-[20px] overflow-x-auto no-scrollbar  "
          >
            {clients.map((client) => (
              <Client key={client.socketId} userName={client.username} />
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-center  items-center  gap-2 bg-[#1c1e29] p-[18px]">
          <button className=" w-[80%]  bg-[#00ff00] p-[5px] text-black font-bold rounded-[10px]   ">
            RUN
          </button>
          <button className=" w-[80%]  bg-white p-[5px] text-black font-bold rounded-[10px]   ">
            Copy room ID
          </button>
          <button className=" w-[80%] bg-white p-[5px] text-red-600 font-bold rounded-[10px]  ">
            Leave
          </button>
        </div>
      </div>
      <div id="editorwrap" className=" w-[50%] h-screen overflow-hidden   ">
        <Editor />
      </div>
      <div className=" w-[32%] ">
        <Output output={output} />
      </div>
    </div>
  );
}

export default EditorPage;
