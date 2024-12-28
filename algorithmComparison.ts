import { SchedulingResult } from '../types';

export const compareAlgorithms = (results: SchedulingResult[]): {
  bestAlgorithm: string;
  comparison: {
    name: string;
    waitingTime: number;
    turnaroundTime: number;
    responseTime: number;
  }[];
} => {
  // Sort algorithms by average waiting time
  const sortedByWaitingTime = [...results].sort(
    (a, b) => a.averageWaitingTime - b.averageWaitingTime
  );

  // Create comparison data
  const comparison = results.map(result => ({
    name: result.name,
    waitingTime: parseFloat(result.averageWaitingTime.toFixed(2)),
    turnaroundTime: parseFloat(result.averageTurnaroundTime.toFixed(2)),
    responseTime: parseFloat(result.averageResponseTime.toFixed(2))
  }));

  // Find best algorithm based on waiting time
  const bestAlgorithm = sortedByWaitingTime[0].name;

  return {
    bestAlgorithm,
    comparison
  };
};