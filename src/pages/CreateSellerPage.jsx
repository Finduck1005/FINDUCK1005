// 필요한 라이브러리 및 아이콘 임포트
import { useState, useEffect } from "react";
import {
  Moon,
  Sun,
  Monitor,
  Upload,
  X,
  ChevronDown,
  DollarSign,
  AlertCircle,
  Eye,
  Save,
  Send,
} from "lucide-react";

// 판매 게시물 생성 컴포넌트
export default function CreateSellerPost() {
  // 상태 변수 선언
  const [theme, setTheme] = useState("normal"); // 테마 상태
  const [images, setImages] = useState([]); // 업로드된 이미지 목록
  const [dragActive, setDragActive] = useState(false); // 드래그 활성화 여부
  const [formData, setFormData] = useState({
    // 폼 데이터
    title: "",
    brand: "",
    model: "",
    size: "",
    condition: "",
    price: "",
    description: "",
    category: "",
    color: "",
    year: "",
    styleCode: "",
    shippingCost: "",
    shippingTime: "",
    returns: "",
    location: "",
    meetupAvailable: false,
  });

  // 컴포넌트 마운트 시 로컬 스토리지에서 테마 불러오기
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "normal";
    setTheme(savedTheme);
  }, []);

  // 테마에 따른 CSS 클래스 반환 함수
  const getThemeClasses = () => {
    switch (theme) {
      case "dark":
        return "bg-gray-900 text-white";
      case "desk":
        return "bg-blue-50 text-gray-900";
      default:
        return "bg-gray-50 text-gray-900";
    }
  };

  // 카드 컴포넌트의 테마별 CSS 클래스 반환 함수
  const getCardClasses = () => {
    switch (theme) {
      case "dark":
        return "bg-gray-800 border-gray-700";
      case "desk":
        return "bg-white border-blue-200 shadow-sm";
      default:
        return "bg-white border-gray-200";
    }
  };

  // 텍스트의 테마별 CSS 클래스 반환 함수
  const getTextClasses = () => {
    switch (theme) {
      case "dark":
        return "text-gray-100";
      case "desk":
        return "text-gray-800";
      default:
        return "text-gray-900";
    }
  };

  // 보조 텍스트의 테마별 CSS 클래스 반환 함수
  const getSecondaryTextClasses = () => {
    switch (theme) {
      case "dark":
        return "text-gray-300";
      case "desk":
        return "text-gray-600";
      default:
        return "text-gray-600";
    }
  };

  // 드래그 이벤트 핸들러
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // 드롭 이벤트 핸들러
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  // 파일 처리 핸들러
  const handleFiles = (files) => {
    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target && e.target.result && images.length < 10) {
            setImages((prev) => [...prev, e.target.result]);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  // 이미지 제거 핸들러
  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // 입력 변경 핸들러
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // 제출 핸들러
  const handleSubmit = (action) => {
    // 폼 제출 처리
    console.log("Submitting as:", action, formData, images);
  };

  // 선택 옵션 데이터
  const brands = [
    "Nike",
    "Adidas",
    "Jordan",
    "Converse",
    "New Balance",
    "Vans",
    "Puma",
    "Reebok",
    "Other",
  ];
  const categories = ["Sneakers", "Clothing", "Accessories", "Collectibles"];
  const conditions = [
    "New with box",
    "New without box",
    "Used - Excellent",
    "Used - Good",
    "Used - Fair",
  ];
  const sizes = [
    "US 6",
    "US 6.5",
    "US 7",
    "US 7.5",
    "US 8",
    "US 8.5",
    "US 9",
    "US 9.5",
    "US 10",
    "US 10.5",
    "US 11",
    "US 11.5",
    "US 12",
    "US 12.5",
    "US 13",
  ];

  // JSX 렌더링
  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${getThemeClasses()}`}
    >
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 페이지 헤더 */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${getTextClasses()} mb-2`}>
            Create New Listing
          </h1>
          <p className={`${getSecondaryTextClasses()}`}>
            Fill out the details below to create your listing. All fields marked
            with * are required.
          </p>
        </div>

        <form className="space-y-8">
          {/* 이미지 업로드 섹션 */}
          <div className={`${getCardClasses()} rounded-lg p-6`}>
            <h2 className={`text-xl font-semibold ${getTextClasses()} mb-4`}>
              Photos *
            </h2>
            <p className={`text-sm ${getSecondaryTextClasses()} mb-4`}>
              Add up to 10 photos. The first photo will be your main image.
            </p>

            {/* 이미지 그리드 */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-4">
              {images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Upload ${index + 1}`}
                    width={150}
                    height={150}
                    className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  {index === 0 && (
                    <div className="absolute bottom-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                      Main
                    </div>
                  )}
                </div>
              ))}

              {/* 업로드 버튼 */}
              {images.length < 10 && (
                <div
                  className={`h-32 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
                    dragActive
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => {
                    const fileInput = document.getElementById("file-input");
                    if (fileInput) fileInput.click();
                  }}
                >
                  <div className="text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Add Photo</p>
                  </div>
                </div>
              )}
            </div>

            <input
              id="file-input"
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files) {
                  handleFiles(Array.from(e.target.files));
                }
              }}
            />
          </div>

          {/* 기본 정보 */}
          <div className={`${getCardClasses()} rounded-lg p-6`}>
            <h2 className={`text-xl font-semibold ${getTextClasses()} mb-4`}>
              Basic Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 제목 */}
              <div className="md:col-span-2">
                <label
                  className={`block text-sm font-medium ${getTextClasses()} mb-2`}
                >
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="e.g., Nike Air Jordan 1 Retro High OG 'Chicago' 2015"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300"
                  }`}
                />
              </div>

              {/* 브랜드 */}
              <div>
                <label
                  className={`block text-sm font-medium ${getTextClasses()} mb-2`}
                >
                  Brand *
                </label>
                <div className="relative">
                  <select
                    value={formData.brand}
                    onChange={(e) => handleInputChange("brand", e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none ${
                      theme === "dark"
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    <option value="">Select Brand</option>
                    {brands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* 카테고리 */}
              <div>
                <label
                  className={`block text-sm font-medium ${getTextClasses()} mb-2`}
                >
                  Category *
                </label>
                <div className="relative">
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      handleInputChange("category", e.target.value)
                    }
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none ${
                      theme === "dark"
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* 모델 */}
              <div>
                <label
                  className={`block text-sm font-medium ${getTextClasses()} mb-2`}
                >
                  Model
                </label>
                <input
                  type="text"
                  value={formData.model}
                  onChange={(e) => handleInputChange("model", e.target.value)}
                  placeholder="e.g., Air Jordan 1 Retro High OG"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300"
                  }`}
                />
              </div>

              {/* 사이즈 */}
              <div>
                <label
                  className={`block text-sm font-medium ${getTextClasses()} mb-2`}
                >
                  Size *
                </label>
                <div className="relative">
                  <select
                    value={formData.size}
                    onChange={(e) => handleInputChange("size", e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none ${
                      theme === "dark"
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    <option value="">Select Size</option>
                    {sizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* 상태 */}
              <div>
                <label
                  className={`block text-sm font-medium ${getTextClasses()} mb-2`}
                >
                  Condition *
                </label>
                <div className="relative">
                  <select
                    value={formData.condition}
                    onChange={(e) =>
                      handleInputChange("condition", e.target.value)
                    }
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none ${
                      theme === "dark"
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    <option value="">Select Condition</option>
                    {conditions.map((condition) => (
                      <option key={condition} value={condition}>
                        {condition}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* 색상 */}
              <div>
                <label
                  className={`block text-sm font-medium ${getTextClasses()} mb-2`}
                >
                  Color
                </label>
                <input
                  type="text"
                  value={formData.color}
                  onChange={(e) => handleInputChange("color", e.target.value)}
                  placeholder="e.g., White/Black-Red"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300"
                  }`}
                />
              </div>
            </div>
          </div>

          {/* 가격 */}
          <div className={`${getCardClasses()} rounded-lg p-6`}>
            <h2
              className={`text-xl font-semibold ${getTextClasses()} mb-4 flex items-center`}
            >
              <DollarSign className="h-5 w-5 mr-2" />
              Pricing
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  className={`block text-sm font-medium ${getTextClasses()} mb-2`}
                >
                  Price *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    placeholder="0.00"
                    className={`w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      theme === "dark"
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300"
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 설명 */}
          <div className={`${getCardClasses()} rounded-lg p-6`}>
            <h2 className={`text-xl font-semibold ${getTextClasses()} mb-4`}>
              Description *
            </h2>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describe your item in detail. Include condition, authenticity, any flaws, and why you're selling..."
              rows={6}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300"
              }`}
            />
            <p className={`text-sm ${getSecondaryTextClasses()} mt-2`}>
              {formData.description.length}/1000 characters
            </p>
          </div>

          {/* 배송 및 위치 */}

          {/* 미리보기 */}
          <div className={`${getCardClasses()} rounded-lg p-6`}>
            <h2
              className={`text-xl font-semibold ${getTextClasses()} mb-4 flex items-center`}
            >
              <Eye className="h-5 w-5 mr-2" />
              Preview
            </h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <p className={`${getSecondaryTextClasses()}`}>
                Your listing preview will appear here once you fill out the
                required fields
              </p>
            </div>
          </div>

          {/* 액션 버튼 */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button
              type="button"
              onClick={() => handleSubmit("draft")}
              className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <Save className="h-5 w-5" />
              <span>Save as Draft</span>
            </button>
            <button
              type="button"
              onClick={() => handleSubmit("publish")}
              className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Send className="h-5 w-5" />
              <span>Publish Listing</span>
            </button>
          </div>

          {/* 팁 */}
          <div
            className={`${getCardClasses()} rounded-lg p-6 border-l-4 border-blue-500`}
          >
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <h3 className={`font-semibold ${getTextClasses()} mb-2`}>
                  Tips for a successful listing:
                </h3>
                <ul
                  className={`text-sm ${getSecondaryTextClasses()} space-y-1`}
                >
                  <li>
                    • Use high-quality, well-lit photos from multiple angles
                  </li>
                  <li>• Be honest about the condition and any flaws</li>
                  <li>
                    • Include original box, receipts, or authenticity proof when
                    available
                  </li>
                  <li>• Research similar listings to price competitively</li>
                  <li>• Respond to messages quickly to build trust</li>
                </ul>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
