import Head from 'next/head'
import { Homepage } from './homepage'
import { request } from '../lib/datocms'



export default function Home(props) {
  const {data} = props
  const homepage = data.startPage
  console.log(homepage)
  return (
    <>
      <Head>
        <title>CMS uppgift</title>
      </Head>
     <Homepage data={homepage}/>
    
    </>
  )
}

const HOMEPAGE_QUERY = `
query MyQuery {
  startPage {
    title
    heroImage {
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
    heroText {
      value
    }
  }
}
`
export async function getStaticProps(){
  const data = await request({
    query: HOMEPAGE_QUERY
  })
  return {
    props: {data}
  }
}