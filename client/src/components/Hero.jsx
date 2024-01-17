import React from "react";

const Hero = () => {
  return (
    <div className="relative overflow-hidden h-1/3">
      {/* Watercolor background */}
      <svg
        className="absolute inset-0"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="watercolor-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop
              offset="0%"
              style={{ stopColor: "#87CEEB", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#4682B4", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
        <rect fill="url(#watercolor-gradient)" width="100%" height="100%" />
      </svg>

      {/* Content */}
      <div className="relative bg-transparent py-16 text-center">
        <div className="container mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
            Welcome to Your Blog!
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-8 text-white">
            Share your thoughts, experiences, and stories with the world.
          </p>
          {/* Add a button or link to encourage users to create a post */}
          <a
            href="/create"
            className="bg-white text-blue-500 px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-200 transition duration-300"
          >
            Create a Post
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
