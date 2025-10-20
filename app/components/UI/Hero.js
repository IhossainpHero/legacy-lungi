"use client";
import Image from "next/image";
import BannerImage from "../../../public/images/banner5.png";

const Hero = () => {
  return (
    <section className="relative w-full">
      <div className="relative w-full aspect-[16/9] sm:aspect-[16/7] md:aspect-[16/6] lg:aspect-[16/5] xl:aspect-[16/4] 2xl:aspect-[16/3]">
        <Image
          src={BannerImage}
          alt="Hero Banner"
          fill
          className="object-cover object-top"
          priority
        />
      </div>
    </section>
  );
};

export default Hero;
