import "./UsersInfoModal.scss";
import Close from "../../../assets/images/icons/close.svg";
function UserInfoModal({
  infoModal,
  setInfoModal,
  user_id,
  email,
  name,
  address,
  phone_number,
  balance,
  img,
  date,
}) {
  const closeModal = () => {
    setInfoModal(false);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // Months are 0-based in JavaScript
    const year = date.getUTCFullYear();
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };
  return (
    <>
      {infoModal ? (
        <div className="modal_bg" onClick={closeModal}>
          <div className="info_modal" onClick={stopPropagation}>
            <button
              onClick={() => {
                setInfoModal(false);
              }}
            >
              <img className="close" src={Close} alt="" />
            </button>
            <h1>
              <span>Id: </span> {user_id}
            </h1>
            <p>
              <span>Email: </span> {email}
            </p>
            <p>
              <span>Name: </span> {name}
            </p>
            <p>
              <span>Address:</span> {address}
            </p>
            <p>
              <span>Phone Number: </span> {phone_number}
            </p>
            <p>
              <span>Balance: </span> {(balance / 100).toFixed(2)}
            </p>
            <img src={img} className="user_img" alt="" />
            <p>
              <span>Date: </span> {formatDate(date)}
            </p>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default UserInfoModal;
