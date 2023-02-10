import Link from "next/link"
import { Image, StructuredText } from "react-datocms"
import { request } from "../../lib/datocms"

export default function Articles(props){
const {data} = props
const posts = data.allPostsLists
console.log(posts)
return(
        <div>
           <button style={{
            backgroundColor:"white",
            color: "black",
            border:"none", 
            borderRadius:"10px",
            padding:"15px",
        }}><Link href='/'>Tillbaka till förstasidan</Link></button>
            {posts.map((post) => (
                <ArticlePreview data={post} key={post.title}/>
            ))}
        </div>
    )
}

export function ArticlePreview(props){
    const {data} = props
    return(
        <div style={{
            width: "30%",
            margin: "0 auto 5rem",
        }}>
           
           <Link href={`articles/${data.slug}`}> 
           <h1>{data.title}</h1>
            <Image data={data.picture.responsiveImage}/>
            <StructuredText data={data.description}/>
            </Link>
            <small>{data.date}</small>
        </div>
    )
}

const ARTICLESPAGE_QUERY = `
query MyQuery {
    allPostsLists {
      title
      slug
      date
      picture {
        responsiveImage {
          alt
          aspectRatio
          base64
          bgColor
          height
          sizes
          src
          srcSet
          title
          webpSrcSet
          width
        }
      }
      content {
        value
      }
      description {
        value
      }
    }
  }
  
`

export async function getStaticProps(){
    const data = await request({
      query: ARTICLESPAGE_QUERY
    })
    return {
      props: {data}
    }
  }