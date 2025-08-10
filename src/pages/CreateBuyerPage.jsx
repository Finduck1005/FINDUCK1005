// 필요한 라이브러리 및 아이콘 임포트
import { useState, useEffect } from "react";
import {
  Moon,
  Sun,
  Monitor,
  ChevronDown,
  MapPin,
  DollarSign,
  AlertCircle,
  Eye,
  Save,
  Send,
} from "lucide-react";

// 구매 게시물 생성 컴포넌트
export default function CreateBuyerPost() {
  // 상태 변수 선언
  const [theme, setTheme] = useState("normal"); // 테마 상태
  const [formData, setFormData] = useState({
    // 폼 데이터
    title: "",
    brand: "",
    model: "",
    sizeWanted: "", // 구매자가 원하는 사이즈
    conditionPreference: "", // 구매자가 선호하는 상태
    maxBudget: "", // 최대 예산
    description: "",
    category: "",
    location: "", // 희망 거래 지역
    meetupAvailable: false, // 직거래 가능 여부
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

  // 입력 변경 핸들러
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // 제출 핸들러
  const handleSubmit = (action) => {
    // 폼 제출 처리
    console.log("Submitting as:", action, formData);
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
    "Any",
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
    "Any",
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
            Create New Buying Post
          </h1>
          <p className={`${getSecondaryTextClasses()}`}>
            Fill out the details below to create your buying post. All fields
            marked with * are required.
          </p>
        </div>

        <form className="space-y-8">
          {/* 기본 정보 */}
          <div className={`${getCardClasses()} rounded-lg p-6`}>
            <h2 className={`text-xl font-semibold ${getTextClasses()} mb-4`}>
              Item Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 제목 */}
              <div className="md:col-span-2">
                <label
                  className={`block text-sm font-medium ${getTextClasses()} mb-2`}
                >
                  Item Name *
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

              {/* 원하는 사이즈 */}
              <div>
                <label
                  className={`block text-sm font-medium ${getTextClasses()} mb-2`}
                >
                  Size Wanted *
                </label>
                <div className="relative">
                  <select
                    value={formData.sizeWanted}
                    onChange={(e) =>
                      handleInputChange("sizeWanted", e.target.value)
                    }
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

              {/* 선호하는 상태 */}
              <div>
                <label
                  className={`block text-sm font-medium ${getTextClasses()} mb-2`}
                >
                  Condition Preference *
                </label>
                <div className="relative">
                  <select
                    value={formData.conditionPreference}
                    onChange={(e) =>
                      handleInputChange("conditionPreference", e.target.value)
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
            </div>
          </div>

          {/* 예산 */}
          <div className={`${getCardClasses()} rounded-lg p-6`}>
            <h2
              className={`text-xl font-semibold ${getTextClasses()} mb-4 flex items-center`}
            >
              <DollarSign className="h-5 w-5 mr-2" />
              Budget
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  className={`block text-sm font-medium ${getTextClasses()} mb-2`}
                >
                  Max Budget *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    value={formData.maxBudget}
                    onChange={(e) =>
                      handleInputChange("maxBudget", e.target.value)
                    }
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
              placeholder="Describe what you are looking for in detail. Include any specific requirements, authenticity needs, and why you're buying..."
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

          {/* 위치 및 직거래 */}
          <div className={`${getCardClasses()} rounded-lg p-6`}>
            <h2
              className={`text-xl font-semibold ${getTextClasses()} mb-4 flex items-center`}
            >
              <MapPin className="h-5 w-5 mr-2" />
              Location & Meetup
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  className={`block text-sm font-medium ${getTextClasses()} mb-2`}
                >
                  Preferred Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  placeholder="e.g., Seoul, Korea or Online"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300"
                  }`}
                />
              </div>
              <div className="flex items-center mt-2 md:mt-0">
                <input
                  type="checkbox"
                  id="meetupAvailable"
                  checked={formData.meetupAvailable}
                  onChange={(e) =>
                    handleInputChange("meetupAvailable", e.target.checked)
                  }
                  className={`h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 ${
                    theme === "dark" ? "bg-gray-700 border-gray-600" : ""
                  }`}
                />
                <label
                  htmlFor="meetupAvailable"
                  className={`ml-2 block text-sm ${getTextClasses()}`}
                >
                  Meetup Available
                </label>
              </div>
            </div>
          </div>

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
                Your buying post preview will appear here once you fill out the
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
              <span>Publish Post</span>
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
                  Tips for a successful buying post:
                </h3>
                <ul
                  className={`text-sm ${getSecondaryTextClasses()} space-y-1`}
                >
                  <li>
                    • Be specific about the item you are looking for (model,
                    year, color, etc.)
                  </li>
                  <li>• Clearly state your preferred size and condition</li>
                  <li>• Set a realistic maximum budget</li>
                  <li>• Mention if you require proof of authenticity</li>
                  <li>
                    • Respond to messages quickly to facilitate a smooth
                    transaction
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
