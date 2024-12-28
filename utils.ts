import { Process, ProcessResult } from '../../types';
import { ProcessState, RoundRobinState } from './types';

export const initializeProcessStates = (n: number): ProcessState[] => {
  return Array(n).fill(null).map(() => ({
    remainingTime: 0,
    completionTime: 0,
    turnaroundTime: 0,
    waitingTime: 0,
    responseTime: -1
  }));
};

export const getSampleProcesses = (): Process[] => [
  { id: 1, arrivalTime: 0, burstTime: 5 },
  { id: 2, arrivalTime: 1, burstTime: 3 },
  { id: 3, arrivalTime: 2, burstTime: 1 },
  { id: 4, arrivalTime: 3, burstTime: 2 },
  { id: 5, arrivalTime: 4, burstTime: 3 }
];

export const calculateAverages = (results: ProcessResult[]) => {
  const n = results.length;
  return {
    avgWaitingTime: results.reduce((sum, p) => sum + p.waitingTime, 0) / n,
    avgTurnaroundTime: results.reduce((sum, p) => sum + p.turnaroundTime, 0) / n,
    avgResponseTime: results.reduce((sum, p) => sum + p.responseTime, 0) / n
  };
};