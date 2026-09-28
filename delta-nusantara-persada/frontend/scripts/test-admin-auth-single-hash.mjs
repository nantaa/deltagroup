import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const BACKEND_ROOT = path.resolve('..', 'backend')

test('Backend User model does not double-hash passwords via casts', () => {
  const userPath = path.join(BACKEND_ROOT, 'app', 'Models', 'User.php')
  assert.ok(fs.existsSync(userPath), 'User.php must exist')
  const userCode = fs.readFileSync(userPath, 'utf8')

  // User casts should NOT contain 'password' => 'hashed' when explicit Hash::make is used in controllers/seeders/commands
  const hasHashedCast = /'password'\s*=>\s*['"]hashed['"]/.test(userCode)
  assert.strictEqual(
    hasHashedCast,
    false,
    'User.php casts must not contain "password" => "hashed" to avoid double-hashing passwords when callers use Hash::make()'
  )
})

test('CreateAdminCommand uses single-hash password assignment', () => {
  const cmdPath = path.join(BACKEND_ROOT, 'app', 'Console', 'Commands', 'CreateAdminCommand.php')
  assert.ok(fs.existsSync(cmdPath), 'CreateAdminCommand.php must exist')
  const cmdCode = fs.readFileSync(cmdPath, 'utf8')

  assert.ok(
    cmdCode.includes('Hash::make($password)'),
    'CreateAdminCommand must hash plain text password explicitly with Hash::make'
  )
  assert.ok(
    cmdCode.includes('admin@deltanusa.co.id'),
    'CreateAdminCommand default email must be admin@deltanusa.co.id'
  )
})

test('AuthController verifies single-hash passwords via Hash::check and issues Sanctum token', () => {
  const authPath = path.join(BACKEND_ROOT, 'app', 'Http', 'Controllers', 'Api', 'AuthController.php')
  assert.ok(fs.existsSync(authPath), 'AuthController.php must exist')
  const authCode = fs.readFileSync(authPath, 'utf8')

  assert.ok(
    authCode.includes('Hash::check($request->password, $user->password)'),
    'AuthController must check password with Hash::check'
  )
  assert.ok(
    authCode.includes("createToken('auth_token')"),
    'AuthController must issue Sanctum token on successful login'
  )
})
