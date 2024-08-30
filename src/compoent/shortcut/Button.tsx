import { ReactNode } from "react"

interface Iprops{
    children:ReactNode,
    className?:string,
    type:"submit" |"reset" |"button",
}

const Button = ({children,className,type} :Iprops) => {
return (
    <button className={`${className} w-full bg-sky-500 mx-1 my-1 rounded-md`} type={`${type}`}>{children}</button>
)
}

export default Button