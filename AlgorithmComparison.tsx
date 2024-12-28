import React from 'react';
import { SchedulingResult } from '../types';
import { compareAlgorithms } from '../utils/algorithmComparison';

interface AlgorithmComparisonProps {
  results: SchedulingResult[];
}

const AlgorithmComparison: React.FC<AlgorithmComparisonProps> = ({ results }) => {
  const { bestAlgorithm, comparison } = compareAlgorithms(results);

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-6">
      <h3 className="text-2xl font-semibold mb-4">Algorithm Comparison</h3>
      
      <div className="overflow-x-auto mb-6">
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Algorithm</th>
              <th className="px-4 py-2">Average Waiting Time</th>
              <th className="px-4 py-2">Average Turnaround Time</th>
              <th className="px-4 py-2">Average Response Time</th>
            </tr>
          </thead>
          <tbody>
            {comparison.map((algo) => (
              <tr key={algo.name} className={algo.name === bestAlgorithm ? 'bg-green-100' : ''}>
                <td className="px-4 py-2">{algo.name}</td>
                <td className="px-4 py-2 text-center">{algo.waitingTime}</td>
                <td className="px-4 py-2 text-center">{algo.turnaroundTime}</td>
                <td className="px-4 py-2 text-center">{algo.responseTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-blue-100 p-4 rounded-lg">
        <p className="font-medium">
          Best Algorithm: <span className="text-blue-700">{bestAlgorithm}</span>
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Based on the lowest average waiting time
        </p>
      </div>
    </div>
  );
};

export default AlgorithmComparison;