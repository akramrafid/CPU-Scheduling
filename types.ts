import { Process } from '../../types';

export interface ProcessState {
  remainingTime: number;
  completionTime: number;
  turnaroundTime: number;
  waitingTime: number;
  responseTime: number;
}

export interface RoundRobinState {
  processes: Process[];
  quantum: number;
  currentTime: number;
  completed: number;
  processOrder: number[];
  states: ProcessState[];
}