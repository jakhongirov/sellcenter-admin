import { useState, useEffect } from "react";

import Header from "../../Containers/Header/Header";
import "./Admins.scss";
import http from "../../axios.config";
import Edit from "../../assets/images/icons/edit.svg";
import DeleteSvg from "../../assets/images/icons/delete.svg";
import AddAdmins from "../../Components/AddModal/AddAdmins/AddAdmins";
import EditAdmins from "../../Components/EditModal/EditAdmins/EditAdmins";
import DeleteModal from "../../Components/DeleteModal/DeleteModal";
import Pagination from "../../Components/Pagination/Pagination";
import useToken from "../../Hooks/useToken";

function Admins() {
  const [offset, setOffset] = useState(0);
  const [addAdmins, setAddAdmins] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editAdmins, setEditAdmins] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [defaultEmail, setDefaultEmail] = useState("");
  const [defaultPassword, setDefaultPassword] = useState("");
  const [token, setToken] = useToken();
  const [adminsList, setAdminsList] = useState({
    isFetched: false,
    data: [],
    err: false,
  });

  useEffect(() => {
    http
      .get(`admin/list?limit=100&offset=${offset}`, {
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      })
      .then((res) =>
        setAdminsList({
          isFetched: true,
          data: res.data.data,
          err: false,
        })
      )
      .catch((error) =>
        setAdminsList({
          isFetched: true,
          data: [],
          err: error,
        })
      );
  }, [offset]);
  return (
    <div>
      {adminsList.isFetched ? (
        <div className="container">
          <Header />
          <div className="table_wrap ">
            <AddAdmins
              addModal={addAdmins}
              setAddModal={setAddAdmins}
              api={"admin/register"}
            />
            <EditAdmins
              editModal={editAdmins}
              setEditModal={setEditAdmins}
              api={"admin/edit"}
              id={selectedId}
              default_email={defaultEmail}
              default_password={defaultPassword}
            />
            <DeleteModal
              deleteModal={deleteModal}
              setDeleteModal={setDeleteModal}
              api={"admin/delete"}
              id={"id"}
              mark_id={selectedId - 0}
            />
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Login</th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {adminsList.data?.map((admin, index) => (
                  <tr key={index} className="table_tr">
                    <td>{admin.admin_id}</td>
                    <td>{admin.admin_email}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="btns">
                      <button
                        className="edit"
                        onClick={() => {
                          setEditAdmins(true);
                          setSelectedId(admin.admin_id);
                          setDefaultEmail(admin.admin_email);
                          setDefaultPassword(admin.admin_password);
                        }}
                      >
                        <img src={Edit} alt="edit" />
                      </button>
                      <button
                        className="delete"
                        onClick={() => {
                          setDeleteModal(true);
                          setSelectedId(admin.admin_id);
                        }}
                      >
                        <img src={DeleteSvg} alt="deleteBtn" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="add">
            <button
              onClick={() => {
                setAddAdmins(true);
              }}
            >
              Add
            </button>
          </div>
          <Pagination
            offset={offset}
            setOffset={setOffset}
            data={adminsList.data}
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

export default Admins;
