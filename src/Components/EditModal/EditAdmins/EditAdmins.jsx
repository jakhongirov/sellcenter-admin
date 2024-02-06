import { useEffect, useState } from "react";
import Close from "../../../assets/images/icons/close.svg";
import http from "../../../axios.config";
import "./EditAdmins.scss";
import useToken from "../../../Hooks/useToken";

function EditAdmins({
  editModal,
  setEditModal,
  api,
  id,
  default_email,
  default_password,
}) {
  const [passwordValue, setPasswordValue] = useState("");
  const [password2Value, setPassword2Value] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(editModal);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [token, setToken] = useToken();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Проверка на совпадение паролей
    if (passwordValue !== password2Value) {
      setIsPasswordMatch(false);
      return; // Если пароли не совпадают, не выполняем POST-запрос
    }

    setIsPasswordMatch(true);
    const { email } = e.target.elements;

    const modalData = {
      id: id,
      email: email.value,
      password: passwordValue,
    };

    http
      .put(api, modalData, {
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
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

  return (
    <>
      {editModal ? (
        <div className="modal_bg" onClick={closeModal}>
          <div className="add_admins_wrapper" onClick={stopPropagation}>
            <button onClick={() => setEditModal(false)} className="close">
              <img src={Close} alt="" />
            </button>
            <h1>Edit</h1>
            <form onSubmit={handleSubmit}>
              <h2>Email</h2>
              <input
                required
                type="text"
                placeholder="Email"
                name="email"
                defaultValue={default_email}
              />
              <h2>Password</h2>
              <input
                required
                type="password"
                placeholder="Password"
                value={passwordValue}
                onChange={(e) => {
                  setPasswordValue(e.target.value);
                  setIsPasswordMatch(true);
                }}
              />
              <h2>Confirm Password</h2>
              <input
                required
                type="password"
                placeholder="Confirm password"
                value={password2Value}
                onChange={(e) => {
                  setPassword2Value(e.target.value);
                  setIsPasswordMatch(true);
                }}
              />
              {!isPasswordMatch && (
                <p className="error">Passwords do not match</p>
              )}
              <button
                className="add_btn"
                type="submit"
                disabled={!isPasswordMatch}
              >
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

export default EditAdmins;
