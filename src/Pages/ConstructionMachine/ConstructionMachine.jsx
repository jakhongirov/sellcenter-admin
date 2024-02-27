import { useState, useEffect } from "react";
import Header from "../../Containers/Header/Header";
import http from "../../axios.config";
import DeleteSvg from "../../assets/images/icons/delete.svg";
import DeleteModal from "../../Components/DeleteModal/DeleteModal";
import Pagination from "../../Components/Pagination/Pagination";
import ConstructionMachineMarks from "./ConstructionMachineMarks/ConstructionMachineMarks";
import { Link } from "react-router-dom";
import useToken from "../../Hooks/useToken";

function ConstructionMachine() {
  const [offset, setOffset] = useState(0);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedSliderMakeId, setSelectedSliderMakeId] = useState(null);
  const [token, setToken] = useToken();
  const [constructionssList, setConstructionMachineList] = useState({
    isFetched: false,
    data: [],
    err: false,
  });

  useEffect(() => {
    http
      .get(`constructions/admin/list?limit=10&offset=${offset}`, {
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      })
      .then((res) =>
        setConstructionMachineList({
          isFetched: true,
          data: res.data.data,
          err: false,
        })
      )
      .catch((error) =>
        setConstructionMachineList({
          isFetched: true,
          data: [],
          err: error,
        })
      );
  }, []);

  const checkboxChange = (e) => {
    const id = JSON.parse(e.target.dataset.id);
    const status = e.target.checked;

    fetch("https://server.sellcenter.eu/api/v1/constructions/update/status", {
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
      {constructionssList.isFetched ? (
        <div className="container">
          <Header />
          <div className="table_wrap ">
            <DeleteModal
              deleteModal={deleteModal}
              setDeleteModal={setDeleteModal}
              api={"constructions/delete"}
              id={"machine_id"}
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
                {constructionssList.data?.map((constructions, index) => (
                  <tr key={index} className="table_tr">
                    <td>{++index}</td>
                    <td>{constructions.machine_make}</td>
                    <td>{constructions.machine_model}</td>
                    <td>{constructions.machine_price}€</td>
                    <td>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          data-id={constructions.machine_id}
                          defaultChecked={constructions.machine_active}
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
                          setSelectedSliderMakeId(constructions.machine_id);
                        }}
                      >
                        <img src={DeleteSvg} alt="deleteBtn" />
                      </button>
                      <Link
                        to={`https://sell-center-slash.netlify.app/constructions/${selectedSliderMakeId}`}
                      >
                        <button
                          className="ellipsis"
                          onClick={() => {
                            setSelectedSliderMakeId(constructions.machine_id);
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
            data={constructionssList.data}
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

export default ConstructionMachine;
