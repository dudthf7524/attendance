const AlertModal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-6 shadow-lg w-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">알림</h2>
        <p className="text text-gray-700 mb-6">{message}</p>
        <button
          onClick={onClose}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default AlertModal;
