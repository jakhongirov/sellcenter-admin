import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Close from "../../../assets/images/icons/close.svg";
import http from "../../../axios.config";
import useToken from "../../../Hooks/useToken";
function EditModels({ editModal, setEditModal, value, api, id, model_id }) {
  const [token, setToken] = useToken();
  const navigate = useNavigate();

  const closeModal = () => {
    setEditModal(false);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const editedValue = e.target.elements.markName.value;
    let data = JSON.stringify({
      model_id: model_id,
      mark_id: id,
      model_name: editedValue,
    });
    console.log(data);
    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: "https://server.sellcenter.eu/api/v1/" + api,
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        if (response.status === 200) {
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
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

export default EditModels;
