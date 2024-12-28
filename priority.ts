import { Process, ProcessResult, SchedulingResult } from '../types';

export const calculatePriority = (processes: Process[]): SchedulingResult => {
  const sortedProcesses = [...processes].sort((a, b) => {
    if (a.arrivalTime === b.arrivalTime) {
      return (b.priority || 0) - (a.priority || 0);
    }
    return a.arrivalTime - b.arrivalTime;
  });
  
  const results: ProcessResult[] = [];
  const ganttChart: { id: number; start: number; end: number }[] = [];
  let currentTime = 0;
  const remainingProcesses = [...sortedProcesses];
  
  while (remainingProcesses.length > 0) {
    const availableProcesses = remainingProcesses.filter(
      p => p.arrivalTime <= currentTime
    );
    
    if (availableProcesses.length === 0) {
      currentTime = Math.min(...remainingProcesses.map(p => p.arrivalTime));
      continue;
    }
    
    const nextProcess = availableProcesses.reduce((prev, curr) => 
      (curr.priority || 0) > (prev.priority || 0) ? curr : prev
    );
    
    const startTime = currentTime;
    const completionTime = startTime + nextProcess.burstTime;
    
    results.push({
      ...nextProcess,
      completionTime,
      turnaroundTime: completionTime - nextProcess.arrivalTime,
      waitingTime: startTime - nextProcess.arrivalTime,
      responseTime: startTime - nextProcess.arrivalTime,
    });
    
    ganttChart.push({
      id: nextProcess.id,
      start: startTime,
      end: completionTime,
    });
    
    currentTime = completionTime;
    const index = remainingProcesses.findIndex(p => p.id === nextProcess.id);
    remainingProcesses.splice(index, 1);
  }

  const n = processes.length;
  return {
    name: 'Priority Scheduling',
    results,
    ganttChart,
    averageWaitingTime: results.reduce((sum, p) => sum + p.waitingTime, 0) / n,
    averageTurnaroundTime: results.reduce((sum, p) => sum + p.turnaroundTime, 0) / n,
    averageResponseTime: results.reduce((sum, p) => sum + p.responseTime, 0) / n,
  };
};