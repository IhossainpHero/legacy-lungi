"use client";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Small devices: 0 - 639px → Hero3 */}
      <div className="block sm:hidden relative w-full h-[220px]">
        <Image
          src="/images/Hero3.png"
          alt="Hero3 Banner"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Medium devices: 640px - 1046px → Hero1 */}
      <div className="hidden sm:block lg:hidden relative w-full h-[340px] md:h-[450px]">
        <Image
          src="/images/Hero3.png"
          alt="Hero1 Banner"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Large devices: >1046px → Hero2 */}
      <div className="hidden lg:block relative w-full h-[520px]">
        <Image
          src="/images/Hero1.png"
          alt="Hero2 Banner"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_20%]"
        />
      </div>
    </section>
  );
}
