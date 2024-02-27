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
import EditPayment from "../../Components/EditModal/EditPayment/EditPayment";
import PaymentInfo from "./PaymentInfo/PaymentInfo";
import useToken from "../../Hooks/useToken";

function Payment() {
  const { id } = useParams();

  const [offset, setOffset] = useState(0);
  const [addSlider, setAddSlider] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState(false);
  const [text, setText] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedSliderMakeId, setSelectedSliderMakeId] = useState(null);
  const [selectedSliderMakeTitle, setSelectedSliderMakeTitle] = useState("");
  const [selectedSliderMakePrice, setSelectedSliderMakePrice] = useState("");
  const [selectedImageCount, setselectedImageCount] = useState(0);
  const [selectedSliderMakeDesc, setSelectedSliderMakeDesc] = useState("");
  const [selectedSliderMakeLang, setSelectedSliderMakeLang] = useState("");
  const [token, setToken] = useToken();

  const [paymentList, setPaymentList] = useState({
    isFetched: false,
    data: [],
    err: false,
  });

  useEffect(() => {
    http
      .get(`price/admin/list?limit=100&offset=${offset}`, {
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      })
      .then((res) =>
        setPaymentList({
          isFetched: true,
          data: res.data.data,
          err: false,
        })
      )
      .catch((error) =>
        setPaymentList({
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

    fetch("https://server.sellcenter.eu/api/v1/price/list/update/status", {
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
      {paymentList.isFetched ? (
        <div className="container">
          <Header />
          <div className="table_wrap ">
            <PaymentInfo
              paymentInfo={paymentInfo}
              setPaymentInfo={setPaymentInfo}
              text={text}
            />
            <DeleteModal
              deleteModal={deleteModal}
              setDeleteModal={setDeleteModal}
              api={"price/list/delete"}
              id={"id"}
              mark_id={selectedSliderMakeId - 0}
            />
            <EditPayment
              editModal={editModal}
              setEditModal={setEditModal}
              titleValue={selectedSliderMakeTitle}
              descValue={selectedSliderMakeDesc}
              langValue={selectedSliderMakeLang}
              priceValue={selectedSliderMakePrice}
              imageCountValue={selectedImageCount}
              api={"price/list/update"}
              id={selectedSliderMakeId}
            />
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Language</th>
                  <th>Image count</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {paymentList.data?.map((e, i) => (
                  <tr key={i} className="table_tr">
                    <td>{e.price_item_title}</td>
                    <td>{e.price_item_price}</td>
                    <td>{e.price_item_lang}</td>
                    <td>{e.image_count}</td>
                    <td>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          data-id={e.price_item_id}
                          defaultChecked={e.price_item_active}
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
                          setSelectedSliderMakeTitle(e.price_item_title);
                          setSelectedSliderMakeDesc(e.price_item_desc);
                          setSelectedSliderMakeLang(e.price_item_lang);
                          setSelectedSliderMakePrice(e.price_item_price);
                          setSelectedSliderMakeId(e.price_item_id);
                          setselectedImageCount(e.image_count)
                        }}
                      >
                        <img src={Edit} alt="edit" />
                      </button>
                      <button
                        className="delete"
                        onClick={() => {
                          setDeleteModal(true);
                          setSelectedSliderMakeId(e.price_item_id);
                        }}
                      >
                        <img src={DeleteSvg} alt="deleteBtn" />
                      </button>
                      <button
                        className="ellipsis"
                        onClick={() => {
                          setPaymentInfo(true);
                          setText(e.price_item_desc);
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
          <Link to="/payment/add">
            <div className="add">
              <button>Add</button>
            </div>
          </Link>
          <Pagination
            offset={offset}
            setOffset={setOffset}
            data={paymentList.data}
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

export default Payment;
