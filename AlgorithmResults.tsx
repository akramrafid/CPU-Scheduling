import React from 'react';
import { SchedulingResult } from '../types';

interface AlgorithmResultsProps {
  result: SchedulingResult;
}

const AlgorithmResults: React.FC<AlgorithmResultsProps> = ({ result }) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-6">
      <h3 className="text-2xl font-semibold mb-4">{result.name}</h3>
      
      {result.name === 'Round Robin' && (
        <div className="mb-4">
          <h4 className="text-lg font-medium mb-2">Process Sequence</h4>
          <div className="bg-gray-100 p-3 rounded">
            {result.ganttSequence}
          </div>
        </div>
      )}
      
      <div className="mb-6">
        <h4 className="text-lg font-medium mb-2">Gantt Chart</h4>
        <div className="flex overflow-x-auto">
          {result.ganttChart.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 border border-gray-300 p-2 min-w-[80px] text-center"
              style={{ backgroundColor: `hsl(${(item.id * 137.5) % 360}, 70%, 85%)` }}
            >
              <div>P{item.id}</div>
              <div className="text-xs">{item.start}-{item.end}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full mb-4">
          <thead>
            <tr>
              <th className="px-4 py-2">Process</th>
              <th className="px-4 py-2">Arrival Time</th>
              <th className="px-4 py-2">Completion Time</th>
              <th className="px-4 py-2">Turnaround Time</th>
              <th className="px-4 py-2">Waiting Time</th>
            </tr>
          </thead>
          <tbody>
            {result.results.map((process) => (
              <tr key={process.id}>
                <td className="px-4 py-2 text-center">P{process.id}</td>
                <td className="px-4 py-2 text-center">{process.arrivalTime}</td>
                <td className="px-4 py-2 text-center">{process.completionTime}</td>
                <td className="px-4 py-2 text-center">{process.turnaroundTime}</td>
                <td className="px-4 py-2 text-center">{process.waitingTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-2 gap-4 text-center">
        <div>
          <p className="font-medium">Average Turnaround Time</p>
          <p>{result.averageTurnaroundTime.toFixed(2)} units</p>
        </div>
        <div>
          <p className="font-medium">Average Waiting Time</p>
          <p>{result.averageWaitingTime.toFixed(2)} units</p>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmResults;