import { research } from '@/data/site';
import { FlowDiagram } from './FlowDiagram';

export function Research() {
  return (
    <section id="research" className="section" aria-labelledby="res-h">
      <div className="wrap grid res">
        <h2 id="res-h" className="res__title" data-split="lines">{research.title}</h2>
        <div className="res__meta" data-reveal="up">
          <p>{research.where}</p>
          <p className="muted">{research.when}</p>
          <p>{research.summary}</p>
        </div>
        <figure className="res__fig" data-reveal="up" data-delay="0.1">
          <FlowDiagram
            nodes={research.nodes.map((label) => ({ label }))}
            label="Thesis model: road network graph, graph neural network, LSTM, traffic forecast"
            cycle
          />
          <figcaption>Model architecture, simplified</figcaption>
        </figure>
      </div>
    </section>
  );
}
