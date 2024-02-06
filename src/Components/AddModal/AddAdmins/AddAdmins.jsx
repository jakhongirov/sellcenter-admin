import { useEffect, useState } from "react";
import Close from "../../../assets/images/icons/close.svg";
import http from "../../../axios.config";
import "./AddAdmins.scss";
import useToken from "../../../Hooks/useToken";

function AddAdmins({ addModal, setAddModal, api }) {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [password2Value, setPassword2Value] = useState("");
  const modalData = { admin_email: emailValue, admin_password: passwordValue };
  const [isModalOpen, setIsModalOpen] = useState(addModal);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [token, setToken] = useToken();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(modalData);
    // Проверка на совпадение паролей
    if (passwordValue !== password2Value) {
      setIsPasswordMatch(false);
      return; // Если пароли не совпадают, не выполняем POST-запрос
    }

    setIsPasswordMatch(true);

    http
      .post(api, modalData, {
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data.data);
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
          <div className="add_admins_wrapper" onClick={stopPropagation}>
            <button onClick={() => setAddModal(false)} className="close">
              <img src={Close} alt="" />
            </button>
            <h1>Add</h1>
            <form onSubmit={handleSubmit}>
              <h2>Login</h2>
              <input
                required
                type="text"
                placeholder="Login"
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
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

export default AddAdmins;
