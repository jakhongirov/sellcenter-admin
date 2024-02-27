import { useEffect, useState } from "react";

import Close from "../../../assets/images/icons/close.svg";
import http from "../../../axios.config";
import File from "../../../assets/images/icons/file.svg";
import useToken from "../../../Hooks/useToken";
import "./AddSlider.scss";

function AddSlider({ addSlider, setAddSlider, api, name }) {
  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(addSlider);
  const [selectedImage, setSelectedImage] = useState(null); // Состояние для хранения выбранного изображения
  const [selectedImageData, setSelectedImageData] = useState(null);
  const [token, setToken] = useToken();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { photo, title, link } = e.target.elements;

    const formData = new FormData();
    formData.append("photo", photo.files[0]);
    formData.append("slider_title", title.value);
    formData.append("slider_link", link.value);

    http
      .post(api, formData, {
        headers: {
          token: token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.data.status === 200) {
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const closeModal = () => {
    setAddSlider(false);
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
      {addSlider ? (
        <div className="modal_bg" onClick={closeModal}>
          <div className="add_slider_modal_wrapper" onClick={stopPropagation}>
            <button className="close">
              <img src={Close} alt="" onClick={closeModal} />
            </button>
            <h1>Add</h1>
            <form onSubmit={handleSubmit}>
              <div className="form_wrapper">
                <input
                  className="input_file"
                  id="photo"
                  type="file"
                  name="photo"
                  onChange={handleFileChange}
                />
                <label className="file_label" htmlFor="photo">
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
                    onChange={(e) =>
                      setModalData({
                        ...modalData,
                        [name]: e.target.value,
                      })
                    }
                  />
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

export default AddSlider;
