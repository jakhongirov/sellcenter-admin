import { useState } from "react";
import axios from "axios";

import http from "../../axios.config";
import "./DeleteModal.scss";
import useToken from "../../Hooks/useToken";

function DeleteModal({ deleteModal, setDeleteModal, api, id, mark_id }) {
  const [token, setToken] = useToken();

  const deleteBtnClick = () => {
    let data = JSON.stringify({
      [id]: mark_id,
    });

    let config = {
      method: "delete",
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
        if (response.data .status === 200) {
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
        console.log(data);
      });
  };
  return (
    <>
      {deleteModal ? (
        <div className="delete_modal_wrapper">
          <h3>Are you sure you want to delete?</h3>
          <div className="delete_btn_wrapper">
            <button onClick={() => setDeleteModal(false)}>NO</button>
            <button onClick={deleteBtnClick}>YES</button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default DeleteModal;
