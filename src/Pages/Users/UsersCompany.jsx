import { useState, useEffect } from "react";

import Header from "../../Containers/Header/Header";
import "./Users.scss";
import http from "../../axios.config";
import Edit from "../../assets/images/icons/edit.svg";
import DeleteSvg from "../../assets/images/icons/delete.svg";
import Pagination from "../../Components/Pagination/Pagination";
import DeleteModal from "../../Components/DeleteModal/DeleteModal";
import CompanyInfoModal from "./CompanyInfoModal/CompanyInfoModal";
import useToken from "../../Hooks/useToken";

function UsersCompany() {
  const [offset, setOffset] = useState(0);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [infoModal, setInfoModal] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [balance, setBalance] = useState("");
  const [img, setImg] = useState("");
  const [date, setDate] = useState("");
  const [userId, setUserId] = useState("");
  const [userMail, setUserMail] = useState("");
  const [token, setToken] = useToken();

  const [usersList, setUsersList] = useState({
    isFetched: false,
    data: [],
    err: false,
  });

  useEffect(() => {
    http
      .get(`companies/admin/list?limit=20&offset=${offset}`, {
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
          <div className="table_wrap ">
            <DeleteModal
              deleteModal={deleteModal}
              setDeleteModal={setDeleteModal}
              api={"company/delete/"}
              id={"id"}
              mark_id={selectedUserId - 0}
            />
            <CompanyInfoModal
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
              company_id={selectedUserId}
              user_mail={userMail}
            />
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {usersList.data?.map((user, index) => (
                  <tr key={index} className="table_tr">
                    <td>{user.company_id}</td>
                    <td>{user.company_name}</td>
                    <td>{user.company_mail}</td>
                    <td></td>
                    <td className="btns">
                      <button
                        className="delete"
                        onClick={() => {
                          setDeleteModal(true);
                          setSelectedUserId(user.company_id);
                        }}
                      >
                        <img src={DeleteSvg} alt="deleteBtn" />
                      </button>
                      <button
                        className="ellipsis"
                        onClick={() => {
                          setInfoModal(true);
                          setSelectedUserId(user.company_id);
                          setName(user.company_name);
                          setEmail(user.company_mail);
                          setAddress(
                            `${user.company_address_country} ${user.company_address_city} ${user.company_address_street} ${user.company_address_nr} ${user.company_address_zip} ${user.company_address_radius}`
                          );
                          setPhoneNumber(
                            `${user.company_country_code}${user.company_number_prefix}${user.company_phone_number}`
                          );
                          setImg(user.company_image_url);
                          setBalance(user.user_balance);
                          setDate(user.company_create_at);
                          setUserId(user.user_id);
                          setUserMail(user.user_email);
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

export default UsersCompany;
