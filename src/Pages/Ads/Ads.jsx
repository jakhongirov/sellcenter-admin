import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
import useToken from "../../Hooks/useToken";

function Ads() {
  const [offset, setOffset] = useState(0);
  const [addSlider, setAddSlider] = useState(false);
  const [imgModal, setImgModal] = useState(false);
  const [img, setImg] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedSliderMakeId, setSelectedSliderMakeId] = useState(null);
  const [selectedSliderMakeName, setSelectedSliderMakeName] = useState("");
  const [selectedSliderMakeLink, setSelectedSliderMakeLink] = useState("");
  const [selectedSliderMakeImg, setSelectedSliderMakeImg] = useState("");
  const [token, setToken] = useToken();

  const [adsList, setAdsList] = useState({
    isFetched: false,
    data: [],
    err: false,
  });

  useEffect(() => {
    http
      .get(`ads/list?limit=15&offset=${offset}`, {
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      })
      .then((res) =>
        setAdsList({
          isFetched: true,
          data: res.data.data,
          err: false,
        })
      )
      .catch((error) =>
        setAdsList({
          isFetched: true,
          data: [],
          err: error,
        })
      );
  }, [offset]);

  const checkboxChange = (e) => {
    const id = JSON.parse(e.target.dataset.id);
    const status = e.target.checked;

    fetch("https://server.sellcenter.eu/api/v1/ads/update/status", {
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

  return (
    <div>
      {adsList.isFetched ? (
        <div className="container">
          <Header />
          <div className="table_wrap ">
            <AddAds
              addSlider={addSlider}
              setAddSlider={setAddSlider}
              api={"ads/add"}
            />
            <PhotoModal
              imgModal={imgModal}
              setImgModal={setImgModal}
              img={img}
            />
            <DeleteModal
              deleteModal={deleteModal}
              setDeleteModal={setDeleteModal}
              api={"ads/delete"}
              id={"id"}
              mark_id={selectedSliderMakeId - 0}
            />
            <EditAds
              editModal={editModal}
              setEditModal={setEditModal}
              titleValue={selectedSliderMakeName}
              api={"ads/update"}
              id={selectedSliderMakeId}
              linkValue={selectedSliderMakeLink}
              imgValue={selectedSliderMakeImg}
            />
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Link</th>
                  <th></th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {adsList.data?.map((e, i) => (
                  <tr key={i} className="table_tr">
                    <td>{e.card_title}</td>
                    <td>
                      <Link to={e.card_link}>Link</Link>
                    </td>
                    <td></td>
                    <td>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          data-id={e.card_id}
                          defaultChecked={e.card_active}
                          onChange={checkboxChange}
                        />
                        <div className="toggle-switch-background">
                          <div className="toggle-switch-handle"></div>
                        </div>
                      </label>
                    </td>
                    <td className="btns">
                      <button
                        className="edit"
                        onClick={() => {
                          setEditModal(true);
                          setSelectedSliderMakeId(e.card_id);
                          setSelectedSliderMakeName(e.card_title);
                          setSelectedSliderMakeLink(e.card_title);
                          setSelectedSliderMakeImg(e.card_image_url);
                        }}
                      >
                        <img src={Edit} alt="edit" />
                      </button>
                      <button
                        className="delete"
                        onClick={() => {
                          setDeleteModal(true);
                          setSelectedSliderMakeId(e.card_id);
                        }}
                      >
                        <img src={DeleteSvg} alt="deleteBtn" />
                      </button>
                      <button
                        className="ellipsis"
                        onClick={() => {
                          setImgModal(true);
                          setImg(e.card_image_url);
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
          <div className="add">
            <button
              onClick={() => {
                setAddSlider(true);
              }}
            >
              Add
            </button>
          </div>
          <Pagination
            offset={offset}
            setOffset={setOffset}
            data={adsList.data}
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

export default Ads;
