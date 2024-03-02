import { useState, useEffect } from "react";
import Header from "../../Containers/Header/Header";
import "./MotorHome.scss";
import http from "../../axios.config";
import DeleteSvg from "../../assets/images/icons/delete.svg";
import Pagination from "../../Components/Pagination/Pagination";
import DeleteModal from "../../Components/DeleteModal/DeleteModal";
import { Link } from "react-router-dom";
import useToken from "../../Hooks/useToken";

function MotorHome() {
  const [offset, setOffset] = useState(0);
  const [deleteModal, setDeleteModal] = useState(false);
  const [token, setToken] = useToken();
  const [selectedSliderMakeId, setSelectedSliderMakeId] = useState(null);

  const [motorhomeList, setMotorHomeList] = useState({
    isFetched: false,
    data: {},
    err: false,
  });

  useEffect(() => {
    http
      .get(`motorhomes/admin/list?limit=10&offset=${offset}`, {
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      })
      .then((res) =>
        setMotorHomeList({
          isFetched: true,
          data: res.data.data,
          err: false,
        })
      )
      .catch((error) =>
        setMotorHomeList({
          isFetched: true,
          data: [],
          err: error,
        })
      );
  }, [offset]);

  const checkboxChange = (e) => {
    const id = JSON.parse(e.target.dataset.id);
    const status = e.target.checked;

    fetch("https://server.sellcenter.eu/api/v1/motorhomes/update/status", {
      method: "PUT",
      body: JSON.stringify({
        id: id,
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
      {motorhomeList.isFetched ? (
        <div className="container">
          <Header />
          <div className="table_wrap ">
            <DeleteModal
              deleteModal={deleteModal}
              setDeleteModal={setDeleteModal}
              api={"motorhome/delete"}
              id={"id"}
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
                {motorhomeList.data?.map((motorhome, index) => (
                  <tr key={index} className="table_tr">
                    <td>{++index}</td>
                    <td>{motorhome.motor_home_make}</td>
                    <td>{motorhome.motor_home_model}</td>
                    <td>{motorhome.motor_home_price}€</td>
                    <td>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          data-id={motorhome.motor_home_id}
                          defaultChecked={motorhome.motor_home_active}
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
                          setSelectedSliderMakeId(motorhome.motor_home_id);
                        }}
                      >
                        <img src={DeleteSvg} alt="deleteBtn" />
                      </button>
                      <Link
                        to={`https://sellcenter.eu/motorhome/${selectedSliderMakeId}`}
                      >
                        <button
                          className="ellipsis"
                          onClick={() => {
                            setSelectedSliderMakeId(motorhome.motor_home_id);
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
            data={motorhomeList.data}
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

export default MotorHome;
