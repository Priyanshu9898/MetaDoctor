import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-900 text-gray-100 py-8">
        <div className="container mx-auto px-4 flex flex-wrap items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">MetaDoctor</h2>
            <p className="text-gray-400">Transforming healthcare with AI</p>
          </div>
          <ul className="flex space-x-4 mt-4 md:mt-0">
            <li>
              <Link
                href="https://github.com/Priyanshu9898"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/Images/landingPage/github.png"
                  alt="GitHub"
                  className="w-8 h-8"
                />
              </Link>
            </li>
            <li>
              <Link
                href="https://www.linkedin.com/in/priyanshumalaviya/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/Images/landingPage/linkedin.png"
                  alt="LinkedIn"
                  className="w-8 h-8"
                />
              </Link>
            </li>
            <li>
              <Link
                href="https://twitter.com/Priyanshu2281"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/Images/landingPage/twitter.png"
                  alt="Twitter"
                  className="w-8 h-8"
                />
              </Link>
            </li>
            <li>
              <Link
                href="https://twitter.com/Priyanshu2281"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/Images/landingPage/instagram.png"
                  alt="Twitter"
                  className="w-8 h-8"
                />
              </Link>
            </li>
            <li>
              <Link
                href="https://medium.com/@priyanshumalaviya9210"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/Images/landingPage/blog.png"
                  alt="Medium"
                  className="w-8 h-8"
                />
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default Footer;
