import { Process, ProcessResult, SchedulingResult } from '../../types';
import { RoundRobinState } from './types';
import { initializeProcessStates, getSampleProcesses, calculateAverages } from './utils';
import { executeProcess } from './processExecution';

export const calculateRoundRobin = (processes: Process[], quantum: number): SchedulingResult => {
  const workingProcesses = processes.length ? processes : getSampleProcesses();
  const n = workingProcesses.length;

  // Initialize state
  const state: RoundRobinState = {
    processes: workingProcesses,
    quantum,
    currentTime: 0,
    completed: 0,
    processOrder: [],
    states: initializeProcessStates(n)
  };

  // Initialize remaining times
  state.states.forEach((s, i) => {
    s.remainingTime = workingProcesses[i].burstTime;
  });

  // Main execution loop
  while (state.completed < n) {
    let executed = false;

    // Try to execute each process
    for (let i = 0; i < n; i++) {
      const result = executeProcess(state, i);
      if (result.executed) {
        executed = true;
      }
    }

    // If no process could execute, increment time
    if (!executed) {
      state.currentTime++;
    }
  }

  // Prepare results
  const results: ProcessResult[] = workingProcesses.map((p, i) => ({
    ...p,
    completionTime: state.states[i].completionTime,
    turnaroundTime: state.states[i].turnaroundTime,
    waitingTime: state.states[i].waitingTime,
    responseTime: state.states[i].responseTime
  }));

  const { avgWaitingTime, avgTurnaroundTime, avgResponseTime } = calculateAverages(results);
  const ganttSequence = state.processOrder.map(id => `P${id}`).join('->');

  // Build Gantt chart
  const ganttChart = state.processOrder.map((id, index) => ({
    id,
    start: index * quantum,
    end: (index + 1) * quantum
  }));

  return {
    name: 'Round Robin',
    results,
    ganttChart,
    averageWaitingTime: avgWaitingTime,
    averageTurnaroundTime: avgTurnaroundTime,
    averageResponseTime: avgResponseTime,
    ganttSequence
  };
};