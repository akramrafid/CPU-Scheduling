import React from 'react';
import { Process } from '../types';

interface ProcessInputProps {
  processes: Process[];
  setProcesses: (processes: Process[]) => void;
  quantumTime: number;
  setQuantumTime: (time: number) => void;
  onCalculate: () => void;
}

const ProcessInput: React.FC<ProcessInputProps> = ({
  processes,
  setProcesses,
  quantumTime,
  setQuantumTime,
  onCalculate,
}) => {
  const addProcess = () => {
    setProcesses([
      ...processes,
      { id: processes.length + 1, arrivalTime: 0, burstTime: 1, priority: 1 },
    ]);
  };

  const updateProcess = (index: number, field: keyof Process, value: number) => {
    const newProcesses = [...processes];
    newProcesses[index] = { ...newProcesses[index], [field]: value };
    setProcesses(newProcesses);
  };

  const removeProcess = (index: number) => {
    setProcesses(processes.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Process Input</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Quantum Time (for Round Robin)
        </label>
        <input
          type="number"
          min="1"
          value={quantumTime}
          onChange={(e) => setQuantumTime(Number(e.target.value))}
          className="w-32 px-3 py-2 border rounded-md"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full mb-4">
          <thead>
            <tr>
              <th className="px-4 py-2">Process ID</th>
              <th className="px-4 py-2">Arrival Time</th>
              <th className="px-4 py-2">Burst Time</th>
              <th className="px-4 py-2">Priority</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {processes.map((process, index) => (
              <tr key={process.id}>
                <td className="px-4 py-2 text-center">P{process.id}</td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    min="0"
                    value={process.arrivalTime}
                    onChange={(e) => updateProcess(index, 'arrivalTime', Number(e.target.value))}
                    className="w-20 px-2 py-1 border rounded"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    min="1"
                    value={process.burstTime}
                    onChange={(e) => updateProcess(index, 'burstTime', Number(e.target.value))}
                    className="w-20 px-2 py-1 border rounded"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    min="1"
                    value={process.priority}
                    onChange={(e) => updateProcess(index, 'priority', Number(e.target.value))}
                    className="w-20 px-2 py-1 border rounded"
                  />
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => removeProcess(index)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex gap-4">
        <button
          onClick={addProcess}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Process
        </button>
        <button
          onClick={onCalculate}
          disabled={processes.length === 0}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          Calculate
        </button>
      </div>
    </div>
  );
};

export default ProcessInput;