
const ProductList = () => {
  const products = [
    {
      id: 1,
      name: "Excellent 칫솔 250ea",
      period: "24/06/01 ~ 24/09/05",
      discount: "10%",
      status: "판매중",
      price: "50,000원",
      image: "/sample-product.jpg",
    },
    {
      id: 2,
      name: "GoodKit P/W 칫솔S",
      period: "24/06/01 ~ 24/09/05",
      discount: "10%",
      status: "품절",
      price: "150,000원",
      image: "/sample-product.jpg",
    },
    // ...추가 상품
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "판매중":
        return "text-green-600 bg-green-100";
      case "일시중지":
        return "text-yellow-600 bg-yellow-100";
      case "품절":
        return "text-red-600 bg-red-100";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-60 bg-white shadow-md p-6">
        <h1 className="font-bold text-lg mb-6">🔺 Suscale</h1>
        <ul className="space-y-4 text-sm">
          <li className="text-gray-500">대시보드</li>
          <li className="font-semibold text-blue-600">상품관리</li>
          <li className="text-gray-500">주문관리</li>
          <li className="text-gray-500">고객관리</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-semibold">상품관리</h2>
              <p className="text-sm text-gray-400 mt-1">
                모든 등록된 상품 리스트를 확인하거나 등록할 수 있습니다.
              </p>
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded">
              등록하기
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b text-left">
                  <th className="px-4 py-2">사진</th>
                  <th className="px-4 py-2">상품명</th>
                  <th className="px-4 py-2">판매기간</th>
                  <th className="px-4 py-2">할인율</th>
                  <th className="px-4 py-2">상태</th>
                  <th className="px-4 py-2 text-right">가격</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b hover:bg-blue-50 transition">
                    <td className="px-4 py-2">
                      <img src={p.image} alt={p.name} className="w-10 h-10 rounded object-cover" />
                    </td>
                    <td className="px-4 py-2">{p.name}</td>
                    <td className="px-4 py-2">
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                        {p.period}
                      </span>
                    </td>
                    <td className="px-4 py-2">{p.discount}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 text-xs rounded ${getStatusColor(p.status)}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-right">{p.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-6 flex justify-center">
            <nav className="flex space-x-2 text-sm">
              <button className="px-2 py-1 text-gray-400">&lt;</button>
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  className={`px-3 py-1 rounded ${
                    n === 1 ? "bg-blue-500 text-white" : "text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  {n}
                </button>
              ))}
              <button className="px-2 py-1 text-gray-400">&gt;</button>
            </nav>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductList;
