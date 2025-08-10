import { createClient } from '@supabase/supabase-js'

const url  = import.meta.env.VITE_SUPABASE_URL
const anon = import.meta.env.VITE_SUPABASE_KEY

console.log('[SB]', 'URL?', !!url, 'KEY?', !!anon)

if (!url)  throw new Error('VITE_SUPABASE_URL is missing')
if (!anon) throw new Error('VITE_SUPABASE_KEY is missing')

export const supabase = createClient(url, anon)
