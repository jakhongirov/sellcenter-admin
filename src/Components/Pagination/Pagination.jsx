import "./Pagination.scss";

const Pagination = ({ offset, setOffset, data }) => {
  return (
    <div className="pagination">
      <button
        onClick={() => {
          setOffset(offset - 10);
        }}
        disabled={offset === 0 ? true : false}
      >{`<`}</button>
      <button
        onClick={() => {
          setOffset(offset + 10);
        }}
        disabled={data.length >= 10 ? false : true}
      >{`>`}</button>
    </div>
  );
};

export default Pagination;
