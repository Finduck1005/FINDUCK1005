// Supabase에 연결할 클라이언트를 생성하기 위해 import
// supabase와 연결, 엔드포인트, 공개api키 이용, 추후 보안위해 변경 가능
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY,
  {
    auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: 'sb-finduck-auth',
  },
  }
);
