import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

import "./Sidebar.scss";
import Logo from "../../assets/images/logo.png";

function Sidebar() {
  //dropdown useStates
  const [carOpen, setCarOpen] = useState(false);
  const [motorcycleOpen, setMotorcycleOpen] = useState(false);
  const [mhOpen, setMhOpen] = useState(false);
  const [vanOpen, setVanOpen] = useState(false);
  const [truckOpen, setTruckOpen] = useState(false);
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [sttOpen, setSttOpen] = useState(false);
  const [stOpen, setStOpen] = useState(false);
  const [coacheOpen, setCoacheOpen] = useState(false);
  const [avOpen, setAvOpen] = useState(false);
  const [cmOpen, setCmOpen] = useState(false);
  const [ftOpen, setFtOpen] = useState(false);
  const [usersOpen, setUsersOpen] = useState(false);

  return (
    <div className="nav-bar_wrapper">
      <div className="nav-bar_wrapper_inner">
        <div className="logo_wrapper">
          <Link className="nav_link" to="/admins">
            <img src={Logo} alt="" />
            SellCenter
          </Link>
        </div>
        <nav>
          <ul className="nav_list">
            <li className="nav_list_item">
              <NavLink className="nav_link" to="/admins">
                Admins
              </NavLink>
            </li>
            <li className="nav_list_item">
              <NavLink
                className="nav_link"
                to="/"
                onClick={() => setUsersOpen(!usersOpen)}
              >
                Users
                <i className="fa-solid fa-chevron-right"></i>
              </NavLink>
            </li>
            <ul
              className={`dropdown ${
                usersOpen ? "drop_active" : "drop_inactive"
              }`}
            >
              <li>
                <NavLink to="/users/company">Users Company</NavLink>
              </li>
            </ul>
            <li className="nav_list_item">
              <NavLink className="nav_link" to="/ads">
                Ads
              </NavLink>
            </li>
            <li className="nav_list_item">
              <NavLink className="nav_link" to="/news">
                News
              </NavLink>
            </li>
            <li className="nav_list_item">
              <NavLink className="nav_link" to="/slider">
                Slider
              </NavLink>
            </li>
            <li className="nav_list_item">
              <NavLink className="nav_link" to="/payment">
                Payment
              </NavLink>
            </li>
            <li className="nav_list_item">
              <NavLink
                className="nav_link"
                to="/cars"
                onClick={() => setCarOpen(!carOpen)}
              >
                Cars
                <i className="fa-solid fa-chevron-right"></i>
              </NavLink>
            </li>
            <ul
              className={`dropdown ${
                carOpen ? "drop_active" : "drop_inactive"
              }`}
            >
              <li>
                <NavLink to="/cars/marks">Marks</NavLink>
              </li>
            </ul>
            <li className="nav_list_item">
              <NavLink
                className="nav_link"
                to="/motorcycle"
                onClick={() => setMotorcycleOpen(!motorcycleOpen)}
              >
                Motorcycle
                <i className="fa-solid fa-chevron-right"></i>
              </NavLink>
            </li>
            <ul
              className={`dropdown ${
                motorcycleOpen ? "drop_active" : "drop_inactive"
              }`}
            >
              <li>
                <NavLink to="motorcycle/marks">Makrs</NavLink>
              </li>
            </ul>
            <li className="nav_list_item">
              <NavLink
                className="nav_link"
                to="/motorhome"
                onClick={() => setMhOpen(!mhOpen)}
              >
                Motor Home
                <i className="fa-solid fa-chevron-right"></i>
              </NavLink>
            </li>
            <ul
              className={`dropdown ${mhOpen ? "drop_active" : "drop_inactive"}`}
            >
              <li>
                <NavLink to="motorhome/marks">Marks</NavLink>
              </li>
            </ul>
            <li className="nav_list_item">
              <NavLink
                className="nav_link"
                to="/van"
                onClick={() => setVanOpen(!vanOpen)}
              >
                Van
                <i className="fa-solid fa-chevron-right"></i>
              </NavLink>
            </li>
            <ul
              className={`dropdown ${
                vanOpen ? "drop_active" : "drop_inactive"
              }`}
            >
              <li>
                <NavLink to="/van/marks">Marks</NavLink>
              </li>
            </ul>
            <li className="nav_list_item">
              <NavLink
                className="nav_link"
                to="/truck"
                onClick={() => setTruckOpen(!truckOpen)}
              >
                Truck
                <i className="fa-solid fa-chevron-right"></i>
              </NavLink>
            </li>

            <ul
              className={`dropdown ${
                truckOpen ? "drop_active" : "drop_inactive"
              }`}
            >
              <li>
                <NavLink to="/truck/marks">Marks</NavLink>
              </li>
            </ul>
            <li className="nav_list_item">
              <NavLink
                className="nav_link"
                onClick={() => setTrailerOpen(!trailerOpen)}
                to="/trailer"
              >
                Trailer
                <i className="fa-solid fa-chevron-right"></i>
              </NavLink>
            </li>
            <ul
              className={`dropdown ${
                trailerOpen ? "drop_active" : "drop_inactive"
              }`}
            >
              <li>
                <NavLink to="/trailer/marks">Marks</NavLink>
              </li>
            </ul>
            <li className="nav_list_item">
              <NavLink
                className="nav_link"
                to="/semitruck"
                onClick={() => setSttOpen(!sttOpen)}
              >
                Semi Trailer Truck
                <i className="fa-solid fa-chevron-right"></i>
              </NavLink>
            </li>
            <ul
              className={`dropdown ${
                sttOpen ? "drop_active" : "drop_inactive"
              }`}
            >
              <li>
                <NavLink to="/semitruck/marks">Marks</NavLink>
              </li>
            </ul>
            <li className="nav_list_item">
              <NavLink
                className="nav_link"
                to="/semi-trailer"
                onClick={() => setStOpen(!stOpen)}
              >
                Semi Trailer
                <i className="fa-solid fa-chevron-right"></i>
              </NavLink>
            </li>
            <ul
              className={`dropdown ${stOpen ? "drop_active" : "drop_inactive"}`}
            >
              <li>
                <NavLink to="/semi-trailer/marks">Marks</NavLink>
              </li>
            </ul>
            <li className="nav_list_item">
              <NavLink
                className="nav_link"
                to="/coache"
                onClick={() => setCoacheOpen(!coacheOpen)}
              >
                Coache
                <i className="fa-solid fa-chevron-right"></i>
              </NavLink>
            </li>
            <ul
              className={`dropdown ${
                coacheOpen ? "drop_active" : "drop_inactive"
              }`}
            >
              <li>
                <NavLink to="/coache/marks">Marks</NavLink>
              </li>
            </ul>
            <li className="nav_list_item">
              <NavLink
                className="nav_link"
                to="/agricultural-vehicle"
                onClick={() => setAvOpen(!avOpen)}
              >
                Agricultural Vehicle
                <i className="fa-solid fa-chevron-right"></i>
              </NavLink>
            </li>
            <ul
              className={`dropdown ${avOpen ? "drop_active" : "drop_inactive"}`}
            >
              <li>
                <NavLink to="/agricultural-vehicle/marks">Marks</NavLink>
              </li>
            </ul>
            <li className="nav_list_item">
              <NavLink
                className="nav_link"
                to="/construction-machines"
                onClick={() => setCmOpen(!cmOpen)}
              >
                Construction Machines
                <i className="fa-solid fa-chevron-right"></i>
              </NavLink>
            </li>
            <ul
              className={`dropdown ${cmOpen ? "drop_active" : "drop_inactive"}`}
            >
              <li>
                <NavLink to="/construction-machines/marks">Marks</NavLink>
              </li>
            </ul>
            <li className="nav_list_item">
              <NavLink
                className="nav_link"
                to="/forklift"
                onClick={() => setFtOpen(!ftOpen)}
              >
                Forklift Trucks
                <i className="fa-solid fa-chevron-right"></i>
              </NavLink>
            </li>
            <ul
              className={`dropdown ${ftOpen ? "drop_active" : "drop_inactive"}`}
            >
              <li>
                <NavLink to="/forklift/marks">Marks</NavLink>
              </li>
            </ul>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
