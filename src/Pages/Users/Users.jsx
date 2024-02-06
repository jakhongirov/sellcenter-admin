import { useState, useEffect } from "react";

import Header from "../../Containers/Header/Header";
import "./Users.scss";
import http from "../../axios.config";
import Edit from "../../assets/images/icons/edit.svg";
import DeleteSvg from "../../assets/images/icons/delete.svg";
import Pagination from "../../Components/Pagination/Pagination";
import UserInfoModal from "./UsersInfoModal/UsersInfoModal";
import DeleteModal from "../../Components/DeleteModal/DeleteModal";
import DeleteUsers from "../../Components/DeleteModal/DeleteUsers/DeleteUsers";
import useToken from "../../Hooks/useToken";

function Users() {
  const [offset, setOffset] = useState(0);
  const [userId, setUserId] = useState(0);
  const [infoModal, setInfoModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [balance, setBalance] = useState("");
  const [token, setToken] = useToken();
  const [img, setImg] = useState("");
  const [date, setDate] = useState("");

  const [usersList, setUsersList] = useState({
    isFetched: false,
    data: [],
    err: false,
  });

  useEffect(() => {
    http
      .get(`users/list?limit=10&offset=${offset}`, {
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      })
      .then((res) =>
        setUsersList({
          isFetched: true,
          data: res.data.data,
          err: false,
        })
      )
      .catch((error) =>
        setUsersList({
          isFetched: true,
          data: [],
          err: error,
        })
      );
  }, [offset]);
  console.log(usersList);
  return (
    <div>
      {usersList.isFetched ? (
        <div className="container">
          <Header />
          <UserInfoModal
            infoModal={infoModal}
            setInfoModal={setInfoModal}
            user_id={userId}
            email={email}
            name={name}
            address={address}
            phone_number={phoneNumber}
            balance={balance}
            img={img}
            date={date}
          />
          <DeleteUsers
            deleteModal={deleteModal}
            setDeleteModal={setDeleteModal}
            api={`user/delete/${selectedId - 0}`}
          />
          <div className="table_wrap ">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Email</th>
                  <th>Company</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {usersList.data?.map((user, index) => (
                  <tr key={index} className="table_tr">
                    <td>{user.user_id}</td>
                    <td>{user.user_email}</td>
                    <td>
                      {user.user_company ? (
                        <i className="fa-solid fa-check"></i>
                      ) : (
                        <i className="fa-solid fa-xmark"></i>
                      )}
                    </td>
                    <td></td>
                    <td className="btns">
                      <button
                        className="delete"
                        onClick={() => {
                          setDeleteModal(true);
                          setSelectedId(user.user_id);
                        }}
                      >
                        <img src={DeleteSvg} alt="deleteBtn" />
                      </button>
                      <button
                        className="ellipsis"
                        onClick={() => {
                          setInfoModal(true);
                          setUserId(user.user_id);
                          setName(
                            `${user.user_gender}${user.user_first_name} ${user.user_last_name}`
                          );
                          setEmail(user.user_email);
                          setAddress(
                            `${user.user_address_country} ${user.user_address_city} ${user.user_address_street} ${user.user_address_nr} ${user.user_address_zip}`
                          );
                          setPhoneNumber(
                            `${user.user_country_code}${user.user_number_prefix}${user.user_phone_number}`
                          );
                          setImg(user.user_image_url);
                          setBalance(user.user_balance);
                          setDate(user.user_create_at);
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
          <Pagination
            offset={offset}
            setOffset={setOffset}
            data={usersList.data}
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

export default Users;
