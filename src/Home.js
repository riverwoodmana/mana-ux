import { Header } from "./components/Header";
import {BodyMain} from "./components/BodyMain";
import { Footer } from "./components/Footer";

function Home() {
    return (
      <div className="container">
        <Header />
        <BodyMain />
        <Footer/>
      </div>
    );
  }
  
  export default Home;