import { Process } from '../../types';
import { RoundRobinState } from './types';

export const executeProcess = (
  state: RoundRobinState,
  processIndex: number
): { state: RoundRobinState; executed: boolean } => {
  const { processes, quantum, currentTime, states } = state;
  const process = processes[processIndex];
  
  if (states[processIndex].remainingTime <= 0 || process.arrivalTime > currentTime) {
    return { state, executed: false };
  }

  // Record response time if first execution
  if (states[processIndex].responseTime === -1) {
    states[processIndex].responseTime = currentTime - process.arrivalTime;
  }

  const executeTime = Math.min(quantum, states[processIndex].remainingTime);
  states[processIndex].remainingTime -= executeTime;

  // Update completion and timing information if process completes
  if (states[processIndex].remainingTime === 0) {
    states[processIndex].completionTime = currentTime + executeTime;
    states[processIndex].turnaroundTime = states[processIndex].completionTime - process.arrivalTime;
    states[processIndex].waitingTime = states[processIndex].turnaroundTime - process.burstTime;
    state.completed++;
  }

  state.currentTime += executeTime;
  state.processOrder.push(process.id);

  return { state, executed: true };
};