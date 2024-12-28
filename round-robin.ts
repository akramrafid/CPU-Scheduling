import { Process, SchedulingResult } from "../types";

export const calculateRoundRobin = (processes: Process[], quantum: number): SchedulingResult => {
  // Initialize variables
  const n = processes.length;
  const remainingTime = processes.map(p => p.burstTime);
  const completionTime = new Array(n).fill(0);
  const turnaroundTime = new Array(n).fill(0);
  const waitingTime = new Array(n).fill(0);
  const responseTime = new Array(n).fill(-1);
  const ganttChart: { id: number; start: number; end: number }[] = [];

  let currentTime = 0;
  let completed = 0;
  const readyQueue: number[] = [];
  const processOrder: number[] = [];

  // Main loop for process execution
  while (completed < n) {
    // Add newly arrived processes to the ready queue
    for (let i = 0; i < n; i++) {
      if (
        processes[i].arrivalTime <= currentTime &&
        remainingTime[i] > 0 &&
        !readyQueue.includes(i)
      ) {
        readyQueue.push(i);
      }
    }

    if (readyQueue.length === 0) {
      currentTime++; // No process ready; increment time
      continue;
    }

    // Dequeue the first process from the ready queue
    const currentIndex = readyQueue.shift()!;
    const executeTime = Math.min(quantum, remainingTime[currentIndex]);

    if (responseTime[currentIndex] === -1) {
      responseTime[currentIndex] = currentTime - processes[currentIndex].arrivalTime;
    }

    // Execute the process
    ganttChart.push({
      id: processes[currentIndex].id,
      start: currentTime,
      end: currentTime + executeTime,
    });

    processOrder.push(processes[currentIndex].id);

    currentTime += executeTime;
    remainingTime[currentIndex] -= executeTime;

    // If the process is complete, calculate times
    if (remainingTime[currentIndex] === 0) {
      completed++;
      completionTime[currentIndex] = currentTime;
      turnaroundTime[currentIndex] =
        completionTime[currentIndex] - processes[currentIndex].arrivalTime;
      waitingTime[currentIndex] =
        turnaroundTime[currentIndex] - processes[currentIndex].burstTime;
    } else {
      // Add the process back to the ready queue if not completed
      readyQueue.push(currentIndex);
    }
  }

  const results = processes.map((p, i) => ({
    ...p,
    completionTime: completionTime[i],
    turnaroundTime: turnaroundTime[i],
    waitingTime: waitingTime[i],
    responseTime: responseTime[i],
  }));

  // Calculate averages
  const avgTurnaroundTime = results.reduce((sum, p) => sum + p.turnaroundTime, 0) / n;
  const avgWaitingTime = results.reduce((sum, p) => sum + p.waitingTime, 0) / n;

  // Format Gantt chart sequence
  const ganttSequence = processOrder.map(id => `P${id}`).join(" -> ");

  console.log("Gantt Chart Sequence:", ganttSequence);

  return {
    name: "Round Robin",
    results,
    ganttChart,
    averageWaitingTime: avgWaitingTime,
    averageTurnaroundTime: avgTurnaroundTime,
    ganttSequence,
  };
};

