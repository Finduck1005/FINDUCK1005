// homepage 코드
import { useState, useEffect } from "react";
import { Moon, Sun, Monitor, Search } from "lucide-react";
// 미리 만들어 놓은 supabaseClient.js의 supabase 이용
import { supabase } from "../lib/supabaseClient";
// 라우터를 위한 패키지
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

export default function Component() {
  const navigate = useNavigate();
  // 테마 상태 Layout값 저장 (normal, dark, desk)
  const { theme, setTheme } = useOutletContext();
  // 로그인 상태 저장 (true, false), 기본 로그인 true 상태
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  // 사용자 닉네임 저장
  const [userInfo, setUserInfo] = useState({ nickname: "" });

  // 로그인 관리 함수, 로그인 하고 auth/callback으로 리다이렉션,
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        redirectTo: "http://localhost:5173/auth/callback",
      },
    });

    if (error) {
      console.error("로그인 실패:", error.message);
    } else {
      console.log("로그인 요청 완료 (리다이렉션 중)");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    navigate("/");
  };

  // 로컬 테마 설정 불러오기, 한번만
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (["normal", "dark", "desk"].includes(savedTheme)) {
      setTheme(savedTheme);
    }
  }, []);

  {
    /* 로그인 설정 불러오기, 한번만 실행
    닉네임이 저장되어 있는경우, 로그인 설정 true 및 저장된 닉네임 가져옴*/
  }
  useEffect(() => {
    const storedNickname = localStorage.getItem("nickname");
    if (storedNickname) {
      setIsLoggedIn(true);
      setUserInfo({ nickname: storedNickname });
    }
  }, []);

  // theme 값이 바뀔때마다 local 저장 theme 값을 바꾸는 code
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  // 테마에 따른 전체 style
  const getThemeClasses = () => {
    switch (theme) {
      case "dark":
        return "bg-gray-900 text-white";
      case "desk":
        return "bg-blue-50 text-gray-900";
      default:
        return "bg-gradient-to-br from-slate-50 to-slate-100 text-gray-900";
    }
  };

  // 테마에 따른 카드 style
  const getCardClasses = () => {
    switch (theme) {
      case "dark":
        return "bg-gray-800 border-gray-700";
      case "desk":
        return "bg-white border-blue-200 shadow-lg";
      default:
        return "bg-white border-slate-100";
    }
  };

  // 테마에 따른 글자 style
  const getTextClasses = () => {
    switch (theme) {
      case "dark":
        return "text-gray-100";
      case "desk":
        return "text-gray-800";
      default:
        return "text-slate-800";
    }
  };

  // 테마에 따른 서브 글자 style
  const getSecondaryTextClasses = () => {
    switch (theme) {
      case "dark":
        return "text-gray-300";
      case "desk":
        return "text-gray-600";
      default:
        return "text-slate-600";
    }
  };

  // 인기 상품 정보, name, logo 하드 코딩, 추후 수정 필요함
  const popularBrands = [
    { name: "Apple", logo: "/placeholder.svg?height=80&width=120" },
    { name: "Samsung", logo: "/placeholder.svg?height=80&width=120" },
    { name: "Nike", logo: "/placeholder.svg?height=80&width=120" },
    { name: "Adidas", logo: "/placeholder.svg?height=80&width=120" },
    { name: "Sony", logo: "/placeholder.svg?height=80&width=120" },
    { name: "Microsoft", logo: "/placeholder.svg?height=80&width=120" },
    { name: "Google", logo: "/placeholder.svg?height=80&width=120" },
    { name: "Amazon", logo: "/placeholder.svg?height=80&width=120" },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${getThemeClasses()}`}
    >
      {/* Main Content */}
      <main className="flex-1 px-4">
        <div className="max-w-4xl mx-auto text-center pt-16 pb-20">
          {/* Hero Section */}
          <div className="mb-12">
            <h1
              className={`text-5xl md:text-6xl font-bold ${getTextClasses()} mb-6`}
            >
              당신이 원하는 모든
              <span className="block text-blue-600">제품을 찾아보세요</span>
            </h1>
            <p
              className={`text-xl ${getSecondaryTextClasses()} mb-12 max-w-2xl mx-auto`}
            >
              신뢰할 수 있는 브랜드의 수백만 가지 제품을 찾아보세요. 검색하고,
              비교하고, 자신 있게 쇼핑하세요.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-20">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-6 w-6" />
              <input
                type="text"
                placeholder="제품, 브랜드 또는 카테고리를 검색하세요..."
                className={`w-full pl-12 pr-6 py-4 text-lg border-2 rounded-2xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all shadow-lg ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                    : theme === "desk"
                    ? "bg-white border-blue-200 text-gray-900 placeholder-gray-500"
                    : "bg-white border-slate-200 text-gray-900 placeholder-gray-500"
                }`}
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-8 py-2 rounded-xl hover:bg-blue-700 transition-colors font-medium">
                Search
              </button>
            </div>
          </div>

          {/* Popular Brands Section */}
          <div className="mb-16">
            <h2 className={`text-3xl font-bold ${getTextClasses()} mb-8`}>
              인기 상품
            </h2>
            <p className={`${getSecondaryTextClasses()} mb-12`}>
              관심 브랜드 상품들
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8">
              {popularBrands.map((brand, index) => (
                <div
                  key={index}
                  className={`group rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border hover:border-blue-200 ${getCardClasses()}`}
                >
                  <div className="flex items-center justify-center h-20 mb-4">
                    <img
                      src={brand.logo || "/placeholder.svg"}
                      alt={`${brand.name} logo`}
                      width={120}
                      height={80}
                      className="max-h-16 w-auto object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3
                    className={`${getSecondaryTextClasses()} font-medium group-hover:text-blue-600 transition-colors`}
                  >
                    {brand.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div
            className={`rounded-3xl p-8 shadow-lg border ${getCardClasses()}`}
          >
            <h3 className={`text-2xl font-bold ${getTextClasses()} mb-4`}>
              쇼핑을 시작할 준비가 되셨나요?
            </h3>
            <p className={`${getSecondaryTextClasses()} mb-6`}>
              전 세계 수백만 명의 만족스러운 고객과 함께하세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium">
                Browse Categories
              </button>
              <button
                className={`border-2 px-8 py-3 rounded-xl transition-colors font-medium ${
                  theme === "dark"
                    ? "border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-gray-800"
                    : "border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-50"
                }`}
              >
                View Deals
              </button>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer
        className={`py-12 px-4 mt-20 ${
          theme === "dark"
            ? "bg-gray-800 text-white"
            : theme === "desk"
            ? "bg-blue-900 text-white"
            : "bg-slate-800 text-white"
        }`}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-xl font-bold mb-4">FINDUCK</h4>
            <p className="text-slate-300">모든 덕질, 여기서 찾아라</p>
          </div>
          <div>
            <h5 className="font-semibold mb-4">Shop</h5>
            <ul className="space-y-2 text-slate-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Electronics
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Fashion
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Home & Garden
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Sports
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-4">Support</h5>
            <ul className="space-y-2 text-slate-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-4">Company</h5>
            <ul className="space-y-2 text-slate-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-slate-700 flex items-center justify-between text-slate-300">
          {/* 왼쪽: 텍스트 */}
          <p className="text-sm">&copy; 2025 FINDUCK. All rights reserved.</p>

          {/* 오른쪽: Theme Switcher */}
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setTheme("normal")}
              className={`p-2 rounded-md ${
                theme === "normal"
                  ? "bg-white shadow-sm text-blue-600"
                  : "text-gray-600"
              }`}
            >
              <Sun className="h-4 w-4" />
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={`p-2 rounded-md ${
                theme === "dark"
                  ? "bg-gray-600 shadow-sm text-yellow-400"
                  : "text-gray-600"
              }`}
            >
              <Moon className="h-4 w-4" />
            </button>
            <button
              onClick={() => setTheme("desk")}
              className={`p-2 rounded-md ${
                theme === "desk"
                  ? "bg-blue-100 shadow-sm text-blue-600"
                  : "text-gray-600"
              }`}
            >
              <Monitor className="h-4 w-4" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
