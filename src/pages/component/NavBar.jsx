import React, { useState, useEffect } from "react";

function NavBar() {
  const themes = [
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
    { value: "cupcake", label: "Cupcake" },
    { value: "bumblebee", label: "Bumblebee" },
    { value: "emerald", label: "Emerald" },
    { value: "corporate", label: "Corporate" },
    { value: "synthwave", label: "Synthwave" },
    { value: "retro", label: "Retro" },
    { value: "cyberpunk", label: "Cyberpunk" },
    { value: "valentine", label: "Valentine" },
    { value: "halloween", label: "Halloween" },
    { value: "garden", label: "Garden" },
    { value: "forest", label: "Forest" },
    { value: "aqua", label: "Aqua" },
    { value: "lofi", label: "Lo-Fi" },
    { value: "pastel", label: "Pastel" },
    { value: "fantasy", label: "Fantasy" },
    { value: "wireframe", label: "Wireframe" },
    { value: "black", label: "Black" },
    { value: "luxury", label: "Luxury" },
    { value: "dracula", label: "Dracula" },
    { value: "cmyk", label: "CMYK" },
    { value: "autumn", label: "Autumn" },
    { value: "business", label: "Business" },
    { value: "acid", label: "Acid" },
    { value: "lemonade", label: "Lemonade" },
    { value: "night", label: "Night" },
    { value: "coffee", label: "Coffee" },
    { value: "winter", label: "Winter" },
  ];

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  return (
    <>
      <div className="navbar bg-base-100 shadow">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex="0" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex="0"
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a href="#my-modal-4">Privacy</a>
              </li>
              <li>
                <a href="#my-modal-5">Terms</a>
              </li>
              <li>
                <select value={theme} onChange={handleThemeChange}>
                  {themes.map((theme) => (
                    <option key={theme.value} value={theme.value}>
                      {theme.label}
                    </option>
                  ))}
                </select>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost normal-case text-xl">FileHost</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a href="#my-modal-4">Privacy</a>
            </li>
            <li>
              <a href="#my-modal-5">Terms</a>
            </li>
            <li>
              <select value={theme} onChange={handleThemeChange}>
                {themes.map((theme) => (
                  <option key={theme.value} value={theme.value}>
                    {theme.label}
                  </option>
                ))}
              </select>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default NavBar;
