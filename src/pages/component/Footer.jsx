import React from "react";

function Footer() {
  return (
    <footer className="footer p-10 bg-base-200 text-base-content mt-5">
      <div>
        <svg
          width="100"
          height="50"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          clipRule="evenodd"
          className="fill-current"
        >
          <text x="11" y="18" fontSize="20" fontWeight="bold">
            FH
          </text>
        </svg>

        <p>
          FileHost Made By VRNITSOLUTION
          <br />
          Providing reliable tech since 2023
        </p>
      </div>
      <div>
        <span className="footer-title">Services</span>
        <a href="http://vrnitsolution.tech/" className="link link-hover">
          Web Design
        </a>
        <a href="http://vrnitsolution.tech/" className="link link-hover">
          App Design
        </a>
        <a href="http://vrnitsolution.tech/" className="link link-hover">
          Marketing
        </a>
        <a href="http://vrnitsolution.tech/" className="link link-hover">
          Advertisement
        </a>
      </div>
      <div>
        <span className="footer-title">Company</span>
        <a href="http://vrnitsolution.tech/" className="link link-hover">
          About us
        </a>
        <a href="http://vrnitsolution.tech/" className="link link-hover">
          Contact
        </a>
        <a href="http://vrnitsolution.tech/" className="link link-hover">
          Jobs
        </a>
        <a href="http://vrnitsolution.tech/" className="link link-hover">
          Press kit
        </a>
      </div>
      <div>
        <span className="footer-title">Legal</span>
        <a href="http://vrnitsolution.tech/" className="link link-hover">
          Terms of use
        </a>
        <a href="http://vrnitsolution.tech/" className="link link-hover">
          Privacy policy
        </a>
        <a href="http://vrnitsolution.tech/" className="link link-hover">
          Cookie policy
        </a>
      </div>
    </footer>
  );
}

export default Footer;
