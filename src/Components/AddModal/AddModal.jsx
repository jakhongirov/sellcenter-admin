import { useEffect, useState } from "react";

import "./AddModal.scss";
import Close from "../../assets/images/icons/close.svg";
import http from "../../axios.config";
import useToken from "../../Hooks/useToken";

function AddModal({ addModal, setAddModal, api, name }) {
  const [modalData, setModalData] = useState([{ [name]: "" }]);
  const [token, setToken] = useToken();
  const [isModalOpen, setIsModalOpen] = useState(addModal);

  const handleSubmit = (e) => {
    e.preventDefault();
    http
      .post(api, modalData, {
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const closeModal = () => {
    setAddModal(false);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };
  return (
    <>
      {addModal ? (
        <div className="modal_bg" onClick={closeModal}>
          <div className="add_modal_wrapper" onClick={stopPropagation}>
            <button
              className="close"
              onClick={() => {
                setAddModal(false);
              }}
            >
              <img src={Close} alt="" />
            </button>
            <h1>Add</h1>
            <form onSubmit={handleSubmit}>
              <h2>Mark name</h2>
              <input
                required
                type="text"
                autoFocus
                placeholder="BMW"
                onChange={(e) =>
                  setModalData({
                    ...modalData,
                    [name]: e.target.value,
                  })
                }
              />
              <button className="add_btn" type="submit">
                Add
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

export default AddModal;
