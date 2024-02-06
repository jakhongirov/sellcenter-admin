import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Header from "../../Containers/Header/Header";
import http from "../../axios.config";
import Edit from "../../assets/images/icons/edit.svg";
import DeleteSvg from "../../assets/images/icons/delete.svg";
import AddModels from "../../Components/AddModal/AddModels/AddModels";
import DeleteModal from "../../Components/DeleteModal/DeleteModal";
import EditModels from "../../Components/EditModal/EditModels/EditModels";
import useToken from "../../Hooks/useToken";

function SingleMotorcycleMarks() {
  const { name, id } = useParams();
  const [addModal, setAddModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [token, setToken] = useToken();
  const [selectedMotorcycleMakeId, setSelectedMotorcycleMakeId] = useState(0);
  const [selectedMotorcycleModelId, setSelectedMotorcycleModelId] = useState(0);
  const [selectedMotorcycleMakeName, setSelectedMotorcycleMakeName] =
    useState("");
  const [carsList, setCarsList] = useState({
    isFetched: false,
    data: [],
    err: false,
  });
  useEffect(() => {
    http
      .get(`motorcycle/model?mark_id=${name}`, {
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
  }, [name]);

  return (
    <div>
      {carsList.isFetched ? (
        <div className="container">
          <Header />
          <div className="table_wrap ">
            <AddModels
              addModal={addModal}
              setAddModal={setAddModal}
              id={id}
              name={"model_name"}
              api={"motorcycle/add/model"}
            />
            <EditModels
              editModal={editModal}
              setEditModal={setEditModal}
              value={selectedMotorcycleMakeName}
              api={"motorcycle/update/model"}
              model_id={selectedMotorcycleModelId}
              id={id}
            />
            <DeleteModal
              deleteModal={deleteModal}
              setDeleteModal={setDeleteModal}
              api={"motorcycle/delete/model"}
              id={"model_id"}
              mark_id={selectedMotorcycleModelId}
            />
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Model Name</th>
                  <th>Make name</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {carsList.data?.map((motorcycle, index) => (
                  <tr key={index} className="table_tr">
                    <td>{motorcycle.motorcycle_model_id}</td>
                    <td>{motorcycle.motorcycle_model_name}</td>
                    <td>{motorcycle.motorcycle_make_name}</td>
                    <td></td>
                    <td className="btns">
                      <button
                        className="edit"
                        onClick={() => {
                          setEditModal(true);
                          setSelectedMotorcycleMakeName(
                            motorcycle.motorcycle_model_name
                          );
                          setSelectedMotorcycleModelId(
                            motorcycle.motorcycle_model_id
                          );
                        }}
                      >
                        <img src={Edit} alt="edit" />
                      </button>
                      <button
                        className="delete"
                        onClick={() => {
                          setDeleteModal(true);
                          setSelectedMotorcycleModelId(
                            motorcycle.motorcycle_model_id
                          );
                        }}
                      >
                        <img src={DeleteSvg} alt="deleteBtn" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="add">
              <button
                onClick={() => {
                  setAddModal(true);
                  setSelectedMotorcycleModelId(
                    carsList[0]?.motorcycle_model_id
                  );
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

export default SingleMotorcycleMarks;
