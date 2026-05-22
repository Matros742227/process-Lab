import './styles.css';

type ProcessStage = {
  l1Number: string;
  l1Title: string;
  gateNumber: string;
  gateTitle: string;
  l2: {
    number: string;
    title: string;
    l3: {
      number: string;
      title: string;
    }[];
  }[];
};

const stages: ProcessStage[] = [
  {
    l1Number: '1',
    l1Title: 'Получение заявки',
    gateNumber: 'GATE 1',
    gateTitle: 'Возможность выполнения заявки',
    l2: [{ number: '1.1', title: 'L2 заготовка', l3: [{ number: '1.1.1', title: 'L3 заготовка' }] }]
  },
  {
    l1Number: '2',
    l1Title: 'Подготовка к отбору',
    gateNumber: 'GATE 2',
    gateTitle: 'Готовность к выезду',
    l2: [{ number: '2.1', title: 'L2 заготовка', l3: [{ number: '2.1.1', title: 'L3 заготовка' }] }]
  },
  {
    l1Number: '3',
    l1Title: 'Отбор проб и измерения',
    gateNumber: 'GATE 3',
    gateTitle: 'Корректность отбора проб и измерений',
    l2: [{ number: '3.1', title: 'L2 заготовка', l3: [{ number: '3.1.1', title: 'L3 заготовка' }] }]
  },
  {
    l1Number: '4',
    l1Title: 'Транспортировка проб',
    gateNumber: 'GATE 4',
    gateTitle: 'Корректность транспортировки проб',
    l2: [{ number: '4.1', title: 'L2 заготовка', l3: [{ number: '4.1.1', title: 'L3 заготовка' }] }]
  },
  {
    l1Number: '5',
    l1Title: 'Приемка-передача проб',
    gateNumber: 'GATE 5',
    gateTitle: 'Корректность приемки и передачи проб',
    l2: [{ number: '5.1', title: 'L2 заготовка', l3: [{ number: '5.1.1', title: 'L3 заготовка' }] }]
  },
  {
    l1Number: '6',
    l1Title: 'Лабораторные исследования',
    gateNumber: 'GATE 6',
    gateTitle: 'Корректность выполнения лабораторных исследований',
    l2: [{ number: '6.1', title: 'L2 заготовка', l3: [{ number: '6.1.1', title: 'L3 заготовка' }] }]
  },
  {
    l1Number: '7',
    l1Title: 'Экспертиза',
    gateNumber: 'GATE 7',
    gateTitle: 'Корректность экспертизы',
    l2: [{ number: '7.1', title: 'L2 заготовка', l3: [{ number: '7.1.1', title: 'L3 заготовка' }] }]
  },
  {
    l1Number: '8',
    l1Title: 'Передача экспертного заключения в РПН',
    gateNumber: 'GATE 8',
    gateTitle: 'Корректность передачи экспертного заключения в РПН',
    l2: [{ number: '8.1', title: 'L2 заготовка', l3: [{ number: '8.1.1', title: 'L3 заготовка' }] }]
  }
];

function App() {
  return (
    <main className="process-map" aria-label="Статическая карта сквозного процесса КНМ ЦЛАТИ">
      <h1>Статическая визуальная карта сквозного процесса КНМ ЦЛАТИ</h1>
      <p className="subtitle">L1 → L2 → L3 по утвержденному описанию. L4 — не детализирован.</p>

      <section className="l1-chain" aria-label="Горизонтальная цепочка L1">
        {stages.map((stage, index) => (
          <div className="chain-item" key={stage.l1Number}>
            <span>{stage.l1Number}. {stage.l1Title}</span>
            {index < stages.length - 1 && <span className="arrow">→</span>}
          </div>
        ))}
      </section>

      <section className="stages-grid" aria-label="Детализация L2 и L3">
        {stages.map((stage) => (
          <article className="stage-card" key={stage.l1Number}>
            <header>
              <h2>L1 {stage.l1Number}. {stage.l1Title}</h2>
              <div className="gate">{stage.gateNumber}: {stage.gateTitle}</div>
            </header>

            {stage.l2.map((l2) => (
              <div className="l2-block" key={l2.number}>
                <h3>L2 {l2.number}. {l2.title}</h3>
                <ul>
                  {l2.l3.map((l3) => (
                    <li key={l3.number}><strong>L3 {l3.number}.</strong> {l3.title}</li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="l4-placeholder">L4 — не детализирован</div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default App;
