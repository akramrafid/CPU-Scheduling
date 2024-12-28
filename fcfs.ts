import { Process, ProcessResult, SchedulingResult } from '../types';

export const calculateFCFS = (processes: Process[]): SchedulingResult => {
  const sortedProcesses = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
  const results: ProcessResult[] = [];
  const ganttChart: { id: number; start: number; end: number }[] = [];
  
  let currentTime = 0;
  
  sortedProcesses.forEach((process) => {
    const startTime = Math.max(currentTime, process.arrivalTime);
    const completionTime = startTime + process.burstTime;
    
    results.push({
      ...process,
      completionTime,
      turnaroundTime: completionTime - process.arrivalTime,
      waitingTime: startTime - process.arrivalTime,
      responseTime: startTime - process.arrivalTime,
    });
    
    ganttChart.push({
      id: process.id,
      start: startTime,
      end: completionTime,
    });
    
    currentTime = completionTime;
  });

  const n = processes.length;
  return {
    name: 'First Come First Serve (FCFS)',
    results,
    ganttChart,
    averageWaitingTime: results.reduce((sum, p) => sum + p.waitingTime, 0) / n,
    averageTurnaroundTime: results.reduce((sum, p) => sum + p.turnaroundTime, 0) / n,
    averageResponseTime: results.reduce((sum, p) => sum + p.responseTime, 0) / n,
  };
};