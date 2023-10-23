import { Feed } from "@/components"

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover, Dive & Discuss
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">Explore the Hacker News Universe</span>
      </h1>
      <Feed />
    </section>
  )
}

export default Home
