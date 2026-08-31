import type { PredictiveArcCanvas as PredictiveArcCanvasExport } from '../vendor/threeui/predictive-arc-canvas';
import { useEffect, useRef, useState } from 'react';

import './pipeline-field.css';

type PredictiveArcComponent = typeof PredictiveArcCanvasExport;

const PIPELINE_STAGES = [
  { className: 'pipeline-field__stage--sample', label: 'Sample' },
  { className: 'pipeline-field__stage--qc', label: 'QC' },
  { className: 'pipeline-field__stage--nf-core', label: 'nf-core' },
  { className: 'pipeline-field__stage--insight', label: 'Insight' },
] as const;

export default function PipelineField() {
  const fieldRef = useRef<HTMLElement>(null);
  const [ArcCanvas, setArcCanvas] = useState<PredictiveArcComponent | null>(null);
  const [motionAllowed, setMotionAllowed] = useState(false);
  const [signalVisible, setSignalVisible] = useState(false);

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const field = fieldRef.current;
    let cancelled = false;

    const syncMotionPreference = () => {
      const allowsMotion = !motionPreference.matches;
      setMotionAllowed(allowsMotion);

      if (!allowsMotion) {
        setArcCanvas(null);
        return;
      }

      import('../vendor/threeui/predictive-arc-canvas').then(({ PredictiveArcCanvas }) => {
        if (!cancelled && !motionPreference.matches) {
          setArcCanvas(() => PredictiveArcCanvas);
        }
      });
    };

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      setSignalVisible(entry?.isIntersecting ?? false);
    });

    if (field) {
      visibilityObserver.observe(field);
    }
    motionPreference.addEventListener('change', syncMotionPreference);
    syncMotionPreference();

    return () => {
      cancelled = true;
      visibilityObserver.disconnect();
      motionPreference.removeEventListener('change', syncMotionPreference);
    };
  }, []);

  return (
    <figure
      ref={fieldRef}
      className="pipeline-field"
      data-motion={motionAllowed ? 'allowed' : 'static'}
      data-signal-visible={signalVisible ? 'true' : 'false'}
    >
      <figcaption className="sr-only">Pipeline stages from biological sample to insight</figcaption>
      <div className="pipeline-field__renderer" aria-hidden="true">
        {ArcCanvas ? (
          <ArcCanvas
            variant="predictive"
            mode="dark"
            speed={0.65}
            spacing={6}
            dotSize={4}
            archHeight={0.58}
            thickness={0.7}
            brightness={0.75}
            hue={254}
            saturation={0.9}
            className="pipeline-field__canvas"
          />
        ) : null}
      </div>
      <svg
        className="pipeline-field__topology"
        viewBox="0 0 100 60"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <title>Sample to insight pipeline</title>
        <path
          className="pipeline-field__path"
          d="M 8 39 C 21 38 28 17 43 17 S 44 46 53 46 C 65 46 72 30 88 30"
          pathLength="1"
        />
        <g className="pipeline-field__signal">
          <circle className="pipeline-field__signal-ring" r="1.7" />
          <circle className="pipeline-field__signal-core" r="0.75" />
        </g>
      </svg>
      <ol className="pipeline-field__stages" aria-label="Pipeline stages">
        {PIPELINE_STAGES.map((stage) => (
          <li className={`pipeline-field__stage ${stage.className}`} key={stage.label}>
            <span className="pipeline-field__node" aria-hidden="true" />
            <span>{stage.label}</span>
          </li>
        ))}
      </ol>
    </figure>
  );
}
