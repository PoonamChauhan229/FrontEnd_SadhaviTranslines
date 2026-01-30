const SuccessPopup = ({ title, message, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white px-6 py-4 rounded-lg shadow-xl text-center max-h-[90vh] overflow-auto">
        <h2 className="text-green-600 font-semibold text-lg mb-2">
          {title}
        </h2>
        <p className="text-gray-700 mb-4">
          {message}
        </p>
        <button
          onClick={onClose}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default SuccessPopup;
