import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.https://qqhpjmolxkxgdgjavwpb.supabase.co/rest/v1/camera_snapshots
const supabaseKey = process.env.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxaHBqbW9seGt4Z2RnamF2d3BiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzM4MjA4MCwiZXhwIjoyMDk4OTU4MDgwfQ.K-Ki2puUUptfeJV93j97DGJkSwklNcJERVEqTspbcpU

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey)