import {IFormInputList} from '../InterFace/Interface'
import {InputHTMLAttributes} from 'react'
interface Iprops extends InputHTMLAttributes<HTMLInputElement>{}

const Input = ({...rest}:Iprops) => {
  return (<input  {...rest} />)

}

export default Input