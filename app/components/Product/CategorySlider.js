"use client";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const categories = [
  { name: "ডিপ কালেকশন", slug: "deep-collection", image: "/images/DL-1.jpg" },
  {
    name: "স্ট্রাইপ এবং চেক লুঙ্গি",
    slug: "stripe-check",
    image: "/images/DL-2.jpg",
  },
  { name: "ফ্যান্সি লুঙ্গি", slug: "fancy-lungi", image: "/images/DL-3.jpg" },
  { name: "টু পার্ট লুঙ্গি", slug: "two-part", image: "/images/DL-7.jpg" },
  { name: "এক কালার লুঙ্গি", slug: "one-color", image: "/images/DL-1.jpg" },
  {
    name: "সাদা এবং অন্যান্য",
    slug: "white-and-others",
    image: "/images/DL-2.jpg",
  },
];

export default function CategorySlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    spacing: 8,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
    breakpoints: {
      "(max-width: 767px)": { slides: { perView: 4, spacing: 6 } },
      "(min-width: 768px)": { slides: { perView: 4, spacing: 15 } },
      "(min-width: 1024px)": { slides: { perView: 5, spacing: 20 } },
    },
    slides: { perView: 1, spacing: 0 },
  });

  // Auto slide effect
  useEffect(() => {
    if (!instanceRef.current) return;
    const interval = setInterval(() => {
      instanceRef.current.next();
    }, 3000); // Slide every 3 seconds
    return () => clearInterval(interval);
  }, [instanceRef]);

  return (
    <div className="py-6">
      <div className="w-full md:w-[90%] lg:w-[80%] xl:w-[75%] mx-auto">
        <h2 className="text-lg md:text-xl font-bold text-[#063238] mb-4 text-center">
          প্রোডাক্ট ক্যাটাগরি
        </h2>

        <div ref={sliderRef} className="keen-slider">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="keen-slider__slide flex flex-col items-center text-center"
            >
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 mb-2">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <span className="text-xs sm:text-sm md:text-base text-gray-800">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Dot Indicators */}
        {loaded && instanceRef.current && (
          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({
              length: instanceRef.current.track.details.slides.length,
            }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => instanceRef.current?.moveToIdx(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 ${
                  currentSlide === idx ? "bg-[#063238]" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
