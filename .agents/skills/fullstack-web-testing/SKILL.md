---
name: fullstack-web-testing
description: Best practices and execution workflows for comprehensive fullstack testing in Next.js, React, Node, and database-backed web applications using Vitest, Testing Library, and Playwright.
---

# Fullstack Web Testing: AI Agent Best Practices

This skill defines the gold standard testing methodology for autonomous and pair-programming AI coding agents working on full-stack web applications (Next.js App Router, React 19, Drizzle/Prisma/MySQL, REST APIs, and UI components).

---

## 🎯 The 6 Iron Rules of AI Testing

### 1. The Red-Green Proof (Watch it Fail)
- **Iron Law**: Never implement production code without writing a test and watching it fail with the **exact expected reason**.
- If a test passes before you modify or write the target code, your test is either redundant or testing nothing. Delete and re-architect.

### 2. Inverted & Boundary Stress Testing
AI agents have an innate bias toward happy paths. You MUST deliberately test:
- **Boundary Limits**: 0 items, max items, negative values, decimals, zero-length strings.
- **Security & Authorization**: Missing tokens, revoked API keys, malformed JWTs (`401 Unauthorized`), non-admin roles accessing admin endpoints (`403 Forbidden`).
- **Resilience & Disconnection**: Database timeout, offline mode, unreachable network. Verify graceful degradation (e.g. fallback catalog) instead of unhandled 500 crashes.

### 3. Anti-Tautology (Zero Hollow Assertions)
- **Bad**: `expect(result).toBeDefined()` (passes on `{ error: 'fatal' }`).
- **Good**: `expect(result.status).toBe(200); expect(result.data).toHaveLength(5); expect(result.data[0]).toMatchObject({ id: expect.any(String), name: expect.any(String) });`
- **Bad**: Asserting mock implementations that merely test the mock itself.
- **Good**: Testing the actual transformation function, schema validator, or DOM mutation.

### 4. The 4-Tier Fullstack Testing Pyramid

```
       ▲
      / \     Tier 4: E2E & Smoke (Playwright / Headless)
     /   \    - Real browser navigation, zero 500s, visual integrity
    /-----\
   /       \   Tier 3: Component & DOM (Testing Library + happy-dom)
  /         \  - User interactions, accessibility roles, render outputs
 /-----------\
/             \  Tier 2: API & Integration (Next.js Request/Response)
/               \ - HTTP status codes, DB transactions, auth headers
/-----------------\
/                   \ Tier 1: Unit & Schema (Vitest + Drizzle/Zod)
/                     \ - Column types, pricing math, date formatting
/---------------------\
```

---

## 🛠️ Stack Implementation Patterns

### Tier 1: Drizzle / Schema & Pure Logic Testing
Use fast in-memory execution (< 10ms) to verify data structures before running migrations:
```typescript
import { describe, it, expect } from 'vitest';
import * as schema from '@/lib/db/schema';

describe('Database Schema Invariants', () => {
  it('enforces required foreign keys and primary keys', () => {
    expect(schema.courses.id).toBeDefined();
    expect(schema.courses.categoryId).toBeDefined();
  });
});
```

### Tier 2: Next.js App Router API Testing
Test Route Handlers (`GET`, `POST`, `PUT`, `DELETE`) by passing standard `Request` objects:
```typescript
import { describe, it, expect } from 'vitest';
import { GET } from '@/app/api/v1/courses/route';

describe('GET /api/v1/courses', () => {
  it('returns 200 with structured JSON catalog', async () => {
    const req = new Request('http://localhost:3000/api/v1/courses');
    const res = await GET(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body.data)).toBe(true);
  });

  it('rejects unauthenticated POST requests with 401', async () => {
    const req = new Request('http://localhost:3000/api/v1/courses', {
      method: 'POST',
      body: JSON.stringify({ name: 'Hacking course' }),
    });
    const res = await POST(req);
    expect(res.status).toBe(401);
  });
});
```

### Tier 3: React 19 UI Component Testing
Run with `happy-dom` or `jsdom` using `@testing-library/react`:
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import VoucherForm from '@/components/VoucherForm';

describe('<VoucherForm />', () => {
  it('disables submit button while submission is in flight', async () => {
    render(<VoucherForm onSubmit={mockSubmit} />);
    const submitBtn = screen.getByRole('button', { name: /simpan/i });
    fireEvent.click(submitBtn);
    expect(submitBtn).toBeDisabled();
  });
});
```

### Tier 4: E2E Smoke & Route Traversals
Verify all pre-rendered and dynamic routes respond with HTTP 200:
```typescript
import { describe, it, expect } from 'vitest';

const CORE_ROUTES = ['/', '/pelatihan', '/jadwal', '/skp-lisensi', '/artikel', '/hubungi-kami'];

describe('Smoke Route Integrity', () => {
  CORE_ROUTES.forEach(route => {
    it(`route ${route} compiles and serves status 200`, async () => {
      // route assertions or playwright navigation
    });
  });
});
```

---

## 📋 Verification Checklist Before Claiming Done

1. [ ] **Execution Evidence**: Never declare tests pass without running `npm test` and displaying the runner's exit code `0`.
2. [ ] **Zero Regressions**: All previous test suites pass alongside newly written tests.
3. [ ] **Zero Linter Warnings**: `npm run lint` completes with `0 problems (0 errors, 0 warnings)`.
4. [ ] **Production Build Check**: `npm run build` succeeds without bundle or type errors.
