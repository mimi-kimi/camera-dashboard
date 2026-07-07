import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.https://qqhpjmolxkxgdgjavwpb.supabase.co/rest/v1/
const supabaseKey = process.env.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxaHBqbW9seGt4Z2RnamF2d3BiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMzODIwODAsImV4cCI6MjA5ODk1ODA4MH0.akSVJsD7uIusk_wAqhu27RbaCfLXlQ5IHF7G3SMBUmQ

// Debug: Log the values (remove this after testing)
console.log('Supabase URL:', supabaseUrl)
console.log('Supabase Key exists:', !!supabaseKey)

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables!')
}

export const supabase = createClient(supabaseUrl, supabaseKey)