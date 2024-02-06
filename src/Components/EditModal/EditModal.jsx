import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./EditModal.scss";
import Close from "../../assets/images/icons/close.svg";
import axios from "axios";
import useToken from "../../Hooks/useToken";
import http from "../../axios.config";

function EditModal({
  editModal,
  setEditModal,
  value,
  api,
  mark_name,
  id,
  mark_id,
}) {
  const navigate = useNavigate();
  const [token, setToken] = useToken();

  const closeModal = () => {
    setEditModal(false);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const editedValue = e.target.elements.markName.value;

    const updatedData = {
      [mark_id]: id,
      [mark_name]: editedValue,
    };
    console.log(updatedData);
    http
      .put(api, updatedData, {
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      {editModal ? (
        <div className="modal_bg" onClick={closeModal}>
          <div className="edit_modal_wrapper" onClick={stopPropagation}>
            <button
              className="close"
              onClick={() => {
                setEditModal(false);
              }}
            >
              <img src={Close} alt="" />
            </button>
            <h1>Edit</h1>
            <form onSubmit={handleSubmit}>
              <h2>Mark name</h2>
              <input
                required
                type="text"
                name="markName"
                defaultValue={value}
              />
              <button className="edit_btn" type="submit">
                Edit
              </button>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default EditModal;
