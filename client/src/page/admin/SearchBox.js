const SearchBox = ({ keyword, onChange }) => {
  return (
    <div className="w-full">
      <input
        type="text"
        value={keyword}
        onChange={(e) => onChange(e.target.value)}
        placeholder="이름 검색"
        className="w-full  px-4 py-2 focus:outline-none "
      />
    </div>
  );
};

export default SearchBox;
