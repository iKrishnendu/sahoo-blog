import React from "react";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  const githubRepoURL = "https://github.com/ikrishnendu/sahoo-blog";
  return (
    <footer className="bg-gray-900 text-white py-8 px-4 pb-2">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tagline Column */}
        <div className="text-center lg:text-left">
          <div className="text-xl font-semibold mb-2">Sahoo Blog.</div>
          <p className="text-sm text-gray-400 mb-4">
            Exploring Ideas, Inspiring Minds: Your Source for Thoughtful
            Insights
          </p>
          <div className="flex items-center">
            <span className="mr-2">Like this project?</span>
            <a
              href={githubRepoURL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-200"
            >
              <FaGithub size={20} />
            </a>
            <span className="ml-2">
              Star it on{" "}
              <a
                href={githubRepoURL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                GitHub
              </a>
            </span>
          </div>
        </div>

        {/* Pages Column */}
        <div className="flex flex-col space-y-4">
          <h2 className="text-lg font-semibold mb-2">Our Pages</h2>
          <ul>
            <li>
              <a
                href="/about"
                className="hover:text-gray-200 text-gray-400 hover:border-b-2 hover:border-white transition-all"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/create"
                className="hover:text-gray-200 text-gray-400 hover:border-b-2 hover:border-white transition-all"
              >
                Write Blog
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:text-gray-200 text-gray-400 hover:border-b-2 hover:border-white transition-all"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Newsletter</h2>
          <p className="text-sm text-gray-400 mb-2">
            Subscribe to Our Newsletter
          </p>
          <div className="flex items-center">
            <input
              type="email"
              placeholder="Your Email"
              className="bg-gray-800 text-white   px-4 py-2 rounded-l-md focus:outline-none"
            />
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-md hover:shadow-lg transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Sahoo Blog. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
