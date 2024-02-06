import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import Header from "../../../Containers/Header/Header";
import "../Cars.scss";
import http from "../../../axios.config";
import Edit from "../../../assets/images/icons/edit.svg";
import DeleteSvg from "../../../assets/images/icons/delete.svg";
import AddModal from "../../../Components/AddModal/AddModal";
import DeleteModal from "../../../Components/DeleteModal/DeleteModal";
import EditModal from "../../../Components/EditModal/EditModal";
import useToken from "../../../Hooks/useToken";

function CarsMarks() {
  const { id } = useParams();

  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedCarMakeId, setSelectedCarMakeId] = useState(0);
  const [selectedCarMakeName, setSelectedCarMakeName] = useState("");
  const [token, setToken] = useToken();
  const [carsList, setCarsList] = useState({
    isFetched: false,
    data: [],
    err: false,
  });

  useEffect(() => {
    http
      .get(`car/marks`, {
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
            <AddModal
              addModal={addModal}
              setAddModal={setAddModal}
              name={"mark_name"}
              api={"car/add/mark"}
            />
            <DeleteModal
              deleteModal={deleteModal}
              setDeleteModal={setDeleteModal}
              api={"car/delete/mark"}
              id={"mark_id"}
              mark_id={selectedCarMakeId}
            />
            <EditModal
              editModal={editModal}
              setEditModal={setEditModal}
              value={selectedCarMakeName}
              api={"car/update/mark"}
              mark_name={"mark_name"}
              mark_id={"mark_id"}
              id={selectedCarMakeId}
            />
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
                      <button
                        className="edit"
                        onClick={() => {
                          setEditModal(true);
                          setSelectedCarMakeName(car.car_make_name);
                          setSelectedCarMakeId(car.car_make_id);
                        }}
                      >
                        <img src={Edit} alt="edit" />
                      </button>
                      <button
                        className="delete"
                        onClick={() => {
                          setDeleteModal(true);
                          setSelectedCarMakeId(car.car_make_id);
                        }}
                      >
                        <img src={DeleteSvg} alt="deleteBtn" />
                      </button>
                      <Link
                        to={`/cars/marks/${car.car_make_name}/${car.car_make_id}`}
                      >
                        <button className="ellipsis">
                          <i className="fa-solid fa-ellipsis"></i>
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="add">
              <button
                onClick={() => {
                  setAddModal(true);
                }}
              >
                Add
              </button>
            </div>
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

export default CarsMarks;
