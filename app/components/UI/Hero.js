"use client";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Responsive height: small devices - 220px, medium - 350px, large - 500px */}
      <div className="relative w-full h-[220px] sm:h-[350px] md:h-[450px] lg:h-[500px] xl:h-[550px]">
        <picture className="absolute inset-0 w-full h-full">
          {/* Desktop Banner */}
          <source
            media="(min-width:1024px)"
            srcSet="/images/banner-desktop.png"
          />
          {/* Tablet Banner */}
          <source
            media="(min-width:640px)"
            srcSet="/images/banner-tablet.png"
          />
          {/* Mobile Banner */}
          <Image
            src="/images/banner-mobile.png"
            alt="Legacy Lungi Banner"
            fill
            className="object-cover w-full h-full"
            priority
          />
        </picture>
      </div>
    </section>
  );
}
