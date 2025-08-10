// src/components/ProtectedRoute.jsx
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import LoginGate from "./LoginGate";

export default function ProtectedRoute() {
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    let mounted = true;

    // 최초 세션 로드
    (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!mounted) return;
      setAuthed(!!session);
      setLoading(false);
    })();

    // 이후 변화 구독 (로그인/로그아웃/토큰갱신 등)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      setAuthed(!!session);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  if (loading) return <div>확인 중...</div>;
  return authed ? <Outlet /> : <LoginGate />;
}
