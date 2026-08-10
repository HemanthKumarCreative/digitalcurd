import { NextResponse } from 'next/server'
import { createClient } from '@sanity/client'
import { apiVersion, dataset, projectId } from '@/sanity/env'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, service, requirements } = body

    if (!name || !email || !service || !requirements) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const token = process.env.SANITY_API_WRITE_TOKEN
    
    if (!token) {
      console.error('Missing SANITY_API_WRITE_TOKEN environment variable')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    const client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      token,
    })

    const newInquiry = await client.create({
      _type: 'inquiry',
      name,
      email,
      service,
      requirements,
      status: 'new',
      submittedAt: new Date().toISOString(),
    })

    return NextResponse.json({ success: true, id: newInquiry._id })
  } catch (error) {
    console.error('Contact form submission error:', error)
    return NextResponse.json({ error: 'Failed to submit form' }, { status: 500 })
  }
}
