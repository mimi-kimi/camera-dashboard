import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  console.log('=== API: Fetching snapshots ===')
  
  try {
    // Test the connection first
    console.log('Checking Supabase connection...')
    
    const { data, error } = await supabase
      .from('camera_snapshots')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(50)

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: error.message || 'Database error' },
        { status: 500 }
      )
    }

    console.log(`Found ${data?.length || 0} snapshots`)
    return NextResponse.json(data || [])
    
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    )
  }
}