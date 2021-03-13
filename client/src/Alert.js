import React, { useEffect } from 'react'

const Alert = ({msg,type,removeAlert,list}) => {
      useEffect(() => {
         const remove = setTimeout(()=> {
           removeAlert()
         },3000)
          return () => clearTimeout(remove) 
      },[list] )  //every time the list changes
      return <p className={`alert alert-${type}`}>{msg}</p>
}

export default Alert
