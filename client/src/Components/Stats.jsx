import React from 'react'

function Stats({cpu , memo}) {
    console.log(cpu);
    return (
        <div className='flex flex-col  justify-center items-center pt-[20px]  gap-2'  >
            <div className=' p-3  pt-5 text-lg  text-white font-bold   ' >
            STATS
            </div>
            <div  className=' h-[20vh]  w-[80%] p-3 pl-4  rounded-lg border   font-sans  text-blue-300 ' disabled={true}  > 
             <div>
                {cpu && <div>
                    CPU time: <span className='text-orange-400'>{cpu}</span> s
                </div>
                   
                }
             </div>
             <div>
             {memo && <div>
                Memory: <span className='text-orange-400'>{memo/1024}</span> kb
                </div>
                   
                }
                </div>
            </div>
        </div>
      )
}

export default Stats