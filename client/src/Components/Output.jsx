import React from 'react'

function Output({output}) {
  return (
    <div className='flex flex-col  justify-center items-center pt-[20px]  gap-2'  >
        <div className=' p-3 text-lg  text-white font-bold' >
            Output
        </div>
        <textarea  className=' h-[80vh]  w-[80%] p-2  rounded-lg border border-yellow-300 bg-yellow-400  ' disabled={true} >{output}</textarea>
    </div>
  )
}

export default Output