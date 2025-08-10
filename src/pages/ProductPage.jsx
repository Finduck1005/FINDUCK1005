// 필요한 라이브러리 및 아이콘 임포트
import { useState, useEffect } from "react"
import { Heart, Share2, ChevronLeft, ChevronRight, Truck, RotateCcw, Moon, Sun, Monitor, ArrowLeft, Bell, BellRing, TrendingUp, ExternalLink, ChevronDown, AlertTriangle, Shield } from 'lucide-react'
import { Link, useParams } from "react-router-dom"
import { supabase } from "../lib/supabaseClient"
import chibinuigurumi from "../img/치비누이구루미.jpg"

// ProductDetail 컴포넌트 정의
export default function ProductDetail() {
  // 상태 변수들 선언
  const [theme, setTheme] = useState("normal") // 테마 상태 (normal, dark, desk)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0) // 선택된 이미지 인덱스
  const [isHearted, setIsHearted] = useState(false) // 좋아요 여부
  const [heartCount, setHeartCount] = useState(1247) // 좋아요 수
  const [isNotificationActive, setIsNotificationActive] = useState(false) // 알림 활성화 여부
  const [marketView, setMarketView] = useState("official") // 마켓 뷰 (official, seller, buyer)
  const [descriptionExpanded, setDescriptionExpanded] = useState(false) // 설명 펼침 여부
  const [issuesExpanded, setIssuesExpanded] = useState(false) // 이슈 펼침 여부

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  // 컴포넌트 마운트 시 로컬 스토리지에서 테마 및 제품 데이터 불러오기
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "normal"
    setTheme(savedTheme)

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('Goods')
          .select('*')
          .eq('id', Number(id))
          .single();

        if (error) {
          throw error;
        }
        setProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id])

  // 테마에 따른 CSS 클래스 반환 함수
  const getThemeClasses = () => {
    switch (theme) {
      case "dark":
        return "bg-gray-900 text-white"
      case "desk":
        return "bg-blue-50 text-gray-900"
      default:
        return "bg-gray-50 text-gray-900"
    }
  }

  // 카드 컴포넌트의 테마별 CSS 클래스 반환 함수
  const getCardClasses = () => {
    switch (theme) {
      case "dark":
        return "bg-gray-800 border-gray-700"
      case "desk":
        return "bg-white border-blue-200 shadow-sm"
      default:
        return "bg-white border-gray-200"
    }
  }

  // 텍스트의 테마별 CSS 클래스 반환 함수
  const getTextClasses = () => {
    switch (theme) {
      case "dark":
        return "text-gray-100"
      case "desk":
        return "text-gray-800"
      default:
        return "text-gray-900"
    }
  }

  // 보조 텍스트의 테마별 CSS 클래스 반환 함수
  const getSecondaryTextClasses = () => {
    switch (theme) {
      case "dark":
        return "text-gray-300"
      case "desk":
        return "text-gray-600"
      default:
        return "text-gray-600"
    }
  }

  // 제품 이미지 데이터 (현재는 플레이스홀더, 추후 Goods 테이블에 이미지 URL 필드 추가 필요)
  const productImages = [
    chibinuigurumi,
    chibinuigurumi,
    chibinuigurumi,
    chibinuigurumi,
    chibinuigurumi,
  ]

  // 좋아요 버튼 클릭 핸들러
  const handleHeartClick = () => {
    setIsHearted(!isHearted)
    setHeartCount((prev) => (isHearted ? prev - 1 : prev + 1))
  }

  // 알림 버튼 클릭 핸들러
  const handleNotificationClick = () => {
    setIsNotificationActive(!isNotificationActive)
  }

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen">Error: {error}</div>;
  }

  if (!product) {
    return <div className="flex justify-center items-center h-screen">Product not found.</div>;
  }

  // Goods 테이블 데이터와 기존 UI 구조를 매핑
  const productDetails = {
    name: product.goods_name,
    itemNumber: product.id,
    description: product.description,
    specifications: {
      "IP": product.goods_ip,
      "Affiliation": product.goods_aff,
      "Category": product.goods_category,
      "Character": product.goods_character,
      "Price": product.price,
    },
    // 이슈 데이터를 파싱하거나 변환해야 할 수 있음
    issues: product.issue ? [{
      id: 1,
      title: "Known Issue",
      description: product.issue,
      severity: "medium",
      verified: true,
      reportedDate: new Date(product.created_at).toLocaleDateString(),
      lastUpdated: new Date(product.created_at).toLocaleDateString(),
      reportsCount: 1,
      affectedBatches: "N/A",
      workaround: "Check details carefully.",
    }] : [],
  };

  // 시장 활동, 가격 변동, 유사 상품 데이터는 별도 API 또는 테이블에서 가져와야 함
  const marketActivity = {
    official: [
      {
        id: "official_1",
        site: "AmiAmi",
        price: "¥1,800",
        url: "https://www.amiami.jp/",
        logo: "/placeholder.svg?height=40&width=40",
        updated: "Today",
      },
      {
        id: "official_2",
        site: "Suruga-ya",
        price: "¥2,000",
        url: "https://www.suruga-ya.jp/",
        logo: "/placeholder.svg?height=40&width=40",
        updated: "2 days ago",
      },
    ],
    selling: [
      {
        id: "sell_1",
        user: "figure_seller",
        size: "N/A",
        condition: "New",
        timePosted: "2 hours ago",
        price: "¥2,500",
        thumbnail: "/placeholder.svg?height=60&width=60",
        images: ["/placeholder.svg?height=200&width=200", "/placeholder.svg?height=200&width=200"],
        description: "Brand new, unopened.",
        location: "Tokyo, JP",
      },
    ],
    buying: [
      {
        id: "buy_1",
        user: "collector_fan",
        size: "N/A",
        condition: "Any",
        timePosted: "1 hour ago",
        maxBudget: "¥2,000",
        description: "Looking for this figure, box condition doesn't matter.",
        location: "Osaka, JP",
      },
    ],
  };
  const priceHistory = [
    { date: "Jan", price: 1800 },
    { date: "Feb", price: 1850 },
    { date: "Mar", price: 1900 },
    { date: "Apr", price: 2000 },
    { date: "May", price: 2100 },
    { date: "Jun", price: 2200 },
    { date: "Jul", price: 2150 },
    { date: "Aug", price: 2250 },
    { date: "Sep", price: 2300 },
    { date: "Oct", price: 2400 },
    { date: "Nov", price: 2350 },
    { date: "Dec", price: 2500 },
  ];
  const similarProducts = [
    {
      id: 2,
      name: "학원아이돌마스터 치비구루미 Vol 1.",
      image: "/placeholder.svg?height=200&width=200",
      hearts: 892,
    },
    {
      id: 3,
      name: "학원아이돌마스터 치비구루미 Vol 2.",
      image: "/placeholder.svg?height=200&width=200",
      hearts: 634,
    },
    {
      id: 4,
      name: "학원아이돌마스터 치비구루미 Vol 3.",
      image: "/placeholder.svg?height=200&width=200",
      hearts: 456,
    },
  ];


  // JSX 렌더링
  return (
    <div className={`min-h-screen transition-colors duration-300 ${getThemeClasses()}`}>
      {/* 헤더 */}
      <header className="w-full py-4 px-4 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to results</span>
            </button>
            <div className="text-2xl font-bold text-slate-800">ShopHub</div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="text-slate-600 hover:text-slate-800 transition-colors">Sign In</button>
            <button className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors">
              Sign Up
            </button>

            {/* 테마 전환기 */}
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setTheme("normal")}
                className={`p-2 rounded-md transition-colors ${
                  theme === "normal" ? "bg-white shadow-sm text-blue-600" : "text-gray-600 hover:text-gray-800"
                }`}
                title="Normal Mode"
              >
                <Sun className="h-4 w-4" />
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={`p-2 rounded-md transition-colors ${
                  theme === "dark" ? "bg-gray-600 shadow-sm text-yellow-400" : "text-gray-600 hover:text-gray-800"
                }`}
                title="Dark Mode"
              >
                <Moon className="h-4 w-4" />
              </button>
              <button
                onClick={() => setTheme("desk")}
                className={`p-2 rounded-md transition-colors ${
                  theme === "desk" ? "bg-blue-100 shadow-sm text-blue-600" : "text-gray-600 hover:text-gray-800"
                }`}
                title="Desk Mode"
              >
                <Monitor className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* 이동 경로 (Breadcrumb) */}
        <nav className="mb-6">
          <div className={`text-sm ${getSecondaryTextClasses()}`}>
            <span>Home</span> &gt; <span>{productDetails.specifications.Category}</span> &gt; <span>{productDetails.specifications.IP}</span> &gt; <span>{productDetails.name}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* 이미지 갤러리 */}
          <div className="space-y-4">
            <div className={`${getCardClasses()} rounded-lg overflow-hidden`}>
              <div className="relative">
                <img
                  src={productImages[selectedImageIndex] || "/placeholder.svg"}
                  alt={productDetails.name}
                  width={500}
                  height={500}
                  className="w-full h-96 sm:h-[500px] object-cover"
                />
                <button
                  onClick={() => setSelectedImageIndex(Math.max(0, selectedImageIndex - 1))}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-full hover:bg-opacity-100 transition-all"
                  disabled={selectedImageIndex === 0}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setSelectedImageIndex(Math.min(productImages.length - 1, selectedImageIndex + 1))}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-full hover:bg-opacity-100 transition-all"
                  disabled={selectedImageIndex === productImages.length - 1}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* 썸네일 갤러리 */}
            <div className="flex space-x-2 overflow-x-auto">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImageIndex === index ? "border-blue-500" : "border-gray-200 dark:border-gray-600"
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
          </div>

          {/* 제품 정보 */}
          <div className="space-y-6">
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold ${getTextClasses()} mb-2`}>{productDetails.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <span className={`text-sm ${getSecondaryTextClasses()}`}>Item #{productDetails.itemNumber}</span>
              </div>
            </div>

            {/* 참여 통계 */}
            <div className={`${getCardClasses()} rounded-lg p-4`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleHeartClick}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                      isHearted
                        ? "bg-red-100 text-red-600"
                        : theme === "dark"
                          ? "bg-gray-700 hover:bg-gray-600"
                          : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${isHearted ? "fill-current" : ""}`} />
                    <span className="font-medium">{heartCount}</span>
                  </button>
                  <button
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      theme === "dark" ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    <Share2 className="h-5 w-5" />
                    <span>Share</span>
                  </button>
                  <button
                    onClick={handleNotificationClick}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                      isNotificationActive
                        ? "bg-blue-100 text-blue-600"
                        : theme === "dark"
                          ? "bg-gray-700 hover:bg-gray-600"
                          : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {isNotificationActive ? <BellRing className="h-5 w-5" /> : <Bell className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* 상태 및 사양 */}
            <div className={`${getCardClasses()} rounded-lg p-6`}>
              <h3 className={`text-lg font-semibold ${getTextClasses()} mb-4`}>Item Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(productDetails.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className={`${getSecondaryTextClasses()}`}>{key}:</span>
                    <span className={`font-medium ${getTextClasses()}`}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 게시물 생성 버튼 */}
            <div className="grid grid-cols-2 gap-4">
              <Link to="/create-seller" className="w-full bg-green-500 text-white text-center font-bold py-3 rounded-lg hover:bg-green-600 transition-colors">
                Seller Posting
              </Link>
              <Link to="/create-buyer" className="w-full bg-blue-500 text-white text-center font-bold py-3 rounded-lg hover:bg-blue-600 transition-colors">
                Buyer Posting
              </Link>
            </div>
          </div>
        </div>

        {/* 설명 */}
        <div className={`${getCardClasses()} rounded-lg p-6 mb-8`}>
          <h3 className={`text-xl font-semibold ${getTextClasses()} mb-4`}>Description</h3>
          <div className="relative">
            <div
              className={`${getSecondaryTextClasses()} leading-relaxed whitespace-pre-line ${
                descriptionExpanded ? "" : "overflow-hidden"
              }`}
              style={
                !descriptionExpanded
                  ? {
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      maxHeight: "3rem",
                    }
                  : {}
              }
            >
              {productDetails.description}
            </div>
            {!descriptionExpanded && (
              <div
                className="absolute bottom-0 left-0 right-0 h-6 pointer-events-none"
                style={{
                  background:
                    theme === "dark"
                      ? "linear-gradient(transparent, #1f2937)"
                      : theme === "desk"
                        ? "linear-gradient(transparent, white)"
                        : "linear-gradient(transparent, white)",
                }}
              />
            )}
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setDescriptionExpanded(!descriptionExpanded)}
              className={`flex items-center space-x-1 text-blue-600 hover:text-blue-700 transition-colors`}
            >
              <ChevronDown
                className={`h-4 w-4 transform transition-transform ${descriptionExpanded ? "rotate-180" : ""}`}
              />
              <span className="text-sm">{descriptionExpanded ? "Show Less" : "Show More"}</span>
            </button>
          </div>
        </div>

        {/* 알려진 이슈 */}
        <div className={`${getCardClasses()} rounded-lg p-6 mb-8`}>
          <h3 className={`text-xl font-semibold ${getTextClasses()} mb-4 flex items-center`}>
            <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
            Known Issues
          </h3>

          {productDetails.issues && productDetails.issues.length > 0 ? (
            <div className="space-y-4">
              {productDetails.issues
                .slice(0, issuesExpanded ? productDetails.issues.length : 1)
                .map((issue, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-l-4 ${
                      issue.severity === "high"
                        ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                        : issue.severity === "medium"
                          ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
                          : "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span
                          className={`text-sm font-medium px-2 py-1 rounded-full ${
                            issue.severity === "high"
                              ? "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
                              : issue.severity === "medium"
                                ? "bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100"
                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
                          }`}
                        >
                          {issue.severity === "high" ? "High" : issue.severity === "medium" ? "Medium" : "Low"}
                        </span>
                        <span className={`text-xs ${getSecondaryTextClasses()}`}>Reported: {issue.reportedDate}</span>
                      </div>
                      {issue.verified && (
                        <div className="flex items-center space-x-1">
                          <Shield className="h-4 w-4 text-green-500" />
                          <span className="text-xs text-green-600 dark:text-green-400">Verified</span>
                        </div>
                      )}
                    </div>

                    <h4 className={`font-semibold ${getTextClasses()} mb-2`}>{issue.title}</h4>
                    <p className={`text-sm ${getSecondaryTextClasses()} mb-3 leading-relaxed`}>{issue.description}</p>

                    {issue.affectedBatches && (
                      <div className="mb-3">
                        <span className={`text-xs font-medium ${getTextClasses()}`}>Affected Batches: </span>
                        <span className={`text-xs ${getSecondaryTextClasses()}`}>{issue.affectedBatches}</span>
                      </div>
                    )}

                    {issue.workaround && (
                      <div className={`p-3 rounded-md ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
                        <span className={`text-xs font-medium ${getTextClasses()} block mb-1`}>Workaround:</span>
                        <span className={`text-xs ${getSecondaryTextClasses()}`}>{issue.workaround}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                      <span className={`text-xs ${getSecondaryTextClasses()}`}>
                        {issue.reportsCount} reports • Last updated: {issue.lastUpdated}
                      </span>
                      <button className="text-xs text-blue-600 hover:text-blue-700 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}

              {productDetails.issues.length > 1 && (
                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => setIssuesExpanded(!issuesExpanded)}
                    className={`flex items-center space-x-1 text-blue-600 hover:text-blue-700 transition-colors`}
                  >
                    <ChevronDown
                      className={`h-4 w-4 transform transition-transform ${issuesExpanded ? "rotate-180" : ""}`}
                    />
                    <span className="text-sm">
                      {issuesExpanded ? "Show Less" : `Show ${productDetails.issues.length - 1} More Issues`}
                    </span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className={`text-center py-8 ${getSecondaryTextClasses()}`}>
              <AlertTriangle className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p className="text-sm">No known issues reported for this product.</p>
              <p className="text-xs mt-1">Issues are verified by our community and official sources.</p>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-between">
              <span className={`text-sm ${getSecondaryTextClasses()}`}>Found an issue with this product?</span>
              <button className="text-sm text-blue-600 hover:text-blue-700 transition-colors font-medium">
                Report Issue
              </button>
            </div>
          </div>
        </div>

        {/* 시장 활동 */}
        <div className={`${getCardClasses()} rounded-lg p-6 mb-8`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-xl font-semibold ${getTextClasses()}`}>Market Activity</h3>

            {/* 공식/판매자/구매자 토글 */}
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setMarketView("official")}
                className={`px-4 py-2 rounded-md transition-colors text-sm font-medium ${
                  marketView === "official"
                    ? "bg-white dark:bg-gray-600 shadow-sm text-purple-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Official
              </button>
              <button
                onClick={() => setMarketView("seller")}
                className={`px-4 py-2 rounded-md transition-colors text-sm font-medium ${
                  marketView === "seller"
                    ? "bg-white dark:bg-gray-600 shadow-sm text-green-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Sellers
              </button>
              <button
                onClick={() => setMarketView("buyer")}
                className={`px-4 py-2 rounded-md transition-colors text-sm font-medium ${
                  marketView === "buyer"
                    ? "bg-white dark:bg-gray-600 shadow-sm text-blue-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Buyers
              </button>
            </div>
          </div>

          {/* 공식 판매처 목록 */}
          {marketView === "official" && (
            <div className="space-y-4">
              {marketActivity.official.map((row) => (
                <a
                  key={row.id}
                  href={row.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block p-4 rounded-lg border transition-all hover:shadow-md hover:border-blue-300 cursor-pointer ${
                    theme === "dark" ? "border-gray-600 hover:border-blue-500" : "border-gray-200"
                  }`}
                >
                  <div className="flex space-x-4 items-start">
                    <div className="flex-shrink-0">
                      <img
                        src={row.logo || "/placeholder.svg"}
                        alt={`${row.site} logo`}
                        width={40}
                        height={40}
                        className="w-10 h-10 object-contain rounded-md"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className={`font-medium ${getTextClasses()}`}>{row.site}</div>
                          <div className={`text-base font-bold ${getTextClasses()} mt-1`}>{row.price}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs ${getSecondaryTextClasses()}`}>{row.updated}</span>
                          <ExternalLink className="h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}

    {/* 판매자: 카드 레이아웃 */}
    {marketView === "seller" && (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {marketActivity.selling.map((item) => (
          <Link
             key={item.id}
             to={`/post/${item.id}`}
              className={`${getCardClasses()} rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer`}
          >
            <div className="relative">
              <img src={item.thumbnail || "/placeholder.svg"} alt="Product thumbnail" className="w-full h-64 object-cover" />
              <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
                <Heart className="h-4 w-4 text-gray-600" />
              </button>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm font-medium ${getSecondaryTextClasses()}`}>{item.user}</span>
                <div className="flex items-center">
                  <span className={`text-sm ${getSecondaryTextClasses()} ml-1`}>{item.timePosted}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-lg font-bold ${getTextClasses()}`}>{item.price}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  item.condition === "New"
                    ? "bg-green-100 text-green-800"
                    : item.condition === "Any"
                      ? "bg-gray-100 text-gray-800"
                      : "bg-yellow-100 text-yellow-800"
                }`}>
                  {item.condition}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    )}

          {/* 구매자: 그리드 레이아웃 */}
          {marketView === "buyer" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {marketActivity.buying.map((item) => (
                <Link
                  key={item.id}
                  to={`/post/${item.id}`}
                  className={`${getCardClasses()} rounded-lg p-4 flex flex-col justify-between hover:shadow-lg transition-shadow cursor-pointer`}
                >
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className={`font-medium ${getTextClasses()}`}>{item.user}</span>
                      <span className={`text-xs ${getSecondaryTextClasses()}`}>{item.timePosted}</span>
                    </div>
                    <p className={`text-sm ${getSecondaryTextClasses()} mb-3 line-clamp-3`}>{item.description}</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mt-4">
                      <span className={`text-lg font-bold ${getTextClasses()}`}>{item.maxBudget}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        item.condition === "New only"
                          ? "bg-blue-100 text-blue-800"
                          : item.condition === "Any"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {item.condition}
                      </span>
                    </div>
                    <span className={`text-xs ${getSecondaryTextClasses()} mt-2 block`}>📍 {item.location}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* 가격 변동 그래프 */}
        <div className={`${getCardClasses()} rounded-lg p-6 mb-8`}>
          <div className="flex items-center space-x-2 mb-6">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <h3 className={`text-xl font-semibold ${getTextClasses()}`}>Recent Transaction Prices</h3>
          </div>

          <div className="relative h-64">
            <svg className="w-full h-full" viewBox="0 0 800 200">
              {/* 그리드 라인 */}
              <defs>
                <pattern id="grid" width="80" height="40" patternUnits="userSpaceOnUse">
                  <path
                    d="M 80 0 L 0 0 0 40"
                    fill="none"
                    stroke={theme === "dark" ? "#374151" : "#e5e7eb"}
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* 가격 라인 */}
              <polyline
                fill="none"
                stroke="#3b82f6"
                strokeWidth="3"
                points={priceHistory
                  .map((point, index) => {
                    const x = (index / (priceHistory.length - 1)) * 760 + 20
                    const y = 180 - ((point.price - 250) / (400 - 250)) * 160
                    return `${x},${y}`
                  })
                  .join(" ")}
              />

              {/* 데이터 포인트 */}
              {priceHistory.map((point, index) => {
                const x = (index / (priceHistory.length - 1)) * 760 + 20
                const y = 180 - ((point.price - 250) / (400 - 250)) * 160
                return <circle key={index} cx={x} cy={y} r="4" fill="#3b82f6" className="hover:r-6 transition-all cursor-pointer" />
              })}

              {/* X축 레이블 */}
              {priceHistory.map((point, index) => {
                const x = (index / (priceHistory.length - 1)) * 760 + 20
                return (
                  <text
                    key={index}
                    x={x}
                    y="195"
                    textAnchor="middle"
                    className={`text-xs ${theme === "dark" ? "fill-gray-300" : "fill-gray-600"}`}
                  >
                    {point.date}
                  </text>
                )
              })}
            </svg>

            {/* Y축 레이블 */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs py-2">
              <span className={getSecondaryTextClasses()}>$400</span>
              <span className={getSecondaryTextClasses()}>$350</span>
              <span className={getSecondaryTextClasses()}>$300</span>
              <span className={getSecondaryTextClasses()}>$250</span>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className={`text-sm ${getSecondaryTextClasses()}`}>
              Average price over the last 12 months: <span className={`font-semibold ${getTextClasses()}`}>$335</span>
            </p>
          </div>
        </div>

        {/* 유사 상품 */}
        <div className={`${getCardClasses()} rounded-lg p-6`}>
          <h3 className={`text-xl font-semibold ${getTextClasses()} mb-6`}>Similar Items</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {similarProducts.map((item) => (
              <div key={item.id} className="group cursor-pointer">
                <div className="relative mb-3">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={200}
                    height={200}
                    className="w-full h-32 sm:h-40 object-cover rounded-lg group-hover:scale-105 transition-transform"
                  />
                  <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:bg-gray-50">
                    <Heart className="h-3 w-3 text-gray-600" />
                  </button>
                </div>
                <h4 className={`font-medium ${getTextClasses()} text-sm mb-1 line-clamp-2`}>{item.name}</h4>
                <div className="flex items-center space-x-1">
                  <Heart className="h-3 w-3 text-red-500 fill-current" />
                  <span className={`text-xs ${getSecondaryTextClasses()}`}>{item.hearts}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}