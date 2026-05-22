import { useMemo, useState } from 'react';
import ReactFlow, { Background, Controls, Edge, MarkerType, Node } from 'reactflow';
import 'reactflow/dist/style.css';

export type ProcessLevel = 'END_TO_END' | 'L1' | 'L2' | 'L3' | 'L4';

export type ProcessNode = {
  id: string;
  number: string;
  title: string;
  description?: string;
  level: ProcessLevel;
  parentId?: string;
  result?: string;
  gateId?: string;
  childrenIds: string[];
};

export type ProcessConnection = {
  id: string;
  sourceId: string;
  targetId: string;
  type: 'sequence' | 'decomposition' | 'gate';
};

export type Gate = {
  id: string;
  number: string;
  title: string;
  linkedProcessId: string;
  criteria: string[];
  decisions: string[];
};

export type L4InstructionDraft = {
  id: string;
  parentOperationId: string;
  status: 'not_filled' | 'draft' | 'filled';
};

export type ProcessModel = {
  id: string;
  title: string;
  rootProcessId: string;
  nodes: ProcessNode[];
  connections: ProcessConnection[];
  gates: Gate[];
  l4Drafts: L4InstructionDraft[];
};

const processModel: ProcessModel = {
  id: 'knm-cslati-v1',
  title: 'Процессная архитектура КНМ ЦЛАТИ',
  rootProcessId: 'knm-root',
  nodes: [
    { id: 'knm-root', number: 'E2E', title: 'Сквозной процесс КНМ', level: 'END_TO_END', childrenIds: ['l1-1','l1-2','l1-3','l1-4','l1-5','l1-6','l1-7','l1-8'] },
    { id: 'l1-1', number: '1', title: 'Получение заявки', level: 'L1', parentId: 'knm-root', gateId: 'gate-1', result: 'Заявка формально принята в обработку.', description: 'Вход в процесс КНМ с фиксацией исходных данных.', childrenIds: ['l2-1-1'] },
    { id: 'l1-2', number: '2', title: 'Подготовка к отбору', level: 'L1', parentId: 'knm-root', gateId: 'gate-2', result: 'Сформирована готовность к выезду.', description: 'Организационная и ресурсная подготовка к полевым работам.', childrenIds: ['l2-2-1'] },
    { id: 'l1-3', number: '3', title: 'Отбор проб и измерения', level: 'L1', parentId: 'knm-root', gateId: 'gate-3', result: 'Пробы и измерения выполнены по плану.', description: 'Полевой этап КНМ.', childrenIds: ['l2-3-1'] },
    { id: 'l1-4', number: '4', title: 'Транспортировка проб', level: 'L1', parentId: 'knm-root', gateId: 'gate-4', result: 'Пробы доставлены с соблюдением условий.', description: 'Перемещение проб в лабораторию.', childrenIds: ['l2-4-1'] },
    { id: 'l1-5', number: '5', title: 'Приемка-передача проб', level: 'L1', parentId: 'knm-root', gateId: 'gate-5', result: 'Пробы корректно переданы в лабораторный контур.', description: 'Официальная приемка и регистрация передачи.', childrenIds: ['l2-5-1'] },
    { id: 'l1-6', number: '6', title: 'Лабораторные исследования', level: 'L1', parentId: 'knm-root', gateId: 'gate-6', result: 'Получены результаты лабораторных исследований.', description: 'Выполнение лабораторных методик.', childrenIds: ['l2-6-1'] },
    { id: 'l1-7', number: '7', title: 'Экспертиза', level: 'L1', parentId: 'knm-root', gateId: 'gate-7', result: 'Подготовлено экспертное заключение.', description: 'Анализ и экспертная оценка результатов.', childrenIds: ['l2-7-1'] },
    { id: 'l1-8', number: '8', title: 'Передача экспертного заключения в РПН', level: 'L1', parentId: 'knm-root', gateId: 'gate-8', result: 'Экспертное заключение передано в РПН.', description: 'Финальная передача результата во внешний контур.', childrenIds: ['l2-8-1'] },

    { id: 'l2-1-1', number: '1.1', title: 'L2 заготовка', level: 'L2', parentId: 'l1-1', childrenIds: ['l3-1-1-1'] },
    { id: 'l2-2-1', number: '2.1', title: 'L2 заготовка', level: 'L2', parentId: 'l1-2', childrenIds: ['l3-2-1-1'] },
    { id: 'l2-3-1', number: '3.1', title: 'L2 заготовка', level: 'L2', parentId: 'l1-3', childrenIds: ['l3-3-1-1'] },
    { id: 'l2-4-1', number: '4.1', title: 'L2 заготовка', level: 'L2', parentId: 'l1-4', childrenIds: ['l3-4-1-1'] },
    { id: 'l2-5-1', number: '5.1', title: 'L2 заготовка', level: 'L2', parentId: 'l1-5', childrenIds: ['l3-5-1-1'] },
    { id: 'l2-6-1', number: '6.1', title: 'L2 заготовка', level: 'L2', parentId: 'l1-6', childrenIds: ['l3-6-1-1'] },
    { id: 'l2-7-1', number: '7.1', title: 'L2 заготовка', level: 'L2', parentId: 'l1-7', childrenIds: ['l3-7-1-1'] },
    { id: 'l2-8-1', number: '8.1', title: 'L2 заготовка', level: 'L2', parentId: 'l1-8', childrenIds: ['l3-8-1-1'] },

    { id: 'l3-1-1-1', number: '1.1.1', title: 'L3 заготовка', level: 'L3', parentId: 'l2-1-1', childrenIds: [] },
    { id: 'l3-2-1-1', number: '2.1.1', title: 'L3 заготовка', level: 'L3', parentId: 'l2-2-1', childrenIds: [] },
    { id: 'l3-3-1-1', number: '3.1.1', title: 'L3 заготовка', level: 'L3', parentId: 'l2-3-1', childrenIds: [] },
    { id: 'l3-4-1-1', number: '4.1.1', title: 'L3 заготовка', level: 'L3', parentId: 'l2-4-1', childrenIds: [] },
    { id: 'l3-5-1-1', number: '5.1.1', title: 'L3 заготовка', level: 'L3', parentId: 'l2-5-1', childrenIds: [] },
    { id: 'l3-6-1-1', number: '6.1.1', title: 'L3 заготовка', level: 'L3', parentId: 'l2-6-1', childrenIds: [] },
    { id: 'l3-7-1-1', number: '7.1.1', title: 'L3 заготовка', level: 'L3', parentId: 'l2-7-1', childrenIds: [] },
    { id: 'l3-8-1-1', number: '8.1.1', title: 'L3 заготовка', level: 'L3', parentId: 'l2-8-1', childrenIds: [] }
  ],
  connections: [
    { id: 'seq-1-2', sourceId: 'l1-1', targetId: 'l1-2', type: 'sequence' },
    { id: 'seq-2-3', sourceId: 'l1-2', targetId: 'l1-3', type: 'sequence' },
    { id: 'seq-3-4', sourceId: 'l1-3', targetId: 'l1-4', type: 'sequence' },
    { id: 'seq-4-5', sourceId: 'l1-4', targetId: 'l1-5', type: 'sequence' },
    { id: 'seq-5-6', sourceId: 'l1-5', targetId: 'l1-6', type: 'sequence' },
    { id: 'seq-6-7', sourceId: 'l1-6', targetId: 'l1-7', type: 'sequence' },
    { id: 'seq-7-8', sourceId: 'l1-7', targetId: 'l1-8', type: 'sequence' }
  ],
  gates: [
    { id: 'gate-1', number: 'GATE 1', title: 'Возможность выполнения заявки', linkedProcessId: 'l1-1', criteria: ['Критерии заполняются в следующих версиях'], decisions: ['approve', 'rework'] },
    { id: 'gate-2', number: 'GATE 2', title: 'Готовность к выезду', linkedProcessId: 'l1-2', criteria: ['Критерии заполняются в следующих версиях'], decisions: ['approve', 'rework'] },
    { id: 'gate-3', number: 'GATE 3', title: 'Корректность отбора проб и измерений', linkedProcessId: 'l1-3', criteria: ['Критерии заполняются в следующих версиях'], decisions: ['approve', 'rework'] },
    { id: 'gate-4', number: 'GATE 4', title: 'Корректность транспортировки проб', linkedProcessId: 'l1-4', criteria: ['Критерии заполняются в следующих версиях'], decisions: ['approve', 'rework'] },
    { id: 'gate-5', number: 'GATE 5', title: 'Корректность приемки и передачи проб', linkedProcessId: 'l1-5', criteria: ['Критерии заполняются в следующих версиях'], decisions: ['approve', 'rework'] },
    { id: 'gate-6', number: 'GATE 6', title: 'Корректность выполнения лабораторных исследований', linkedProcessId: 'l1-6', criteria: ['Критерии заполняются в следующих версиях'], decisions: ['approve', 'rework'] },
    { id: 'gate-7', number: 'GATE 7', title: 'Корректность экспертизы', linkedProcessId: 'l1-7', criteria: ['Критерии заполняются в следующих версиях'], decisions: ['approve', 'rework'] },
    { id: 'gate-8', number: 'GATE 8', title: 'Корректность передачи экспертного заключения в РПН', linkedProcessId: 'l1-8', criteria: ['Критерии заполняются в следующих версиях'], decisions: ['approve', 'rework'] }
  ],
  l4Drafts: [
    { id: 'l4-draft-1', parentOperationId: 'l3-1-1-1', status: 'not_filled' }
  ]
};

type VisualizationMode = 'CHAIN' | 'HIERARCHY' | 'GATE_MAP' | 'COMPLETENESS';

function App() {
  const [mode, setMode] = useState<VisualizationMode>('CHAIN');
  const [selectedId, setSelectedId] = useState<string>('l1-1');

  const nodeMap = useMemo(() => new Map(processModel.nodes.map((node) => [node.id, node])), []);
  const gateMap = useMemo(() => new Map(processModel.gates.map((gate) => [gate.id, gate])), []);
  const selectedNode = nodeMap.get(selectedId);
  const selectedGate = selectedNode?.gateId ? gateMap.get(selectedNode.gateId) : undefined;

  const flowNodes: Node[] = processModel.nodes
    .filter((node) => node.level === 'L1')
    .map((node, index) => ({
      id: node.id,
      position: { x: index * 280, y: 180 },
      data: { label: `${node.number}. ${node.title}` },
      style: { width: 240, border: selectedId === node.id ? '2px solid #2563eb' : '1px solid #64748b', borderRadius: 8, padding: 12, background: '#ffffff' }
    }));

  const gateNodes: Node[] = processModel.gates.map((gate, index) => ({
    id: gate.id,
    position: { x: index * 280 + 80, y: 60 },
    data: { label: `${gate.number}` },
    style: { width: 100, border: '1px dashed #16a34a', borderRadius: 20, background: '#f0fdf4', textAlign: 'center' }
  }));

  const flowEdges: Edge[] = [
    ...processModel.connections.map((connection) => ({
      id: connection.id,
      source: connection.sourceId,
      target: connection.targetId,
      markerEnd: { type: MarkerType.ArrowClosed },
      animated: true
    })),
    ...processModel.gates.map((gate) => ({
      id: `${gate.id}-link`,
      source: gate.id,
      target: gate.linkedProcessId,
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: '#16a34a', strokeDasharray: '6 4' }
    }))
  ];

  const onExport = () => {
    const blob = new Blob([JSON.stringify(processModel, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'process-model-knm-v1.json';
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <h1>Процессная архитектура КНМ ЦЛАТИ</h1>
        <div className="modes">
          {[['CHAIN', 'Сквозная цепочка'], ['HIERARCHY', 'Иерархия'], ['GATE_MAP', 'Карта GATE'], ['COMPLETENESS', 'Заполненность модели']].map(([key, title]) => (
            <button key={key} className={mode === key ? 'active' : ''} onClick={() => setMode(key as VisualizationMode)}>
              {title}
            </button>
          ))}
        </div>
        <button onClick={onExport}>Экспорт JSON</button>
      </header>
      <main className="layout">
        <aside className="left-panel">
          <h3>Навигация уровней</h3>
          <ul>
            <li>Сквозной процесс</li><li>L1</li><li>L2</li><li>L3</li><li>L4</li><li>GATE</li>
          </ul>
        </aside>
        <section className="canvas-wrap">
          {mode === 'CHAIN' ? (
            <ReactFlow
              nodes={[...flowNodes, ...gateNodes]}
              edges={flowEdges}
              fitView
              onNodeClick={(_, node) => setSelectedId(node.id)}
            >
              <Background />
              <Controls />
            </ReactFlow>
          ) : (
            <div className="stub">Режим «{mode}» подготовлен как UI-заготовка для v2.</div>
          )}
        </section>
        <aside className="right-panel">
          <h3>Карточка элемента</h3>
          {selectedNode ? (
            <>
              <p><b>Уровень:</b> {selectedNode.level}</p>
              <p><b>Номер:</b> {selectedNode.number}</p>
              <p><b>Название:</b> {selectedNode.title}</p>
              <p><b>Описание:</b> {selectedNode.description ?? '—'}</p>
              <p><b>Связанный GATE:</b> {selectedGate ? `${selectedGate.number} — ${selectedGate.title}` : '—'}</p>
              <p><b>Результат процесса:</b> {selectedNode.result ?? '—'}</p>
              <p><b>Дочерние элементы:</b> {selectedNode.childrenIds.length ? selectedNode.childrenIds.join(', ') : '—'}</p>
            </>
          ) : (
            <p>Выберите элемент на карте.</p>
          )}
        </aside>
      </main>
      <footer className="bottombar">
        <span>Сквозной процесс: заполнен</span>
        <span>L1: заполнен</span>
        <span>L2: частично заложен</span>
        <span>L3: частично заложен</span>
        <span>L4: не заполнен</span>
        <span>GATE: заполнен</span>
      </footer>
    </div>
  );
}

export default App;
