import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import ProcessInput from './components/ProcessInput';
import AlgorithmResults from './components/AlgorithmResults';
import AlgorithmComparison from './components/AlgorithmComparison';
import { Process, SchedulingResult } from './types';
import { calculateFCFS, calculatePriority, calculateRoundRobin } from './algorithms';

function App() {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [results, setResults] = useState<SchedulingResult[]>([]);
  const [quantumTime, setQuantumTime] = useState(2);

  const calculateResults = () => {
    const fcfsResult = calculateFCFS(processes);
    const priorityResult = calculatePriority(processes);
    const rrResult = calculateRoundRobin(processes, quantumTime);
    
    setResults([fcfsResult, priorityResult, rrResult]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-500 to-green-400">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center mb-8">
          <Calculator className="w-8 h-8 text-white mr-2" />
          <h1 className="text-4xl font-bold text-white">CPU Scheduling Simulator</h1>
        </div>
        
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-6 mb-8">
          <ProcessInput 
            processes={processes} 
            setProcesses={setProcesses}
            quantumTime={quantumTime}
            setQuantumTime={setQuantumTime}
            onCalculate={calculateResults}
          />
        </div>

        {results.length > 0 && (
          <div className="space-y-8">
            <AlgorithmComparison results={results} />
            {results.map((result, index) => (
              <AlgorithmResults key={index} result={result} />
            ))}
          </div>
        )}
        
        <footer className="text-center text-white mt-8 py-4">
          Made by Akram And Jihad
        </footer>
      </div>
    </div>
  );
}

export default App;