import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function Dashboard() {
  const [snapshots, setSnapshots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSnapshots();
    
    // Real-time updates from Supabase
    const subscription = supabase
      .channel('camera_snapshots')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'camera_snapshots' },
        (payload) => {
          setSnapshots(prev => [payload.new, ...prev]);
        }
      )
      .subscribe();

    return () => subscription.unsubscribe();
  }, []);

  const fetchSnapshots = async () => {
    try {
      const response = await fetch('/api/snapshots');
      const data = await response.json();
      setSnapshots(data);
    } catch (error) {
      console.error('Error fetching snapshots:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Flood Camera Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {snapshots.map((snapshot) => (
          <div key={snapshot.id} className="border rounded-lg overflow-hidden shadow-lg">
            <img 
              src={`data:image/jpeg;base64,${snapshot.image_data}`}
              alt={`Snapshot ${snapshot.id}`}
              className="w-full h-auto"
            />
            <div className="p-4">
              <p className="text-sm text-gray-600">
                {new Date(snapshot.timestamp).toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">
                Camera: {snapshot.camera_id}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {loading && (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl">Loading snapshots...</p>
        </div>
      )}
    </div>
  );
}