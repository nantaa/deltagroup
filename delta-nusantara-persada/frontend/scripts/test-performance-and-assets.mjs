import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

const NEXT_CONFIG = path.join(rootDir, 'next.config.js')
const MAX_IMAGE_SIZE_BYTES = 500 * 1024 // 500 KB ceiling for web photos

test('TDD 1: next.config.js configures optimizePackageImports for lucide-react', () => {
  assert.ok(fs.existsSync(NEXT_CONFIG), 'next.config.js must exist')
  const content = fs.readFileSync(NEXT_CONFIG, 'utf-8')
  assert.match(
    content,
    /optimizePackageImports:\s*\[[^\]]*'lucide-react'[^\]]*\]/,
    'next.config.js must configure optimizePackageImports for lucide-react to prevent icon barrel bloat'
  )
})

test('TDD 2: next.config.js configures compress: true', () => {
  assert.ok(fs.existsSync(NEXT_CONFIG), 'next.config.js must exist')
  const content = fs.readFileSync(NEXT_CONFIG, 'utf-8')
  assert.match(
    content,
    /compress:\s*true/,
    'next.config.js should explicitly enable compression'
  )
})

test('TDD 3: pak-ricky image asset is optimized and does not exceed 500 KB', () => {
  const filePath = path.join(rootDir, 'public/images/extracted/pak-ricky.png')
  assert.ok(fs.existsSync(filePath), 'pak-ricky.png must exist')
  const stats = fs.statSync(filePath)
  assert.ok(
    stats.size <= MAX_IMAGE_SIZE_BYTES,
    `pak-ricky.png size is ${(stats.size / 1024 / 1024).toFixed(2)} MB, which exceeds 500 KB limit`
  )
})

test('TDD 4: escalator-inspection.jpg asset is optimized and does not exceed 500 KB', () => {
  const filePath = path.join(rootDir, 'public/images/escalator-inspection.jpg')
  assert.ok(fs.existsSync(filePath), 'escalator-inspection.jpg must exist')
  const stats = fs.statSync(filePath)
  assert.ok(
    stats.size <= MAX_IMAGE_SIZE_BYTES,
    `escalator-inspection.jpg size is ${(stats.size / 1024 / 1024).toFixed(2)} MB, which exceeds 500 KB limit`
  )
})

test('TDD 5: forklift-inspection.jpg asset is optimized and does not exceed 500 KB', () => {
  const filePath = path.join(rootDir, 'public/images/forklift-inspection.jpg')
  assert.ok(fs.existsSync(filePath), 'forklift-inspection.jpg must exist')
  const stats = fs.statSync(filePath)
  assert.ok(
    stats.size <= MAX_IMAGE_SIZE_BYTES,
    `forklift-inspection.jpg size is ${(stats.size / 1024 / 1024).toFixed(2)} MB, which exceeds 500 KB limit`
  )
})
