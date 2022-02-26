import Link from "next/link"
import PageLayout from "../components/PageLayout"
import Image from "next/image"

export default function Home({ articles }) {
  return (
    <PageLayout title="Home">
      <section>
        <h1>News App</h1>
        <Link href='about'>About</Link>
        <section>
        {articles.length === 0 && <p>No articles</p>}
        {articles.length > 0 && articles.map((article, index) => (
          <div key={index}>
            <Image 
              alt={`Image for the article ${article.title}`} 
              src={article.urlToImage} 
              width={450}
              height={350}
              layout='responsive'
            />
            <h3>{article.title}</h3>
            <p>
              {article.description}
            </p>
          </div>
        ))}
        </section>
      </section>
    </PageLayout>
  )
}
//a1f56401ee244370927d13fb5783413
// N requests --> se ejecuta en el buildtime o cuando se refresca
export async function getStaticProps() {
  const response = await fetch('https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&language=en&apiKey=a1f56401ee244370927d13fb57834132')
  const { articles } = await response.json()
  console.log(typeof(articles))
  for(var i = 0; i < articles.length; i++){ 
    if (articles[i].urlToImage === null) { 
      articles.splice(i, 1); 
    }
  }
  return {
    props: {
      articles
    }
  }
}


// Para datos que necesitan ser MUYYYY live
//export async function getServerSideProps() {
//  const response = await fetch('https://newsapi.org/v2/everything?q=Apple&from=2022-02-25&sortBy=popularity&apiKey=a1f56401ee244370927d13fb57834132')
//  const { articles } = await response.json()
//  return {
//    props: {
//      articles
//    }
//  }
//}
