import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import navStyle from "./navbar.module.css";

export function Navbar({ loggedinUser, remove }) {
  const navigate = useNavigate();
  const [optionValue, setOptionValue] = useState("");

  function handleChange(e) {
    setOptionValue(e);
    navigate(`${e}`);
  }

  function logOut() {
    remove();
    navigate("/login");
  }

  const menuItems = [
    { title: "Home", url: "/home" },
    { title: "All", url: "/all" },
  ];

  const platformItems = [
    { title: "Pc", url: "pc", type: "platform" },
    { title: "Browser", url: "browser", type: "platform" },
  ];

  const sortedItems = [
    { title: "Released Date", url: "released-date", type: "sort-by" },
    { title: "Popularity", url: "popularity", type: "sort-by" },
    { title: "Alphabetical", url: "alphabetical", type: "sort-by" },
    { title: "Relevance", url: "relevance", type: "sort-by" },
  ];

  const categoryItems = [
    { title: "Racing", url: "racing", type: "category" },
    { title: "Sports", url: "sports", type: "category" },
    { title: "Shooter", url: "shooter", type: "category" },
    { title: "Open World", url: "open-world", type: "category" },
    { title: "Fantasy", url: "fantasy", type: "category" },
    { title: "Action", url: "action", type: "category" },
    { title: "Flight", url: "flight", type: "category" },
  ];

  const Dropdown = ({ title, items }) => (
    <li>
      <div className="dropdown">
        <Link
          className="dropdown-toggle text-white text-decoration-none"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {title}
        </Link>
        <ul className="dropdown-menu">
          {items.map((el, idx) => (
            <li key={idx} className={el.type}>
              <Link
                className="dropdown-item"
                to={`/game-details/${el.type}/${el.url}`}
              >
                {el.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );

  return (
    <nav className="navbar navbar-expand-lg mb-3">
      <div className="container w-90">
        <Link className="navbar-brand" to="/home">
          <img
            src={require("../../Images/logo.png")}
            alt=""
            className={navStyle.gameLogo + " fa-spin"}
          />
          Gameover
        </Link>

        {loggedinUser ? (
          <ul className="navbar-nav m-auto d-flex align-items-center justify-content-around w-50">
            {menuItems.map((el, idx) => (
              <li key={idx} className="nav-item">
                <Link className="nav-link" aria-current="page" to={el.url}>
                  {el.title}
                </Link>
              </li>
            ))}

            <Dropdown title="Platform" items={platformItems} />
            <Dropdown title="Sort-By" items={sortedItems} />
            <Dropdown title="Categories" items={categoryItems} />

            <button
              onClick={logOut}
              className={
                navStyle.freeBtn + " ms-5 logout btn btn-outline-info px-3"
              }
            >
              LogOut
            </button>
          </ul>
        ) : (
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/login">
                <button
                  className={navStyle.freeBtn + " btn btn-outline-info px-3"}
                >
                  Join free
                </button>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/register">
                <button
                  className={navStyle.freeBtn + " btn btn-outline-info px-3"}
                >
                  Register
                </button>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
