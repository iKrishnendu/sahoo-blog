import React from "react";
import { FaGithub, FaThumbsUp } from "react-icons/fa";

const AboutPage = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">About Me</h1>
      <p className="text-lg text-gray-700">
        Hello, I'm Krishnendu Sahoo, a passionate Computer Science student
        currently pursuing B.Tech. I have a keen interest in web development,
        and my skills include React, Node.js, Express, and MongoDB.
      </p>
      <p className="text-lg text-gray-700 mt-4">
        I love exploring new technologies and creating meaningful projects. My
        goal is to leverage technology to solve real-world problems and make a
        positive impact.
      </p>
      <p className="text-lg text-gray-700 mt-4">
        Feel free to explore my blog and projects to get insights into my
        journey and learnings in the world of programming.
      </p>

      {/* GitHub Section */}
      <div className="flex items-center mt-8">
        <a
          href="https://github.com/ikrishnendu"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 hover:text-blue-500 flex items-center mr-4"
        >
          <FaGithub className="mr-2" />
          GitHub
        </a>

        <a
          href="https://github.com/ikrishnendu/sahoo-blog"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 hover:text-blue-500 flex items-center mr-4"
        >
          <FaGithub className="mr-2" />
          Repository
        </a>
      </div>
    </div>
  );
};

export default AboutPage;
