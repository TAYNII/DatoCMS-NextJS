import { Image, StructuredText } from "react-datocms"
import { request } from "../../lib/datocms"
import Link from "next/link"

export default function Post(props){
    const {data} = props
    console.log(data)
    return(
      <>

        <div style={{
            width: "50%",
            margin: "0 auto 5rem",
        }}>
             <button style={{
            backgroundColor:"white",
            color: "black",
            border:"none", 
            borderRadius:"10px",
            padding:"15px",
        }}><Link href='/articles'>Tillbaka</Link></button>
             <h1>{data.postsList.title}</h1>
            <Image data={data.postsList.picture.responsiveImage} />
            <StructuredText data={data.postsList.content}/>
            <small>{data.postsList.date}</small>
        </div>

        </>
    )
}













const PATH_QUERY = `
query MyQuery {
    allPostsLists {
      slug
    }
  }
  
`
export async function getStaticPaths(){
    const slugQuery = await request({
        query: PATH_QUERY
    })
    let paths = []
    slugQuery.allPostsLists.map((posts)=> paths.push(`/articles/${posts.slug}`))

    return{
        paths,
        fallback: false
    }
}

const POST_QUERY = `
query MyQuery($slug: String) {
    postsList(filter: {slug: {eq: $slug}}) {
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


export async function getStaticProps({params}){
    const data = await request({
      query: POST_QUERY,
      variables: {slug:params.slug}
    })
    return {
      props: {data}
    }
  }