import { HTMLAttributes } from "react"

interface Iprops extends HTMLAttributes<HTMLSpanElement>{
    color:string
}

export const Cercel = ({color,...rest}:Iprops) => {


  return (
    <span className={` block w-6 h-6   rounded-full m-2`} style={{backgroundColor:color}}{...rest} ></span>  
  )
}
