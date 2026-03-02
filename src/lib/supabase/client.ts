import { createClient } from '@supabase/supabase-js'

let supabaseInstance: ReturnType<typeof createClient> | null = null

export function getSupabase() {
  if (!supabaseInstance) {
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('SUPABASE_URL and SUPABASE_ANON_KEY must be defined')
    }

    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey)
  }

  return supabaseInstance
}
