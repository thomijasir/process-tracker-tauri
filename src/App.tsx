import { invoke } from '@tauri-apps/api/core';
import { useEffect, useState } from 'react';
import ProcessCard from './ProcessCard';
import './App.css';

interface ProcessInfo {
  id: string;
  name: string;
  running_time_formatted: string;
  memory_in_bytes: number;
}

const App: React.FC = () => {
  const [processes, setProcesses] = useState<ProcessInfo[]>([]);
  const [maxMemoryProcess, setMaxMemoryProcess] = useState<ProcessInfo>();
  const [maxRunningProcess, setMaxRunningProcess] = useState<ProcessInfo>();

  useEffect(() => {
    async function fetchData() {
      const processList = await invoke<ProcessInfo[]>('list_process');
      const maxMemory = await invoke<ProcessInfo>('max_memory');
      const maxRunning = await invoke<ProcessInfo>('max_running_time');
      setProcesses(processList);
      setMaxMemoryProcess(maxMemory);
      setMaxRunningProcess(maxRunning);
    }

    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className='container'>
      {maxMemoryProcess && (
        <ProcessCard title='Max Memory Process' process={maxMemoryProcess} />
      )}
      {maxRunningProcess && (
        <ProcessCard title='Max Memory Process' process={maxRunningProcess} />
      )}
      <div className='process-list'>
        {processes.map((process) => (
          <div key={process.id} className='process-item'>
            <span>
              {process.name} (ID: {process.id})
            </span>
            <span>Running Time: {process.running_time_formatted}</span>
            <span>Memory: {process.memory_in_bytes}</span>
          </div>
        ))}
      </div>
    </main>
  );
};

export default App;
