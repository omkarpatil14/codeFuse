import React from 'react'
import Avatar from 'react-avatar'


function Client({userName}) {
    
  return (
    <div className='client' >
        <Avatar  name={userName} size={50} round="14px" color="#ffd800" fgColor="black "/>
        <span id='username' >
           {userName} 
        </span>
    </div>
  )
}

export default Client