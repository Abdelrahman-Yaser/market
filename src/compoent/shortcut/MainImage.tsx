interface Iimage{
    src:any,
    alt:string
}

const MainImage = ({src,alt}:Iimage) => {
  return (
    <img
 alt={alt} src={src} className="w-10 h-10 rounded-full p-2 items-center object-bottom"/>
  )
}

export default MainImage