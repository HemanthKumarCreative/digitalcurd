import { ImageResponse } from 'next/og';
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';

export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default function Icon() {
  try {
    const imagePath = path.join(process.cwd(), 'unnamed-removebg-preview2.png');
    const imageBuffer = fs.readFileSync(imagePath);
    const imageBase64 = imageBuffer.toString('base64');
    const src = `data:image/png;base64,${imageBase64}`;

    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'white',
            borderRadius: '20%',
          }}
        >
          <img src={src} style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
        </div>
      ),
      {
        ...size,
      }
    );
  } catch (e) {
    console.error('Error generating apple-icon:', e);
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'white',
            borderRadius: '20%',
            color: 'black',
            fontWeight: 'bold',
            fontSize: '90px'
          }}
        >
          DC
        </div>
      ),
      { ...size }
    );
  }
}
