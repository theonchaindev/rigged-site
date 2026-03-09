import Nav from "./components/Nav";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import LiveFeed from "./components/LiveFeed";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <LiveFeed />
      </main>
      <Footer />
    </>
  );
}
