const https = require('https')
const fs = require('fs')
const path = require('path')

const logoDir = path.join('public', 'assets', 'logos')
fs.mkdirSync(logoDir, { recursive: true })

const icons = [
  'google', 'microsoft', 'meta', 'linkedin', 'googleads', 'googleanalytics',
  'youtube', 'shopify', 'hubspot', 'mailchimp', 'whatsapp', 'powerbi',
  'wordpress', 'semrush', 'hotjar', 'tiktok', 'instagram', 'facebook',
  'zapier', 'figma',
]

const brandColors = {
  google: '#4285F4',
  microsoft: '#00A4EF',
  meta: '#0668E1',
  linkedin: '#0A66C2',
  googleads: '#4285F4',
  googleanalytics: '#E37400',
  youtube: '#FF0000',
  shopify: '#7AB55C',
  hubspot: '#FF7A59',
  mailchimp: '#FFE01B',
  whatsapp: '#25D366',
  powerbi: '#F2C811',
  wordpress: '#21759B',
  semrush: '#FF642D',
  hotjar: '#FF3C00',
  tiktok: '#000000',
  instagram: '#E4405F',
  facebook: '#1877F2',
  zapier: '#FF4A00',
  figma: '#F24E1E',
}

const get = (url) => new Promise((resolve, reject) => {
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      resolve(get(res.headers.location))
      return
    }
    if (res.statusCode !== 200) {
      res.resume()
      reject(new Error(String(res.statusCode)))
      return
    }
    const chunks = []
    res.on('data', (d) => chunks.push(d))
    res.on('end', () => resolve(Buffer.concat(chunks)))
  }).on('error', reject)
})

const downloadLogos = async () => {
  for (const slug of icons) {
    const buf = await get(`https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${slug}.svg`)
    let svg = buf.toString('utf8')
    const color = brandColors[slug] || '#111827'
    svg = svg.replace('<svg', `<svg fill="${color}"`)
    fs.writeFileSync(path.join(logoDir, `${slug}.svg`), svg)
    console.log('logo', slug, buf.length)
  }
}

const downloadVideo = async () => {
  const urls = [
    'https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4',
    'https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_25fps.mp4',
    'https://videos.pexels.com/video-files/3141208/3141208-uhd_2560_1440_25fps.mp4',
    'https://videos.pexels.com/video-files/18069232/18069232-hd_1280_720_24fps.mp4',
    'https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_30fps.mp4',
  ]
  for (const url of urls) {
    try {
      console.log('try video', url)
      const buf = await get(url)
      if (buf.length > 400000) {
        fs.writeFileSync(path.join('public', 'assets', 'ai-loop.mp4'), buf)
        console.log('video ok', buf.length)
        return
      }
    } catch (e) {
      console.log('video fail', e.message)
    }
  }
  throw new Error('No video downloaded')
}

;(async () => {
  await downloadLogos()
  await downloadVideo()
})().catch((e) => {
  console.error(e)
  process.exit(1)
})
