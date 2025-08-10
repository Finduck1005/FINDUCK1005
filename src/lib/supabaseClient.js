// src/lib/supabaseClient.js (경로는 네가 쓰는 곳과 일치하게)
import { createClient } from '@supabase/supabase-js'

const url  = import.meta.env.VITE_SUPABASE_URL
const anon = import.meta.env.VITE_SUPABASE_KEY

// 디버그(배포본에서도 true/false만 찍힘)
console.log('[SB]', 'URL?', !!url, 'KEY?', !!anon)

if (!url)  throw new Error('VITE_SUPABASE_URL is missing')
if (!anon) throw new Error('VITE_SUPABASE_KEY is missing')

export const supabase = createClient(url, anon)
