import React from 'react';
import { Download } from 'lucide-react';

function Detection() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Detection</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Download className="w-5 h-5" />
          Download Report
        </button>
      </div>

      <div className="bg-secondary p-6 rounded-lg mb-8">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Detection Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-tertiary p-4 rounded-lg">
                <p className="text-3xl font-bold text-white">3</p>
                <p className="text-gray-400">Total Potholes</p>
              </div>
              <div className="bg-tertiary p-4 rounded-lg">
                <p className="text-3xl font-bold text-white">92%</p>
                <p className="text-gray-400">Accuracy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-secondary p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-white mb-4">Recent Detections</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-tertiary rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div>
                <p className="text-white font-medium">High Severity</p>
                <p className="text-gray-400">Confidence: 92.0%</p>
              </div>
            </div>
            <p className="text-gray-400">00:15</p>
          </div>
          <div className="flex items-center justify-between p-4 bg-tertiary rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div>
                <p className="text-white font-medium">Medium Severity</p>
                <p className="text-gray-400">Confidence: 85.0%</p>
              </div>
            </div>
            <p className="text-gray-400">00:32</p>
          </div>
          <div className="flex items-center justify-between p-4 bg-tertiary rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div>
                <p className="text-white font-medium">Low Severity</p>
                <p className="text-gray-400">Confidence: 78.0%</p>
              </div>
            </div>
            <p className="text-gray-400">00:45</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detection