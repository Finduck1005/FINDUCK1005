// 필요한 React 훅과 아이콘들을 가져옵니다...
import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Moon,
  Sun,
  Monitor,
  MapPin,
  Star,
  Shield,
  MessageCircle,
  Heart,
  Eye,
  AlertTriangle,
} from "lucide-react";

// 게시물 상세 페이지 컴포넌트
export default function PostDetail() {
  // --- STATE MANAGEMENT ---
  // 현재 테마 (normal, dark, desk)
  const [theme, setTheme] = useState("normal");
  // 선택된 이미지 인덱스
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  // ‘좋아요’ 상태
  const [isHearted, setIsHearted] = useState(false);
  // ‘좋아요’ 수
  const [heartCount, setHeartCount] = useState(1247);

  // --- SIDE EFFECTS ---
  // 컴포넌트가 처음 렌더링될 때 localStorage에서 저장된 테마를 불러옵니다.
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "normal";
    setTheme(savedTheme);
  }, []);

  // --- DYNAMIC CLASS HELPERS ---
  // 현재 테마에 맞는 배경 및 텍스트 색상 클래스를 반환합니다.
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

  // 현재 테마에 맞는 카드 스타일 클래스를 반환합니다.
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

  // 현재 테마에 맞는 기본 텍스트 색상 클래스를 반환합니다.
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

  // 현재 테마에 맞는 보조 텍스트 색상 클래스를 반환합니다.
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

  // --- EVENT HANDLERS ---
  // ‘좋아요’ 버튼 클릭 핸들러
  const handleHeartClick = () => {
    setIsHearted(!isHearted);
    setHeartCount((prev) => (isHearted ? prev - 1 : prev + 1));
  };

  // --- MOCK DATA ---
  // 실제 애플리케이션에서는 API를 통해 받아올 게시물 데이터입니다.
  const postData = {
    id: "sell_1",
    type: "seller", // "buyer"일 수도 있습니다.
    user: {
      name: "sneaker_king23",
      rating: 4.8,
      reviews: 234,
      memberSince: "2019",
      verified: true,
      location: "New York, NY",
    },
    item: {
      name: "Nike Air Jordan 1 Retro High OG 'Chicago' 2015",
      size: "US 9",
      condition: "New",
      description:
        "Brand new in box, never worn. Comes with original receipt and all accessories. Stored in smoke-free environment. This is the 2015 retro release, not a replica. Authentic guarantee or your money back.",
      images: [
        "/placeholder.svg?height=500&width=500",
        "/placeholder.svg?height=500&width=500",
        "/placeholder.svg?height=500&width=500",
      ],
      specifications: {
        Brand: "Nike",
        Model: "Air Jordan 1 Retro High OG",
        Size: "US 9",
        Condition: "New with box",
        "Year Released": "2015",
        "Style Code": "555088-101",
        Color: "White/Black-Red",
      },
    },
    timePosted: "2 hours ago",
    views: 127,
    interested: 23,
  };

  // --- COMPONENT RENDER ---
  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${getThemeClasses()}`}
    >
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* === POST HEADER === */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                postData.type === "seller"
                  ? "bg-green-100 text-green-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {postData.type === "seller" ? "Selling" : "Looking to Buy"}
            </span>
            <span className={`text-sm ${getSecondaryTextClasses()}`}>•</span>
            <span className={`text-sm ${getSecondaryTextClasses()}`}>
              Posted {postData.timePosted}
            </span>
          </div>
          <h1 className={`text-2xl sm:text-3xl font-bold ${getTextClasses()}`}>
            {postData.item.name}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* === IMAGES SECTION (판매자 게시물인 경우에만 표시) === */}
          {postData.type === "seller" && (
            <div className="lg:col-span-3">
              <div
                className={`${getCardClasses()} rounded-lg overflow-hidden mb-4`}
              >
                <div className="relative">
                  <img
                    src={
                      postData.item.images[selectedImageIndex] ||
                      "/placeholder.svg"
                    }
                    alt={postData.item.name}
                    width={500}
                    height={400}
                    className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                  />
                  {/* 이미지 캐러셀 버튼 */}
                  {postData.item.images.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          setSelectedImageIndex(
                            Math.max(0, selectedImageIndex - 1)
                          )
                        }
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-full hover:bg-opacity-100 transition-all"
                        disabled={selectedImageIndex === 0}
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() =>
                          setSelectedImageIndex(
                            Math.min(
                              postData.item.images.length - 1,
                              selectedImageIndex + 1
                            )
                          )
                        }
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-full hover:bg-opacity-100 transition-all"
                        disabled={
                          selectedImageIndex === postData.item.images.length - 1
                        }
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* 썸네일 갤러리 */}
              {postData.item.images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {postData.item.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImageIndex === index
                          ? "border-blue-500"
                          : "border-gray-200 dark:border-gray-600"
                      }`}
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Product image ${index + 1}`}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* === ITEM DETAILS === */}
          <div
            className={
              postData.type === "seller" ? "lg:col-span-2" : "lg:col-span-5"
            }
          >
            <div className={`${getCardClasses()} rounded-lg p-6 mb-6`}>
              <h3 className={`text-lg font-semibold ${getTextClasses()} mb-4`}>
                Item Details
              </h3>

              {/* 가격 */}
              <div className="mb-4">
                <span className={`text-2xl font-bold ${getTextClasses()}`}>
                  $385
                </span>
              </div>

              {/* 통계 정보 (좋아요, 조회수 등) */}
              <div className="flex items-center space-x-4 mb-4">
                <button
                  onClick={handleHeartClick}
                  className="flex items-center space-x-2 hover:scale-105 transition-transform"
                >
                  <Heart
                    className={`h-5 w-5 ${
                      isHearted ? "text-red-500 fill-current" : "text-gray-400"
                    }`}
                  />
                  <span className={`${getTextClasses()}`}>
                    {heartCount.toLocaleString()}
                  </span>
                </button>
                <span className={`${getSecondaryTextClasses()}`}>|</span>
                <div className="flex items-center space-x-2">
                  <Eye className="h-5 w-5 text-gray-500" />
                  <span className={`${getTextClasses()}`}>127</span>
                </div>
                <span className={`${getSecondaryTextClasses()}`}>|</span>
                <div className={`text-sm ${getSecondaryTextClasses()}`}>
                  1 days ago
                </div>
                <span className={`${getSecondaryTextClasses()}`}>|</span>
                <button className="flex items-center space-x-1 text-red-600 hover:text-red-700 transition-colors">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-sm">Report</span>
                </button>
              </div>

              {/* 상품 속성 */}
              <div className="space-y-2">
                <div className="flex items-center space-x-1">
                  <span className={`${getSecondaryTextClasses()}`}>
                    Condition:
                  </span>
                  <span className={`font-medium ${getTextClasses()}`}>New</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className={`${getSecondaryTextClasses()}`}>Size:</span>
                  <span className={`font-medium ${getTextClasses()}`}>
                    US 9
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className={`${getSecondaryTextClasses()}`}>
                    Shipping Cost:
                  </span>
                  <span className={`font-medium ${getTextClasses()}`}>
                    Free
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className={`${getSecondaryTextClasses()}`}>
                    Country of Origin:
                  </span>
                  <span className={`font-medium ${getTextClasses()}`}>
                    United States
                  </span>
                </div>
              </div>
            </div>

            {/* === CONTACT ACTIONS === */}
            <div className={`${getCardClasses()} rounded-lg p-6`}>
              <h3 className={`text-lg font-semibold ${getTextClasses()} mb-4`}>
                Contact {postData.type === "seller" ? "Seller" : "Buyer"}
              </h3>
              <div>
                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                  <MessageCircle className="h-5 w-5" />
                  <span>Send Message</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* === DESCRIPTION AND SELLER INFO === */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* 상품 설명 */}
          <div className="lg:col-span-2">
            <div className={`${getCardClasses()} rounded-lg p-6`}>
              <h3 className={`text-lg font-semibold ${getTextClasses()} mb-4`}>
                Description
              </h3>
              <p className={`${getSecondaryTextClasses()} leading-relaxed`}>
                {postData.item.description}
              </p>
            </div>
          </div>

          {/* 판매자 정보 */}
          <div className="lg:col-span-1">
            <div className={`${getCardClasses()} rounded-lg p-6`}>
              <h3 className={`text-lg font-semibold ${getTextClasses()} mb-4`}>
                {postData.type === "seller" ? "Seller" : "Buyer"} Information
              </h3>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-lg">
                    {postData.user.name[0].toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className={`font-semibold ${getTextClasses()}`}>
                      {postData.user.name}
                    </h4>
                    {postData.user.verified && (
                      <Shield className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-sm mb-2">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span>
                        {postData.user.rating} ({postData.user.reviews} reviews)
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 mb-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{postData.user.location}</span>
                  </div>
                  <p className={`text-sm ${getSecondaryTextClasses()}`}>
                    Member since {postData.user.memberSince}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* === OTHER SELLERS === */}
        <div className={`${getCardClasses()} rounded-lg p-6 mt-8`}>
          <h3 className={`text-xl font-semibold ${getTextClasses()} mb-6`}>
            Other Sellers
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* 다른 판매자 목록 (예시 데이터) */}
            {[
              {
                id: "sell_2",
                user: "jordan_collector",
                size: "US 10.5",
                condition: "New",
                timePosted: "5 hours ago",
                price: "$395",
                thumbnail: "/placeholder.svg?height=200&width=200",
                description:
                  "Deadstock condition, stored in climate controlled environment.",
                location: "Los Angeles, CA",
                hearts: 234,
              },
              {
                id: "sell_3",
                user: "vintage_kicks",
                size: "US 8",
                condition: "Used - Excellent",
                timePosted: "1 day ago",
                price: "$320",
                thumbnail: "/placeholder.svg?height=200&width=200",
                description:
                  "Worn 3 times, excellent condition with minimal signs of wear.",
                location: "Chicago, IL",
                hearts: 156,
              },
              {
                id: "sell_4",
                user: "street_style_shop",
                size: "US 11",
                condition: "New",
                timePosted: "1 day ago",
                price: "$410",
                thumbnail: "/placeholder.svg?height=200&width=200",
                description:
                  "New with box, authentic guarantee. Fast shipping available.",
                location: "Miami, FL",
                hearts: 189,
              },
              {
                id: "sell_5",
                user: "sneaker_vault",
                size: "US 9.5",
                condition: "New",
                timePosted: "2 days ago",
                price: "$375",
                thumbnail: "/placeholder.svg?height=200&width=200",
                description:
                  "Pristine condition, comes with original packaging and tags.",
                location: "Seattle, WA",
                hearts: 298,
              },
            ].map((seller) => (
              <div key={seller.id} className="group cursor-pointer">
                <div className="relative mb-3">
                  <img
                    src={seller.thumbnail || "/placeholder.svg"}
                    alt={`${seller.user}'s listing`}
                    width={200}
                    height={200}
                    className="w-full h-32 sm:h-40 object-cover rounded-lg group-hover:scale-105 transition-transform"
                  />
                  <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:bg-gray-50">
                    <Heart className="h-3 w-3 text-gray-600" />
                  </button>
                  <span
                    className={`absolute top-2 left-2 text-xs px-2 py-1 rounded-full ${
                      seller.condition === "New"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {seller.condition}
                  </span>
                </div>
                <div className="space-y-1">
                  <h4
                    className={`font-medium ${getTextClasses()} text-sm line-clamp-1`}
                  >
                    {seller.user}
                  </h4>
                  <p className={`text-xs ${getSecondaryTextClasses()}`}>
                    Size: {seller.size}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Heart className="h-3 w-3 text-red-500 fill-current" />
                      <span className={`text-xs ${getSecondaryTextClasses()}`}>
                        {seller.hearts}
                      </span>
                    </div>
                    <span className={`text-sm font-bold ${getTextClasses()}`}>
                      {seller.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
