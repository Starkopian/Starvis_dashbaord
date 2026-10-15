'use client';
import dynamic from 'next/dynamic';
import { Component, useEffect, useRef, useState, type ReactNode } from 'react';
import { AudioLines, Box, ShieldCheck, Sparkles } from 'lucide-react';

const Scene = dynamic(() => import('./mascot-scene'), { ssr: false });
const SPLINE_SCENE_URL =
  'https://my.spline.design/nexbotrobotcharacterconcept-X7tgstTeLSEUUiPUP3Uyka3x/';

class SceneBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export function MascotStage() {
  const root = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const [remoteFailed, setRemoteFailed] = useState(false);
  const [localFailed, setLocalFailed] = useState(false);
  // The public Spline file has a white stage and its own watermark. Keep the
  // branded local scene as the default while preserving the requested live option.
  const [useSpline, setUseSpline] = useState(false);

  useEffect(() => {
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setEnabled(!motion.matches);
    update();
    motion.addEventListener('change', update);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.05,
    });
    if (root.current) observer.observe(root.current);
    const visibility = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      observer.disconnect();
      motion.removeEventListener('change', update);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, []);

  const fallback = (
    <img
      className="nova-mascot-image"
      src="/brand/starvis.jpg"
      alt="STARVIS robot with glowing cyan and violet star eyes"
      width="1024"
      height="1024"
    />
  );
  const localScene = (
    <SceneBoundary fallback={fallback}>
      <Scene active={visible && !paused} onFailure={() => setLocalFailed(true)} />
    </SceneBoundary>
  );

  return (
    <div className="nova-stage spline-stage" ref={root}>
      <div className="spline-backdrop" aria-hidden="true" />
      <div className="nova-stage-grid" aria-hidden="true" />
      <div className="nova-orbit-label">S T A R V I S / COMMUNITY COMPANION</div>
      <div className="nova-canvas" aria-live="polite">
        {enabled && useSpline && visible && !paused && !remoteFailed ? (
          <iframe
            className="spline-embed"
            title="NEXBOT robot character concept, presented by Spline"
            src={SPLINE_SCENE_URL}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setRemoteFailed(true)}
          />
        ) : enabled && !useSpline && !localFailed ? (
          localScene
        ) : (
          fallback
        )}
      </div>
      <div className="nova-float nova-float-music">
        <AudioLines className="action-icon action-icon-music" size={19} />
        <span>
          YOUR SERVER’S SOUNDTRACK<small>Music, together.</small>
        </span>
        <i />
      </div>
      <div className="nova-float nova-float-security">
        <ShieldCheck className="action-icon action-icon-shield" size={18} />
        <span>
          BUILT-IN BOUNDARIES<small>Your community. Your rules.</small>
        </span>
      </div>
      <div className="nova-stage-bottom">
        <span>
          <Sparkles className="action-icon action-icon-spark" size={13} /> A little personality. A
          lot of possibility.
        </span>
        <div>
          {enabled && (
            <button onClick={() => setUseSpline((value) => !value)}>
              <Box size={13} /> {useSpline ? 'Use local 3D' : 'Use Spline 3D'}
            </button>
          )}
          <button onClick={() => setEnabled((value) => !value)}>
            {enabled ? 'Use static view' : 'Enable 3D'}
          </button>
        </div>
      </div>
    </div>
  );
}
