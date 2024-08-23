import { ImageCard } from "@/components/image/image";
import Link from "next/link";

function Hero() {
  return (
    <section className="hero-section">
      <ImageCard
        src="/images/hero-mobile.png"
        alt="Fireplace with a stool next to it"
        width="360"
        height="360"
        className="hero-image"
      />

      <div className="hero-description">
        <p className="hero-headline">
          Discover the <br />
          perfect fireplace ...
        </p>
        <div className="consultation-booking-button"> 
      
      <Link href="/form" className="booking-link-main"> 
        Book consultation
        </Link> 
      
        </div>
      </div>
    </section>
  );
}

export default Hero;
