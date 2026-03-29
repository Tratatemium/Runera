interface Run {
  startTime: string;
  durationSec: number;
  distanceMeters: number;
}

interface RunsContextValue {
  runs: Record<string, Run> | null;
  setRuns: () => void;
  addRun: () => void;
  updateRun: () => void;
  deleteRun: () => void;
}

export type { Run, RunsContextValue };
