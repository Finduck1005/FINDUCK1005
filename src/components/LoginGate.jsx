import { useCallback } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function LoginGate({ message = "로그인이 필요한 기능입니다." }) {
  const location = useLocation();
  const redirectPath = location.pathname + location.search; // 로그인 후 돌아올 경로

  const handleKakaoLogin = useCallback(async () => {
    // 로그인 후 돌아갈 경로를 localStorage에 저장
    localStorage.setItem("postLoginRedirect", redirectPath);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      console.error("카카오 로그인 실패:", error.message);
      alert("로그인에 실패했어요. 잠시 후 다시 시도해주세요.");
    }
  }, [redirectPath]);

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4 text-center">
      <p className="text-lg font-medium">{message}</p>
      <button
        onClick={handleKakaoLogin}
        className="px-4 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 transition-colors text-black font-semibold"
      >
        카카오로 로그인
      </button>
      <p className="text-sm text-gray-500">로그인 후 자동으로 이전 페이지로 돌아갑니다.</p>
    </div>
  );
}
