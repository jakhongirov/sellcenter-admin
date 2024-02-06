import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

import http from "../../axios.config";
import "./AddPage.scss";
import useToken from "../../Hooks/useToken";
import File from "../../assets/images/icons/file.svg";

function AddPage({ addSlider, setAddSlider, api, name }) {
  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(addSlider);
  const [selectedImage, setSelectedImage] = useState(null); // Состояние для хранения выбранного изображения
  const [selectedImageData, setSelectedImageData] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [token, setToken] = useToken();

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const { photo, title, text, link } = e.target.elements;

    const formData = new FormData();
    formData.append("photo", photo.files[0]);
    formData.append("title", title.value);
    formData.append("news_lang", selectedLanguage);
    formData.append("news_desc", editorContent);

    http
      .post("news/add", formData, {
        headers: {
          token: token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          navigate("/news");
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
    const file = e.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    setSelectedImageData(file);
  };
  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };
  console.log(editorContent);
  return (
    <div className="wrapper">
      <div className="add_page">
        <div className="add_page_wrapper">
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
                {" "}
                <select
                  className="language"
                  value={selectedLanguage}
                  onChange={handleLanguageChange}
                >
                  <option value="">-- Select language --</option>
                  <option value="en">English</option>
                  <option value="gr">Germany</option>
                  <option value="fr">French</option>
                  <option value="ru">Russia</option>
                  <option value="pol">Polish</option>
                  <option value="sp">Spanish</option>
                  <option value="sw">Swedish</option>
                </select>
                <input required type="text" name="title" placeholder="Title" />
              </div>
            </div>
            <div className="editor">
              <ReactQuill
                value={editorContent}
                onChange={setEditorContent}
                modules={{ toolbar: true }}
                className="editor_value"
              />
            </div>
            <button className="submit" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddPage;
