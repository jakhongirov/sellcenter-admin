import { useState, useEffect } from "react";
import Header from "../../Containers/Header/Header";
import "./Cars.scss";
import http from "../../axios.config";
import Edit from "../../assets/images/icons/edit.svg";
import DeleteSvg from "../../assets/images/icons/delete.svg";
import DeleteModal from "../../Components/DeleteModal/DeleteModal";
import Pagination from "../../Components/Pagination/Pagination";
import { Link } from "react-router-dom";
import useToken from "../../Hooks/useToken";

function Cars() {
  const [offset, setOffset] = useState(0);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedSliderMakeId, setSelectedSliderMakeId] = useState(null);
  const [token, setToken] = useToken();
  const [carsList, setCarsList] = useState({
    isFetched: false,
    data: [],
    err: false,
  });

  useEffect(() => {
    http
      .get(`cars/admin/list?limit=10&offset=${offset}`, {
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
  }, [offset]);

  const checkboxChange = (e) => {
    const id = JSON.parse(e.target.dataset.id);
    const status = e.target.checked;

    fetch("https://server.sellcenter.eu/api/v1/car/update/status", {
      method: "PUT",
      body: JSON.stringify({
        car_id: id,
        status: status,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      {carsList.isFetched ? (
        <div className="container">
          <Header />
          <div className="table_wrap ">
            <DeleteModal
              deleteModal={deleteModal}
              setDeleteModal={setDeleteModal}
              api={"car/delete"}
              id={"car_id"}
              mark_id={selectedSliderMakeId - 0}
            />
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Mark</th>
                  <th>Model</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {carsList.data?.map((car, index) => (
                  <tr key={index} className="table_tr">
                    <td>{++index}</td>
                    <td>{car.car_make}</td>
                    <td>{car.car_model}</td>
                    <td>{car.car_price}€</td>
                    <td>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          data-id={car.car_id}
                          defaultChecked={car.car_active}
                          onChange={checkboxChange}
                        />
                        <div className="toggle-switch-background">
                          <div className="toggle-switch-handle"></div>
                        </div>
                      </label>
                    </td>
                    <td className="btns">
                      <button
                        className="delete"
                        onClick={() => {
                          setDeleteModal(true);
                          setSelectedSliderMakeId(car.car_id);
                        }}
                      >
                        <img src={DeleteSvg} alt="deleteBtn" />
                      </button>
                      <Link
                        to={`https://sell-center-slash.netlify.app/car/${selectedSliderMakeId}`}
                      >
                        <button
                          className="ellipsis"
                          onClick={() => {
                            setSelectedSliderMakeId(car.car_id);
                          }}
                        >
                          <i className="fa-solid fa-ellipsis"></i>
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            offset={offset}
            setOffset={setOffset}
            data={carsList.data}
          />
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

export default Cars;
