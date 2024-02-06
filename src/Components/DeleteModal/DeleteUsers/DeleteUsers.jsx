import { useState } from "react";
import axios from "axios";

import http from "../../../axios.config";
import useToken from "../../../Hooks/useToken";

function DeleteUsers({ deleteModal, setDeleteModal, api }) {
  const [token, setToken] = useToken();

  const deleteBtnClick = () => {
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: "https://server.sellcenter.eu/api/v1/" + api,
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
    };

    axios
      .request(config)
      .then((response) => {
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

export default DeleteUsers;
