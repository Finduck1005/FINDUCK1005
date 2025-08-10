// src/components/Layout.jsx
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import Header from "./Header";

export default function Layout() {
  // ✅ 테마 전역 상태
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") ?? "normal"
  );
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  // ✅ 로그인 상태
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({ nickname: "게스트" });

  // ✅ 로그인 핸들러 (Header에서 쓰던 로직 그대로 옮김)
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) console.error("로그인 실패:", error.message);
  };

  // ✅ 로그아웃 핸들러 (Header에서 쓰던 로직 그대로 옮김)
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("로그아웃 실패:", error.message);
  };

  // ✅ 세션 불러오기 + 상태 변경
  useEffect(() => {
    let mounted = true;

    (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (mounted) updateSession(session);
    })();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      updateSession(session);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const updateSession = (session) => {
    const meta = session?.user?.user_metadata || {};
    setIsLoggedIn(!!session);
    setUserInfo(
      !!session
        ? { nickname: meta.nickname || meta.name || "사용자" }
        : { nickname: "게스트" }
    );
  };

  // ✅ 글자 색상 유틸
  const getTextClasses = () =>
    theme === "dark" ? "text-white" : "text-slate-900";
  const getSecondaryTextClasses = () =>
    theme === "dark" ? "text-slate-300" : "text-slate-600";

  const location = useLocation();
  const hideRoutes = ["/login", "/signup", "/auth/callback"];
  const hideHeader = hideRoutes.includes(location.pathname);

  return (
    <div
      className={`min-h-screen flex flex-col ${
        theme === "dark" ? "bg-gray-900" : "bg-white"
      }`}
    >
      {!hideHeader && (
        <Header
          isLoggedIn={isLoggedIn}
          userInfo={userInfo}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
          getTextClasses={getTextClasses}
          getSecondaryTextClasses={getSecondaryTextClasses}
        />
      )}

      <main className="flex-1">
        <Outlet context={{ theme, setTheme }} />{" "}
        {/* ✅ 페이지에 테마 상태 전달 */}
      </main>
    </div>
  );
}
