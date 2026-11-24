import { ImageResponse } from 'next/og';

export const alt = 'Theekshana Harischandra, Senior Software Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#f2f4f5', color: '#121212', padding: 72, fontFamily: 'sans-serif' }}>
        <div style={{ display: 'flex', fontSize: 30, letterSpacing: 1 }}>Colombo, Sri Lanka</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 44, fontWeight: 600, marginBottom: 28 }}>
            <span style={{ background: '#d5fe00', padding: '0 12px' }}>Software systems, from architecture to production</span>
          </div>
          <div style={{ display: 'flex', fontSize: 132, fontWeight: 800, letterSpacing: -6, lineHeight: 0.9 }}>Theekshana</div>
          <div style={{ display: 'flex', fontSize: 132, fontWeight: 800, letterSpacing: -6, lineHeight: 0.9 }}>Harischandra</div>
        </div>
        <div style={{ display: 'flex', fontSize: 28 }}>Senior Software Engineer | Software Development, DevOps and Cloud</div>
      </div>
    ),
    size,
  );
}
