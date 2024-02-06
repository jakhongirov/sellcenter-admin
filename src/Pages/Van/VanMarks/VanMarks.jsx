import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import Header from "../../../Containers/Header/Header";
import http from "../../../axios.config";
import Edit from "../../../assets/images/icons/edit.svg";
import DeleteSvg from "../../../assets/images/icons/delete.svg";
import AddModal from "../../../Components/AddModal/AddModal";
import DeleteModal from "../../../Components/DeleteModal/DeleteModal";
import EditModal from "../../../Components/EditModal/EditModal";
import useToken from "../../../Hooks/useToken";

function VanMarks() {
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedMotorcycleMakeId, setSelectedMotorcycleMakeId] = useState(0);
  const [token, setToken] = useToken();
  const [selectedMotorcycleMakeName, setSelectedMotorcycleMakeName] =
    useState("");

  const [vanList, setVanList] = useState({
    isFetched: false,
    data: {},
    err: false,
  });

  useEffect(() => {
    http
      .get(`van/marks`, {
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      })
      .then((res) =>
        setVanList({
          isFetched: true,
          data: res.data.data,
          err: false,
        })
      )
      .catch((error) =>
        setVanList({
          isFetched: true,
          data: [],
          err: error,
        })
      );
  }, []);

  return (
    <div>
      {vanList.isFetched ? (
        <div className="container">
          <Header />
          <div className="table_wrap ">
            <AddModal
              addModal={addModal}
              setAddModal={setAddModal}
              name={"mark_name"}
              api={"van/add/mark"}
            />
            <DeleteModal
              deleteModal={deleteModal}
              setDeleteModal={setDeleteModal}
              api={"van/delete/mark"}
              id={"mark_id"}
              mark_id={selectedMotorcycleMakeId}
            />
            <EditModal
              editModal={editModal}
              setEditModal={setEditModal}
              value={selectedMotorcycleMakeName}
              api={"van/update/mark"}
              mark_name={"mark_name"}
              mark_id={"mark_id"}
              id={selectedMotorcycleMakeId}
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
                {vanList.data?.map((van, index) => (
                  <tr key={index} className="table_tr">
                    <td>{van.van_make_id}</td>
                    <td>{van.van_make_name}</td>
                    <td></td>
                    <td></td>
                    <td className="btns">
                      <button
                        className="edit"
                        onClick={() => {
                          setEditModal(true);
                          setSelectedMotorcycleMakeName(van.van_make_name);
                          setSelectedMotorcycleMakeId(van.van_make_id);
                        }}
                      >
                        <img src={Edit} alt="edit" />
                      </button>
                      <button
                        className="delete"
                        onClick={() => {
                          setDeleteModal(true);
                          setSelectedMotorcycleMakeId(van.van_make_id);
                        }}
                      >
                        <img src={DeleteSvg} alt="deleteBtn" />
                      </button>
                      <Link
                        to={`/van/marks/${van.van_make_name}/${van.van_make_id}`}
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

export default VanMarks;
