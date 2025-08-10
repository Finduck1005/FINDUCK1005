import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import LoginGate from "./LoginGate";

export default function ProtectedRoute() {
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        console.log("세션 값:", session);
        if (cancelled) return;
        setAuthed(!!session);
      } catch (e) {
        console.error(e);
        if (!cancelled) setAuthed(false);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  if (loading) return <div>확인 중...</div>;
  return authed ? <Outlet /> : <LoginGate />;
}
