// Supabase에 연결할 클라이언트를 생성하기 위해 import
// supabase와 연결, 엔드포인트, 공개api키 이용, 추후 보안위해 변경 가능
// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const url  = import.meta.env.VITE_SUPABASE_URL
const anon = import.meta.env.VITE_SUPABASE_KEY

if (!url)  throw new Error('VITE_SUPABASE_URL is missing')
if (!anon) throw new Error('VITE_SUPABASE_ANON_KEY is missing')

export const supabase = createClient(url, anon)
