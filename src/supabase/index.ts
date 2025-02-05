import { Database } from '@/database.types'
import { createClient } from '@supabase/supabase-js'

console.log(import.meta.env)
const PROJECT_URL = import.meta.env.VITE_SUPABASE_PROJECT_URL
const API_KEY = import.meta.env.VITE_SUPABASE_API_KEY
console.log(import.meta.env)

const options = {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  global: {
    headers: { 'x-my-custom-header': 'my-app-name' },
  },
}
export const supabase = createClient<Database>(PROJECT_URL, API_KEY, options)
