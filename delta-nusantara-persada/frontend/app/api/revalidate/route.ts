import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')
  const path = request.nextUrl.searchParams.get('path')
  const tag = request.nextUrl.searchParams.get('tag')

  const expectedSecret = process.env.REVALIDATION_SECRET || 'dnp-secret-cache-key'

  if (secret !== expectedSecret) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  if (path) {
    revalidatePath(path)
    return NextResponse.json({ revalidated: true, path, now: Date.now() })
  }

  if (tag) {
    revalidateTag(tag)
    return NextResponse.json({ revalidated: true, tag, now: Date.now() })
  }

  return NextResponse.json({ message: 'Missing path or tag parameter' }, { status: 400 })
}
