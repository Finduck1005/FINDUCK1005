// 필요한 라이브러리 및 아이콘 임포트
import { useState, useEffect } from "react";
import {
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

// 구매자 게시물 상세 페이지 컴포넌트
export default function BuyerPostDetail() {
  // 상태 변수 선언
  const [theme, setTheme] = useState("normal"); // 테마 상태 (normal, dark, desk)
  const [isHearted, setIsHearted] = useState(false); // 좋아요 여부
  const [heartCount, setHeartCount] = useState(892); // 좋아요 수

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

  // 좋아요 버튼 클릭 핸들러
  const handleHeartClick = () => {
    setIsHearted(!isHearted);
    setHeartCount((prev) => (isHearted ? prev - 1 : prev + 1));
  };

  // 구매자 게시물 목업 데이터
  const postData = {
    id: "buy_1",
    type: "buyer",
    user: {
      name: "chicago_fan_85",
      rating: 4.6,
      reviews: 89,
      memberSince: "2020",
      verified: true,
      location: "Chicago, IL",
    },
    item: {
      name: "Nike Air Jordan 1 Retro High OG 'Chicago' 2015",
      sizeWanted: "US 9",
      conditionPreference: "Any",
      maxBudget: "$350",
      description:
        "Looking for Chicago colorway in size 9. Condition doesn't matter as long as it's authentic. I'm a huge Bulls fan and this would complete my collection. Open to negotiation on price. Must come with proof of authenticity. Can meet locally in Chicago area or pay for shipping.",
    },
    timePosted: "1 hour ago",
    views: 89,
    interested: 12,
  };

  // JSX 렌더링
  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${getThemeClasses()}`}
    >
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* 게시물 헤더 */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              Looking to Buy
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 아이템 상세 정보 (구매자 게시물은 전체 너비 사용) */}
          <div className="lg:col-span-2">
            <div className={`${getCardClasses()} rounded-lg p-6 mb-6`}>
              <h3 className={`text-lg font-semibold ${getTextClasses()} mb-4`}>
                Looking For
              </h3>

              {/* 예산 */}
              <div className="mb-4">
                <span className={`text-2xl font-bold ${getTextClasses()}`}>
                  {postData.item.maxBudget}
                </span>
                <span className={`text-sm ${getSecondaryTextClasses()} ml-2`}>
                  max budget
                </span>
              </div>

              {/* 통계 */}
              <div className="flex items-center space-x-4 mb-4">
                {/* 좋아요 버튼 */}
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

                {/* 구분선 */}
                <span className={`${getSecondaryTextClasses()}`}>|</span>

                {/* 조회수 */}
                <div className="flex items-center space-x-2">
                  <Eye className="h-5 w-5 text-gray-500" />
                  <span className={`${getTextClasses()}`}>89</span>
                </div>

                {/* 구분선 */}
                <span className={`${getSecondaryTextClasses()}`}>|</span>

                {/* 게시 시간 */}
                <div className={`text-sm ${getSecondaryTextClasses()}`}>
                  1 hour ago
                </div>

                {/* 구분선 */}
                <span className={`${getSecondaryTextClasses()}`}>|</span>

                {/* 신고 버튼 */}
                <button className="flex items-center space-x-1 text-red-600 hover:text-red-700 transition-colors">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-sm">Report</span>
                </button>
              </div>

              {/* 아이템 속성 */}
              <div className="space-y-2">
                <div className="flex items-center space-x-1">
                  <span className={`${getSecondaryTextClasses()}`}>
                    Size Wanted:
                  </span>
                  <span className={`font-medium ${getTextClasses()}`}>
                    {postData.item.sizeWanted}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className={`${getSecondaryTextClasses()}`}>
                    Condition Preference:
                  </span>
                  <span className={`font-medium ${getTextClasses()}`}>
                    {postData.item.conditionPreference}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className={`${getSecondaryTextClasses()}`}>
                    Max Budget:
                  </span>
                  <span className={`font-medium ${getTextClasses()}`}>
                    {postData.item.maxBudget}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className={`${getSecondaryTextClasses()}`}>
                    Preferred Location:
                  </span>
                  <span className={`font-medium ${getTextClasses()}`}>
                    Chicago area or shipping
                  </span>
                </div>
              </div>
            </div>

            {/* 설명 */}
            <div className={`${getCardClasses()} rounded-lg p-6`}>
              <h3 className={`text-lg font-semibold ${getTextClasses()} mb-4`}>
                What I'm Looking For
              </h3>
              <p className={`${getSecondaryTextClasses()} leading-relaxed`}>
                {postData.item.description}
              </p>
            </div>
          </div>

          {/* 구매자 정보 및 연락처 */}
          <div className="lg:col-span-1 space-y-6">
            {/* 연락처 */}
            <div className={`${getCardClasses()} rounded-lg p-6`}>
              <h3 className={`text-lg font-semibold ${getTextClasses()} mb-4`}>
                Contact Buyer
              </h3>
              <div>
                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                  <MessageCircle className="h-5 w-5" />
                  <span>Send Message</span>
                </button>
              </div>
            </div>

            {/* 구매자 정보 */}
            <div className={`${getCardClasses()} rounded-lg p-6`}>
              <h3 className={`text-lg font-semibold ${getTextClasses()} mb-4`}>
                Buyer Information
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

        {/* 다른 구매자들 */}
        <div className={`${getCardClasses()} rounded-lg p-6 mt-8`}>
          <h3 className={`text-xl font-semibold ${getTextClasses()} mb-6`}>
            Other Buyers
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              {
                id: "buy_2",
                user: "jordan_hunter",
                size: "US 10",
                condition: "New only",
                timePosted: "3 hours ago",
                maxBudget: "$400",
                description:
                  "Only interested in deadstock/new condition. Must come with original box.",
                location: "Dallas, TX",
                hearts: 156,
              },
              {
                id: "buy_3",
                user: "retro_lover",
                size: "US 8.5",
                condition: "Good or better",
                timePosted: "6 hours ago",
                maxBudget: "$300",
                description:
                  "Looking for good condition or better. Open to negotiation on price.",
                location: "Boston, MA",
                hearts: 89,
              },
              {
                id: "buy_4",
                user: "sneaker_newbie",
                size: "US 11",
                condition: "Any",
                timePosted: "12 hours ago",
                maxBudget: "$250",
                description:
                  "First time buyer, looking for authentic pair in size 11. Any condition considered.",
                location: "Phoenix, AZ",
                hearts: 67,
              },
              {
                id: "buy_5",
                user: "collector_mike",
                size: "US 9",
                condition: "New with box",
                timePosted: "1 day ago",
                maxBudget: "$450",
                description:
                  "Serious collector looking for mint condition with all original accessories.",
                location: "Atlanta, GA",
                hearts: 234,
              },
            ].map((buyer) => (
              <div key={buyer.id} className="group cursor-pointer">
                <div className="relative mb-3">
                  <div className="w-full h-32 sm:h-40 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-white font-bold text-lg">
                          {buyer.user[0].toUpperCase()}
                        </span>
                      </div>
                      <span className={`text-xs ${getSecondaryTextClasses()}`}>
                        Looking to Buy
                      </span>
                    </div>
                  </div>
                  <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:bg-gray-50">
                    <Heart className="h-3 w-3 text-gray-600" />
                  </button>
                  <span className="absolute top-2 left-2 text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                    {buyer.condition}
                  </span>
                </div>
                <div className="space-y-1">
                  <h4
                    className={`font-medium ${getTextClasses()} text-sm line-clamp-1`}
                  >
                    {buyer.user}
                  </h4>
                  <p className={`text-xs ${getSecondaryTextClasses()}`}>
                    Size: {buyer.size}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Heart className="h-3 w-3 text-red-500 fill-current" />
                      <span className={`text-xs ${getSecondaryTextClasses()}`}>
                        {buyer.hearts}
                      </span>
                    </div>
                    <span className={`text-sm font-bold ${getTextClasses()}`}>
                      {buyer.maxBudget}
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
