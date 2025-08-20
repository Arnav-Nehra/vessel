import Features from "./Features";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import NavBar from "./NavBar";

export default function Landing(){
    return <div className="min-h-screen">
        <NavBar /> 
        <HeroSection/>
        <Features/>
        <Footer/>
    </div>
}