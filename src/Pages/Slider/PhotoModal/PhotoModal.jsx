import "./PhotoModal.scss";
import Close from "../../../assets/images/icons/close.svg";
function PhotoModal({ imgModal, setImgModal, img }) {
  const closeModal = () => {
    setImgModal(false);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };
  return (
    <>
      {imgModal ? (
        <div className="modal_bg" onClick={closeModal}>
          <div className="photo_modal" onClick={stopPropagation}>
            <img
              onClick={() => {
                setImgModal(false);
              }}
              className="close"
              src={Close}
              alt=""
            />
            <img className="img_data" src={img} alt="" />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default PhotoModal;
