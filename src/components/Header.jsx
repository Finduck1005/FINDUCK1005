import { Link } from "react-router-dom";

export default function Header({
  isLoggedIn,
  userInfo,
  handleLogin,
  handleLogout,
  getTextClasses,
  getSecondaryTextClasses,
}) {
  const nickname = userInfo?.nickname ?? "사용자";

  return (
    <header className="w-full py-6 px-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center relative">
        {/* 로고 */}
        <Link to="/" className={`text-2xl font-bold ${getTextClasses()}`}>
          FINDUCK
        </Link>

        {/* 중앙 nav */}
        <nav className="absolute left-1/2 transform -translate-x-1/2 hidden md:grid grid-cols-3 w-[360px]">
          <div className="text-left">
            <Link
              to="/"
              className={`text-lg font-medium px-3 py-2 rounded-md transition-colors duration-200 
                ${getSecondaryTextClasses()} hover:${getTextClasses()} hover:bg-slate-200 dark:hover:bg-gray-700`}
            >
              카테고리
            </Link>
          </div>
          <div className="text-center">
            <Link
              to="/my"
              className={`text-lg font-medium px-3 py-2 rounded-md transition-colors duration-200 
                ${getSecondaryTextClasses()} hover:${getTextClasses()} hover:bg-slate-200 dark:hover:bg-gray-700`}
            >
              마이페이지
            </Link>
          </div>
          <div className="text-right">
            <Link
              to="/wishlist"
              className={`text-lg font-medium px-3 py-2 rounded-md transition-colors duration-200 
                ${getSecondaryTextClasses()} hover:${getTextClasses()} hover:bg-slate-200 dark:hover:bg-gray-700`}
            >
              찜 목록
            </Link>
          </div>
        </nav>

        {/* 우측: 로그인/로그아웃 */}
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-3 max-w-[200px]">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  nickname
                )}&background=0D8ABC&color=fff`}
                alt="프로필"
                className="w-8 h-8 rounded-full shrink-0"
              />
              <span className="text-sm font-medium text-gray-800 truncate max-w-[100px]">
                {nickname}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm text-slate-500 hover:text-slate-800"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-yellow-300 text-black px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors text-sm font-semibold"
            >
              카카오 로그인
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
