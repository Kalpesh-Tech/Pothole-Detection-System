import React from 'react';
import { AlertTriangle, Clock, MapPin } from 'lucide-react';

function Dashboard() {
  const analysisHistory = [
    {
      id: 1,
      name: 'Morning_Route_001.mp4',
      date: '2024-03-15',
      location: 'Main Street',
      potholes: 12,
      duration: '15:30',
      severity: 'high'
    },
    {
      id: 2,
      name: 'Evening_Drive_002.mp4',
      date: '2024-03-14',
      location: 'Highway 101',
      potholes: 8,
      duration: '22:45',
      severity: 'medium'
    },
    {
      id: 3,
      name: 'City_Center_003.mp4',
      date: '2024-03-13',
      location: 'Downtown',
      potholes: 5,
      duration: '10:15',
      severity: 'low'
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Analysis History</h1>
        <div className="flex gap-4">
          <button className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
            Filter
          </button>
          <button className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
            Export All
          </button>
        </div>
      </div>

      <div className="bg-secondary rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 gap-4 p-4">
          {analysisHistory.map((analysis) => (
            <div
              key={analysis.id}
              className="bg-tertiary p-4 rounded-lg flex flex-col md:flex-row md:items-center justify-between"
            >
              <div className="flex items-start gap-4 mb-4 md:mb-0">
                <AlertTriangle className={`w-5 h-5 ${getSeverityColor(analysis.severity)}`} />
                <div>
                  <h3 className="text-white font-medium">{analysis.name}</h3>
                  <div className="flex items-center gap-2 text-gray-400 mt-1">
                    <Clock className="w-4 h-4" />
                    <span>{analysis.date}</span>
                    <MapPin className="w-4 h-4 ml-2" />
                    <span>{analysis.location}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{analysis.potholes}</p>
                  <p className="text-gray-400">Potholes</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{analysis.duration}</p>
                  <p className="text-gray-400">Duration</p>
                </div>
                <div className="flex gap-2">
                  <button className="text-gray-400 hover:text-white transition-colors">View</button>
                  <button className="text-gray-400 hover:text-white transition-colors">Reanalyze</button>
                  <button className="text-red-400 hover:text-red-300 transition-colors">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard