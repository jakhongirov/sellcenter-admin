import "./PaymentInfo.scss";
import Close from "../../../assets/images/icons/close.svg";
function PaymentInfo({ paymentInfo, setPaymentInfo, text }) {
  const closeModal = () => {
    setPaymentInfo(false);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };
  return (
    <>
      {paymentInfo ? (
        <div className="modal_bg" onClick={closeModal}>
          <div className="payment_info" onClick={stopPropagation}>
            <button
              onClick={() => {
                setPaymentInfo(false);
              }}
            >
              <img className="close" src={Close} alt="" />
            </button>
            <h2>{text}</h2>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default PaymentInfo;
