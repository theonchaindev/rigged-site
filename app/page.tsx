import Nav from "./components/Nav";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import LiveFeed from "./components/LiveFeed";
import Footer from "./components/Footer";
import DistroFloat from "./components/DistroFloat";

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
      <DistroFloat />
    </>
  );
}
