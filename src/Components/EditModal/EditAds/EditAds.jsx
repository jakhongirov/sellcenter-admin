import { useEffect, useState } from "react";

import Close from "../../../assets/images/icons/close.svg";
import http from "../../../axios.config";
import File from "../../../assets/images/icons/file.svg";
import "../../AddModal/AddSlider/AddSlider";
import useToken from "../../../Hooks/useToken";

function EditAds({ editModal, setEditModal, api, id }) {
  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(editModal);
  const [selectedImage, setSelectedImage] = useState(null); // Состояние для хранения выбранного изображения
  const [selectedImageData, setSelectedImageData] = useState(null);
  const [token, setToken] = useToken();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { photo, title, link, text } = e.target.elements;

    const formData = new FormData();

    formData.append("id", id);
    formData.append("photo", photo.files[0]);
    formData.append("ads_title", title.value);
    formData.append("ads_link", link.value);
    formData.append("ads_text", text.value);

    http
      .put(api, formData, {
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
        console.log(error);
      });
  };

  const closeModal = () => {
    setEditModal(false);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Получаем выбранный файл
    setSelectedImage(URL.createObjectURL(file)); // Отображаем выбранное изображение
    setSelectedImageData(file);
  };
  return (
    <>
      {editModal ? (
        <div className="modal_bg" onClick={closeModal}>
          <div className="add_ads_modal_wrapper" onClick={stopPropagation}>
            <button className="close">
              <img src={Close} alt="" onClick={closeModal} />
            </button>
            <h1>Edit</h1>
            <form onSubmit={handleSubmit}>
              <div className="form_wrapper">
                <input
                  className="input_file"
                  id="photo"
                  type="file"
                  name="photo"
                  onChange={handleFileChange}
                />
                <label className="ads_file_label" htmlFor="photo">
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      alt="Selected"
                      className="selected_img"
                    />
                  ) : (
                    <img src={File} alt="File" />
                  )}
                </label>
                <div>
                  <input
                    required
                    type="text"
                    name="title"
                    placeholder="Title"
                  />
                  <input required type="text" name="text" placeholder="Text" />
                  <input required type="text" name="link" placeholder="Link" />
                  <button className="add_btn" type="submit">
                    Add
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default EditAds;
