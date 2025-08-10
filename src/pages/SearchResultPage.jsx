import { useState, useEffect } from "react";
import {
  Search,
  ChevronDown,
  Grid3X3,
  List,
  Heart,
  Moon,
  Sun,
  Monitor,
  SlidersHorizontal,
  X,
} from "lucide-react";

function SearchResultPage() {
  // --- STATE MANAGEMENT ---
  // 현재 적용된 테마 (normal, dark, desk)
  const [theme, setTheme] = useState("normal");
  // 상품 목록의 보기 모드 (grid, list)
  const [viewMode, setViewMode] = useState("grid");
  // 정렬 기준 (popular, price-low, etc.)
  const [sortBy, setSortBy] = useState("popular");
  // 필터 사이드바 표시 여부
  const [showFilters, setShowFilters] = useState(false);
  // 사용자가 선택한 필터 값들
  const [selectedFilters, setSelectedFilters] = useState({
    brand: [],
    size: [],
    priceRange: "",
    condition: "",
  });

  // --- SIDE EFFECTS ---
  // 컴포넌트가 처음 렌더링될 때 localStorage에서 저장된 테마를 불러옵니다.
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "normal";
    setTheme(savedTheme);
  }, []);

  // --- EVENT HANDLERS ---
  // 브랜드 필터 변경 핸들러
  const handleBrandChange = (brand) => {
    setSelectedFilters((prevFilters) => {
      // 이미 선택된 브랜드이면 배열에서 제거, 아니면 추가
      const newBrands = prevFilters.brand.includes(brand)
        ? prevFilters.brand.filter((b) => b !== brand)
        : [...prevFilters.brand, brand];
      return { ...prevFilters, brand: newBrands };
    });
  };

  // 사이즈 필터 변경 핸들러
  const handleSizeChange = (size) => {
    setSelectedFilters((prevFilters) => {
      // 이미 선택된 사이즈이면 배열에서 제거, 아니면 추가
      const newSizes = prevFilters.size.includes(size)
        ? prevFilters.size.filter((s) => s !== size)
        : [...prevFilters.size, size];
      return { ...prevFilters, size: newSizes };
    });
  };

  // 가격 범위 필터 변경 핸들러
  const handlePriceRangeChange = (range) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      // 이미 선택된 가격 범위이면 선택 해제, 아니면 새로 선택
      priceRange: prevFilters.priceRange === range ? "" : range,
    }));
  };

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

  // --- MOCK DATA ---
  // 실제 애플리케이션에서는 API를 통해 받아올 상품 데이터입니다.
  const searchResults = [
    {
      id: 1,
      name: "Nike Air Jordan 1 Retro High OG",
      brand: "Nike",
      image: "/placeholder.svg?height=300&width=300",
      hearts: 1247,
      price: "$385",
      sizes: ["US 8", "US 9", "US 10", "US 11"],
      condition: "New",
    },
    {
      id: 2,
      name: "Adidas Yeezy Boost 350 V2",
      brand: "Adidas",
      image: "/placeholder.svg?height=300&width=300",
      hearts: 892,
      price: "$420",
      sizes: ["US 8.5", "US 9", "US 10", "US 11"],
      condition: "New",
    },
    {
      id: 3,
      name: "Nike Dunk Low Retro",
      brand: "Nike",
      image: "/placeholder.svg?height=300&width=300",
      hearts: 634,
      price: "$180",
      sizes: ["US 7", "US 8", "US 9", "US 10"],
      condition: "New",
    },
    {
      id: 4,
      name: "Off-White x Nike Air Force 1",
      brand: "Nike",
      image: "/placeholder.svg?height=300&width=300",
      hearts: 456,
      price: "$850",
      sizes: ["US 9", "US 10", "US 11"],
      condition: "New",
    },
    {
      id: 5,
      name: "Converse Chuck Taylor All Star",
      brand: "Converse",
      image: "/placeholder.svg?height=300&width=300",
      hearts: 2341,
      price: "$65",
      sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
      condition: "New",
    },
    {
      id: 6,
      name: "New Balance 550",
      brand: "New Balance",
      image: "/placeholder.svg?height=300&width=300",
      hearts: 789,
      price: "$120",
      sizes: ["US 8", "US 9", "US 10"],
      condition: "New",
    },
  ];

  // 필터링 옵션으로 사용될 데이터
  const brands = [
    "Nike",
    "Adidas",
    "Converse",
    "New Balance",
    "Jordan",
    "Vans",
  ];
  const sizes = [
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
  ];
  const priceRanges = [
    "Under $100",
    "$100 - $200",
    "$200 - $500",
    "$500 - $1000",
    "Over $1000",
  ];

  // --- FILTERING LOGIC ---
  // 선택된 필터(selectedFilters)를 기반으로 상품 목록(searchResults)을 필터링합니다.
  const filteredResults = searchResults.filter((product) => {
    const { brand, size, priceRange } = selectedFilters;

    // 브랜드 필터: 선택된 브랜드가 없거나, 상품의 브랜드가 선택된 브랜드 목록에 포함되어야 함
    if (brand.length > 0 && !brand.includes(product.brand)) {
      return false;
    }

    // 사이즈 필터: 선택된 사이즈가 없거나, 상품의 사이즈 중 하나라도 선택된 사이즈 목록에 포함되어야 함
    if (size.length > 0 && !product.sizes.some((s) => size.includes(s))) {
      return false;
    }

    // 가격 범위 필터
    if (priceRange) {
      const price = parseInt(product.price.replace("$", ""));
      switch (priceRange) {
        case "Under $100":
          if (price >= 100) return false;
          break;
        case "$100 - $200":
          if (price < 100 || price > 200) return false;
          break;
        case "$200 - $500":
          if (price < 200 || price > 500) return false;
          break;
        case "$500 - $1000":
          if (price < 500 || price > 1000) return false;
          break;
        case "Over $1000":
          if (price <= 1000) return false;
          break;
        default:
          break;
      }
    }

    // 모든 필터 조건을 통과한 경우에만 true를 반환
    return true;
  });

  // --- COMPONENT RENDER ---
  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${getThemeClasses()}`}
    >
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* === SEARCH BAR === */}
        <div className="mb-6">
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search for sneakers, brands, or styles..."
              defaultValue="Nike Air Jordan"
              className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                theme === "dark"
                  ? "bg-gray-800 border-gray-600 text-white"
                  : "bg-white border-gray-300"
              }`}
            />
          </div>
        </div>

        {/* === RESULTS HEADER === */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className={`text-2xl font-bold ${getTextClasses()} mb-1`}>
              Search Results
            </h1>
            <p className={`${getSecondaryTextClasses()}`}>
              {filteredResults.length} results for "Nike Air Jordan"
            </p>
          </div>

          <div className="flex items-center space-x-4">
            {/* View Toggle */}
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "grid"
                    ? "bg-white dark:bg-gray-600 shadow-sm"
                    : ""
                }`}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "list"
                    ? "bg-white dark:bg-gray-600 shadow-sm"
                    : ""
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`appearance-none pr-8 pl-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-600 text-white"
                    : "bg-white border-gray-300"
                }`}
              >
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
                <option value="rating">Highest Rated</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none" />
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                theme === "dark" ? "border-gray-600" : "border-gray-300"
              }`}
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        <div className="flex gap-6">
          {/* === FILTERS SIDEBAR === */}
          {showFilters && (
            <aside className={`w-64 ${getCardClasses()} rounded-lg p-6 h-fit`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`font-semibold ${getTextClasses()}`}>Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="sm:hidden"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Brand Filter */}
              <div className="mb-6">
                <h4 className={`font-medium ${getTextClasses()} mb-3`}>
                  Brand
                </h4>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <label key={brand} className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={selectedFilters.brand.includes(brand)}
                        onChange={() => handleBrandChange(brand)}
                      />
                      <span
                        className={`ml-2 text-sm ${getSecondaryTextClasses()}`}
                      >
                        {brand}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Size Filter */}
              <div className="mb-6">
                <h4 className={`font-medium ${getTextClasses()} mb-3`}>Size</h4>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => handleSizeChange(size)}
                      className={`px-2 py-1 text-xs border rounded hover:bg-gray-50 dark:hover:bg-gray-700 ${
                        selectedFilters.size.includes(size)
                          ? "bg-blue-500 text-white border-blue-500"
                          : theme === "dark"
                          ? "border-gray-600"
                          : "border-gray-300"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h4 className={`font-medium ${getTextClasses()} mb-3`}>
                  Price Range
                </h4>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <label key={range} className="flex items-center">
                      <input
                        type="radio"
                        name="priceRange"
                        className="text-blue-600 focus:ring-blue-500"
                        checked={selectedFilters.priceRange === range}
                        onChange={() => handlePriceRangeChange(range)}
                      />
                      <span
                        className={`ml-2 text-sm ${getSecondaryTextClasses()}`}
                      >
                        {range}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </aside>
          )}

          {/* === PRODUCTS GRID === */}
          <div className="flex-1">
            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1"
              }`}
            >
              {filteredResults.map((product) => (
                <div
                  key={product.id}
                  className={`${getCardClasses()} rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer`}
                >
                  <div className="relative">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-64 object-cover"
                    />
                    <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
                      <Heart className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-sm font-medium ${getSecondaryTextClasses()}`}
                      >
                        {product.brand}
                      </span>
                      <div className="flex items-center">
                        <Heart className="h-4 w-4 text-red-500 fill-current" />
                        <span
                          className={`text-sm ${getSecondaryTextClasses()} ml-1`}
                        >
                          {product.hearts}
                        </span>
                      </div>
                    </div>
                    <h3
                      className={`font-semibold ${getTextClasses()} mb-3 line-clamp-2`}
                    >
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className={`text-lg font-bold ${getTextClasses()}`}>
                        {product.price}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-8">
              <button
                className={`px-8 py-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                  theme === "dark" ? "border-gray-600" : "border-gray-300"
                }`}
              >
                Load More Results
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SearchResultPage;
