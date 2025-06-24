import './style.css'
import Gantt from 'frappe-gantt';
import '/node_modules/frappe-gantt/dist/frappe-gantt.css';

document.querySelector('#app').innerHTML = `
  <h1>Sigma Gantt Plugin (Frappe Gantt Demo)</h1>
  <div id="gantt"></div>
`;

// Mapping function: Sigma data -> Frappe Gantt format
function mapSigmaToGantt(sigmaRows) {
  return sigmaRows.map(row => ({
    id: row.row_id,
    name: row.task_name,
    start: row.start_date,
    end: row.end_date,
    progress: row.percent_complete,
    dependencies: row.depends_on || ''
  }));
}

// Render Gantt chart with given tasks
function renderGantt(tasks) {
  // Clear previous chart if any
  const ganttContainer = document.getElementById('gantt');
  ganttContainer.innerHTML = '';
  new Gantt('#gantt', tasks);
}

// Listen for Sigma data via postMessage
window.addEventListener('message', (event) => {
  // Optionally, check event.origin for security
  if (event.data && Array.isArray(event.data)) {
    console.log('[Sigma Gantt Plugin] Incoming data:', event.data); // Debug log
    const tasks = mapSigmaToGantt(event.data);
    renderGantt(tasks);
  }
});

// Fallback: use demo data if running locally (no data received after short delay)
const demoSigmaData = [
  {
    task_name: 'Design',
    start_date: '2025-06-24',
    end_date: '2025-06-28',
    percent_complete: 20,
    depends_on: null,
    row_id: 'row-1'
  },
  {
    task_name: 'Development',
    start_date: '2025-06-29',
    end_date: '2025-07-05',
    percent_complete: 0,
    depends_on: 'row-1',
    row_id: 'row-2'
  }
];

let dataReceived = false;
setTimeout(() => {
  if (!dataReceived) {
    renderGantt(mapSigmaToGantt(demoSigmaData));
  }
}, 1000);

// Mark data as received if message arrives
window.addEventListener('message', () => { dataReceived = true; });
