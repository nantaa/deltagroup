import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

console.log('--- Running Main Project Quality & Cleanliness Test Suite ---')

let passed = true

const CHECKS = [
  {
    name: 'HeroSection.tsx - Zero ChatGPT images and clean hero character',
    file: 'components/ui/HeroSection.tsx',
    forbidden: ['ChatGPT Image', 'animate-bounce'],
    mustInclude: ['HeroPortal'],
  },
  {
    name: 'SectionLabel.tsx - Zero pulsing beacon dots',
    file: 'components/ui/SectionLabel.tsx',
    forbidden: ['animate-pulse'],
  },
  {
    name: 'StatsBar.tsx - Accurate metrics and clean layout',
    file: 'components/ui/StatsBar.tsx',
    forbidden: ['12+ Years', 'animate-bounce'],
    mustInclude: ['1000 +', '11 +'],
  },
  {
    name: 'WhyChooseUs.tsx - Zero generic fluff or neon circles',
    file: 'components/ui/WhyChooseUs.tsx',
    forbidden: ['shadow-cyan-500/10', 'animate-pulse'],
    mustInclude: ['KENAPA HARUS MEMILIH KAMI', 'Standar Internasional'],
  },
  {
    name: 'HomeClient.tsx - Proper headline and industry tags',
    file: 'components/ui/HomeClient.tsx',
    forbidden: ['AI-generated'],
    mustInclude: ['DIPERCAYA OLEH', '200+ Perusahaan'],
  },
  {
    name: 'TestimonialCTA.tsx - Zero neon blur balls',
    file: 'components/ui/TestimonialCTA.tsx',
    forbidden: ['bg-dnp-cyan/10 rounded-full blur-3xl'],
    mustInclude: ['Apa Kata Klien Kami'],
  },
]

const langContextFile = path.join(rootDir, 'lib/LanguageContext.tsx')
const langContent = fs.existsSync(langContextFile) ? fs.readFileSync(langContextFile, 'utf8') : ''

for (const check of CHECKS) {
  const filePath = path.join(rootDir, check.file)
  if (!fs.existsSync(filePath)) {
    console.error(`FAIL: File not found: ${check.file}`)
    passed = false
    continue
  }

  const content = fs.readFileSync(filePath, 'utf8')
  const combined = content + '\n' + langContent

  if (check.forbidden) {
    for (const f of check.forbidden) {
      if (content.includes(f)) {
        console.error(`FAIL: [${check.name}] contains forbidden signature: "${f}"`)
        passed = false
      }
    }
  }

  if (check.mustInclude) {
    for (const inc of check.mustInclude) {
      if (!combined.includes(inc)) {
        console.error(`FAIL: [${check.name}] is missing expected credible content: "${inc}"`)
        passed = false
      }
    }
  }

  console.log(`CHECK PROCESSED: ${check.file}`)
}

if (!passed) {
  console.error('\nResult: FAILED. Fixes needed.')
  process.exit(1)
} else {
  console.log('\nResult: ALL CHECKS PASSED. Project is clean and verified.')
  process.exit(0)
}
