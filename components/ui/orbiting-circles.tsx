// Adapted from Magic UI Orbiting Circles (MIT). See THIRD_PARTY_NOTICES.md.
import { Children, type CSSProperties, type ReactNode } from 'react';
export function OrbitingCircles({
  children,
  radius = 170,
  duration = 50,
  reverse = false,
}: {
  children: ReactNode;
  radius?: number;
  duration?: number;
  reverse?: boolean;
}) {
  return (
    <div className="orbit-system" aria-hidden="true">
      <div className="orbit-track" style={{ width: radius * 2, height: radius * 2 }} />
      {Children.map(children, (child, i) => (
        <div
          className="orbit-item"
          style={
            {
              '--radius': radius + 'px',
              '--angle': (i * 360) / Children.count(children) + 'deg',
              '--duration': duration + 's',
              animationDirection: reverse ? 'reverse' : 'normal',
            } as CSSProperties
          }
        >
          <div>{child}</div>
        </div>
      ))}
    </div>
  );
}
