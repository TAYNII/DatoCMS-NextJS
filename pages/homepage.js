import Link from "next/link"
import { Image, StructuredText } from "react-datocms"

export const Homepage = (props) => {
    const {data} = props
  return (
    <div>
        <h1>{data.title}</h1>
        <button style={{
            backgroundColor:"white",
            color: "black",
            border:"none", 
            borderRadius:"10px",
            padding:"15px",
        }}><Link href='/articles'>Till poster</Link></button>
        <div style={{
            width: "60%",
            margin: "0 auto",
            opacity: "50%"
        }}>
        <Image data={data.heroImage.responsiveImage}/>
        </div>
        <StructuredText data={data.heroText}/>

    </div>
  )
}
