import React from "react";

const Hero = () => {
  return (
    <div className="bg-blue-500 text-white py-16 text-center">
      <div className="container mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          Welcome to Your Blog!
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-8">
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
  );
};

export default Hero;
