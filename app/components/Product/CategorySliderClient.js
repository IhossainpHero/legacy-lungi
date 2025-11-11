"use client";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CategorySliderClient({ categories = [] }) {
  const [currentDot, setCurrentDot] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: false,
    breakpoints: {
      "(max-width: 767px)": { slides: { perView: 4, spacing: 6 } },
      "(min-width: 768px)": { slides: { perView: 4, spacing: 15 } },
      "(min-width: 1024px)": { slides: { perView: 5, spacing: 20 } },
    },
    slides: { perView: 1, spacing: 0 },
    created() {
      setLoaded(true);
    },
    slideChanged(slider) {
      const idx = Math.floor(slider.track.details.rel / 4);
      setCurrentDot(idx);
    },
  });

  // ✅ Auto slide (3s পর slide হবে, কিন্তু শেষ dot এ থেমে যাবে)
  useEffect(() => {
    if (!instanceRef.current) return;
    const totalDots = Math.ceil(categories.length / 4);
    let interval = setInterval(() => {
      instanceRef.current?.next();

      const currentIndex = instanceRef.current.track.details.rel;
      const maxIndex =
        instanceRef.current.track.details.slides.length -
        instanceRef.current.options.slides.perView;

      if (currentIndex >= maxIndex) {
        clearInterval(interval);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [instanceRef, categories]);

  if (!categories.length) return null;

  const totalDots = Math.ceil(categories.length / 4);

  return (
    <div className="py-6 relative">
      <div className="w-full md:w-[90%] lg:w-[80%] xl:w-[75%] mx-auto relative">
        <h2 className="text-lg md:text-xl font-bold text-[#063238] mb-4 text-center">
          প্রোডাক্ট ক্যাটাগরি
        </h2>

        {/* ✅ Slider */}
        <div className="relative">
          <div ref={sliderRef} className="keen-slider">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="keen-slider__slide flex flex-col items-center text-center"
              >
                <div className="relative w-16 sm:w-24 md:w-28 lg:w-32 h-20 sm:h-32 md:h-36 lg:h-40 mb-2 rounded overflow-hidden shadow-md">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 768px) 100vw,
         (max-width: 1200px) 50vw,
         25vw"
                    className="object-cover"
                  />
                </div>
                <span className="text-xs sm:text-sm md:text-base text-gray-800">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>

          {/* ✅ Left Arrow */}
          {loaded && (
            <button
              onClick={() => instanceRef.current?.prev()}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white text-gray-900 rounded-full p-2 shadow hover:bg-gray-100 z-10"
            >
              &#8592;
            </button>
          )}

          {/* ✅ Right Arrow */}
          {loaded && (
            <button
              onClick={() => instanceRef.current?.next()}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white text-gray-900 rounded-full p-2 shadow hover:bg-gray-100 z-10"
            >
              &#8594;
            </button>
          )}
        </div>

        {loaded && instanceRef.current && (
          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: totalDots }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx * 4);
                  setCurrentDot(idx);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                  currentDot === idx ? "bg-[#063238]" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${idx + 1}`} // ✅ Add this
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
