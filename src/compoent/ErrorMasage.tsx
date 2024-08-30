

interface Iprops{
    msg:string
}
const ErrorMasage = ({msg}:Iprops) => {
  return msg?<span className="block text-red-500 text-sm">{msg}</span>:null
  
}

export default ErrorMasage