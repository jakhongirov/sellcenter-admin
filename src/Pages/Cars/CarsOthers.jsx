import { useState, useEffect } from "react";
import Header from "../../Containers/Header/Header";
import "./Cars.scss";
import http from "../../axios.config";
import Edit from "../../assets/images/icons/edit.svg";
import DeleteSvg from "../../assets/images/icons/delete.svg";
import useToken from "../../Hooks/useToken";

function CarsOthers() {
  const [token, setToken] = useToken();
  const [carsList, setCarsList] = useState({
    isFetched: false,
    data: [],
    err: false,
  });

  useEffect(() => {
    http
      .get(`car/others`, {
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      })
      .then((res) =>
        setCarsList({
          isFetched: true,
          data: res.data.data,
          err: false,
        })
      )
      .catch((error) =>
        setCarsList({
          isFetched: true,
          data: [],
          err: error,
        })
      );
  }, []);

 
  return (
    <div>
      {carsList.isFetched ? (
        <div className="container">
          <Header />
          <div className="table_wrap ">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {carsList.data?.map((car, index) => (
                  <tr key={index} className="table_tr">
                    <td>{car.car_make_id}</td>
                    <td>{car.car_make_name}</td>
                    <td></td>
                    <td></td>
                    <td className="btns">
                      <button className="edit">
                        <img src={Edit} alt="edit" />
                      </button>
                      <button className="delete">
                        <img src={DeleteSvg} alt="deleteBtn" />
                      </button>
                      <button className="ellipsis">
                        <i className="fa-solid fa-ellipsis"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="loader">
          <div className="loader__wrap">
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
            <div className="bar4"></div>
            <div className="bar5"></div>
            <div className="bar6"></div>
            <div className="bar7"></div>
            <div className="bar8"></div>
            <div className="bar9"></div>
            <div className="bar10"></div>
            <div className="bar11"></div>
            <div className="bar12"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CarsOthers;
