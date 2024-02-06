import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import Header from "../../Containers/Header/Header";
import http from "../../axios.config";
import Edit from "../../assets/images/icons/edit.svg";
import DeleteSvg from "../../assets/images/icons/delete.svg";
import Pagination from "../../Components/Pagination/Pagination";
import PhotoModal from "../Slider/PhotoModal/PhotoModal";
import DeleteModal from "../../Components/DeleteModal/DeleteModal";
import EditSlider from "../../Components/EditModal/EditSlider/EditSlider";
import AddAds from "../../Components/AddModal/AddAds/AddAds";
import EditAds from "../../Components/EditModal/EditAds/EditAds";
import EditNews from "../../Components/EditModal/EditNews/EditNews";
import useToken from "../../Hooks/useToken";

function News() {
  const { id } = useParams();

  const [offset, setOffset] = useState(0);
  const [addSlider, setAddSlider] = useState(false);
  const [imgModal, setImgModal] = useState(false);
  const [img, setImg] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedSliderMakeId, setSelectedSliderMakeId] = useState(null);
  const [selectedSliderMakeTitle, setSelectedSliderMakeTitle] = useState("");
  const [selectedSliderMakeLink, setSelectedSliderMakeLink] = useState("");
  const [selectedSliderMakeImg, setSelectedSliderMakeImg] = useState("");
  const [token, setToken] = useToken();
  const [selectedSliderMakeLang, setSelectedSliderMakeLang] = useState("");
  console.log(selectedSliderMakeId);
  const [newsList, setNewsList] = useState({
    isFetched: false,
    data: [],
    err: false,
  });
  useEffect(() => {
    http
      .get(`news/admin/list?limit=10&offset=${offset}`, {
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      })
      .then((res) =>
        setNewsList({
          isFetched: true,
          data: res.data.data,
          err: false,
        })
      )
      .catch((error) =>
        setNewsList({
          isFetched: true,
          data: [],
          err: error,
        })
      );
  }, [offset]);

  function truncateTextAfterWords(text) {
    const words = text.split(" ");
    if (words.length > 3) {
      return words.slice(0, 3).join(" ") + "...";
    }
    return text;
  }
  const checkboxChange = (e) => {
    const id = JSON.parse(e.target.dataset.id);
    const status = e.target.checked;

    fetch("https://server.sellcenter.eu/api/v1/news/update/status", {
      method: "PUT",
      body: JSON.stringify({
        id: id,
        status: status,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };
  console.log(newsList);
  return (
    <div>
      {newsList.isFetched ? (
        <div className="container">
          <Header />
          <div className="table_wrap ">
            <PhotoModal
              imgModal={imgModal}
              setImgModal={setImgModal}
              img={img}
            />
            <DeleteModal
              deleteModal={deleteModal}
              setDeleteModal={setDeleteModal}
              api={"news/delete"}
              id={"id"}
              mark_id={selectedSliderMakeId - 0}
            />
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th></th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {newsList.data?.map((e, i) => (
                  <tr key={i} className="table_tr">
                    <td>{truncateTextAfterWords(e.news_title)}</td>
                    <td></td>
                    <td>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          data-id={e.news_id}
                          defaultChecked={e.news_active}
                          onChange={checkboxChange}
                        />
                        <div className="toggle-switch-background">
                          <div className="toggle-switch-handle"></div>
                        </div>
                      </label>
                    </td>
                    <td className="btns">
                      <Link to={`/news/edit/${e.news_id}`}>
                        <button
                          className="edit"
                          onClick={() => {
                            setSelectedSliderMakeTitle(e.news_title);
                            setSelectedSliderMakeImg(e.news_image_url);
                            setSelectedSliderMakeLang(e.news_language);
                            setSelectedSliderMakeId(e.news_id);
                          }}
                        >
                          <img src={Edit} alt="edit" />
                        </button>
                      </Link>
                      <button
                        className="delete"
                        onClick={() => {
                          setDeleteModal(true);
                          setSelectedSliderMakeId(e.news_id);
                        }}
                      >
                        <img src={DeleteSvg} alt="deleteBtn" />
                      </button>
                      <button
                        className="ellipsis"
                        onClick={() => {
                          setImgModal(true);
                          setImg(e.news_image_url);
                        }}
                      >
                        <i className="fa-solid fa-ellipsis"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link to="/news/add">
            <div className="add">
              <button>Add</button>
            </div>
          </Link>
          <Pagination
            offset={offset}
            setOffset={setOffset}
            data={newsList.data}
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

export default News;
