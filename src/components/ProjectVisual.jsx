/**
 * Illustrated thumbnails used until real screenshots are added.
 * If project.image is set, the screenshot is shown instead.
 */
function EvisaArt() {
  return (
    <div className="art art-evisa">
      <div className="art-panel">
        <div className="art-steps">
          {['Apply', 'Documents', 'Review', 'Approved'].map((step, index) => (
            <span key={step} className={`art-step ${index < 3 ? 'done' : ''}`}>
              <i>{index + 1}</i>
              {step}
            </span>
          ))}
        </div>
        <div className="art-form">
          <span className="art-field w-60" />
          <span className="art-field w-80" />
          <div className="art-upload">⬆ passport.pdf</div>
        </div>
      </div>
      <div className="art-stamp">VISA</div>
    </div>
  );
}

function ErpArt() {
  const bars = [52, 74, 40, 88, 66, 95, 58];
  return (
    <div className="art art-erp">
      <div className="art-sidebar">
        {['HR', 'Inv', 'Fin', 'Ops', 'CRM'].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <div className="art-main">
        <div className="art-kpis">
          <span />
          <span />
          <span />
        </div>
        <div className="art-bars">
          {bars.map((height, index) => (
            <span key={index} style={{ height: `${height}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function TasksArt() {
  const columns = [
    { title: 'To do', cards: 3 },
    { title: 'In progress', cards: 2 },
    { title: 'Done', cards: 3 },
  ];
  return (
    <div className="art art-tasks">
      {columns.map((column) => (
        <div key={column.title} className="art-column">
          <b>{column.title}</b>
          {Array.from({ length: column.cards }, (_, index) => (
            <span key={index} className="art-card" />
          ))}
        </div>
      ))}
    </div>
  );
}

const arts = { evisa: EvisaArt, erp: ErpArt, tasks: TasksArt };

export default function ProjectVisual({ project, large = false }) {
  if (project.image) {
    return (
      <div className={`project-visual ${large ? 'is-large' : ''}`}>
        <img src={project.image} alt={`${project.name} screenshot`} loading="lazy" decoding="async" />
      </div>
    );
  }
  const Art = arts[project.visual] ?? TasksArt;
  return (
    <div className={`project-visual visual-${project.visual} ${large ? 'is-large' : ''}`} aria-hidden="true">
      <Art />
    </div>
  );
}
