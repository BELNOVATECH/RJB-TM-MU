import { useEffect, useState } from "react";

export default function Home() {

  const images = [
    "/assets/banner1.jpg",
    "/assets/banner2.jpg",
    "/assets/banner3.jpg"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto change image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-serif">

      {/* 🔶 HERO SECTION */}
      <div className="bg-orange-500 text-white text-center py-10">

        {/* 🔥 Image Slider */}
        <img 
          src={images[currentIndex]}
          alt="Temple"
          className="mx-auto w-80 h-52 object-cover rounded-lg shadow-lg transition-all duration-700"
        />

        {/* Play Button */}
        <div className="mt-6">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-lg cursor-pointer">
            ▶
          </div>
        </div>

        <h2 className="mt-6 text-xl">श्रीराम मंदिर, अयोध्या</h2>
        <h1 className="text-2xl font-bold">
          SHRI RAM MANDIR, AYODHYA
        </h1>

        <button className="mt-4 bg-white text-black px-6 py-2 rounded-full shadow">
          Live Darshan
        </button>

        <h1 className="mt-8 text-3xl font-bold">
          WELCOME TO AYODHYA DHAM
        </h1>

        <button className="mt-4 bg-white text-black px-6 py-2 rounded-full shadow">
          Visitor Registration
        </button>
      </div>

      {/* rest same */}
    </div>
  );
}