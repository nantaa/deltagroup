import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const frontendRoot = path.resolve(__dirname, '..')

const nextConfigPath = path.join(frontendRoot, 'next.config.js')
const ecosystemPath = path.join(frontendRoot, 'ecosystem.config.js')

test('Next.js standalone build configuration', () => {
  assert.ok(fs.existsSync(nextConfigPath), 'next.config.js must exist')
  const nextConfigContent = fs.readFileSync(nextConfigPath, 'utf-8')
  assert.ok(
    nextConfigContent.includes("output: 'standalone'"),
    "next.config.js must specify output: 'standalone' for lightweight VPS memory footprint"
  )
})

test('PM2 ecosystem configuration for standalone mode', () => {
  assert.ok(fs.existsSync(ecosystemPath), 'ecosystem.config.js must exist in frontend root')
  const ecosystemContent = fs.readFileSync(ecosystemPath, 'utf-8')
  assert.ok(
    ecosystemContent.includes('server.js') || ecosystemContent.includes('.next/standalone'),
    'PM2 script must execute standalone server.js directly instead of npm start'
  )
  assert.ok(
    ecosystemContent.includes("max_memory_restart: '256M'") || ecosystemContent.includes("max_memory_restart: '300M'"),
    'PM2 max_memory_restart must be capped at <= 300M to protect 2GB RAM server'
  )
})
