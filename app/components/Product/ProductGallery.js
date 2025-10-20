import Image from "next/image";
import { useState } from "react";

export default function ProductGallery({ images }) {
  const [selected, setSelected] = useState(0);

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Main Image */}
      <div className="flex-1 border rounded-lg p-2">
        <Image
          src={images[selected]}
          alt={`Product image ${selected + 1}`}
          width={600}
          height={600}
          className="rounded-lg"
        />
      </div>

      {/* Thumbnail Images */}
      <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto md:h-[600px]">
        {images.map((img, idx) => (
          <div
            key={idx}
            onClick={() => setSelected(idx)}
            className={`cursor-pointer border rounded-lg p-1 ${
              selected === idx ? "border-blue-600" : "border-gray-300"
            }`}
          >
            <Image
              src={img}
              alt={`Thumbnail ${idx}`}
              width={100}
              height={100}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
