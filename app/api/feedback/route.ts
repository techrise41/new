import { NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'
import { hotelFeedback } from '@/lib/db/schema'

const feedbackSchema = z.object({
  guestName: z.string().trim().min(2).max(100),
  email: z.string().email().max(254),
  stayDate: z.string().date(),
  roomNumber: z.string().trim().max(20).optional().or(z.literal('')),
  overallRating: z.number().int().min(1).max(5),
  cleanlinessRating: z.number().int().min(1).max(5),
  serviceRating: z.number().int().min(1).max(5),
  comfortRating: z.number().int().min(1).max(5),
  comments: z.string().trim().min(10).max(3000),
  wouldRecommend: z.boolean(),
  consent: z.literal(true),
})

export async function POST(request: Request) {
  try {
    const payload = feedbackSchema.parse(await request.json())
    await db.insert(hotelFeedback).values({
      guestName: payload.guestName,
      email: payload.email,
      stayDate: payload.stayDate,
      roomNumber: payload.roomNumber || null,
      overallRating: payload.overallRating,
      cleanlinessRating: payload.cleanlinessRating,
      serviceRating: payload.serviceRating,
      comfortRating: payload.comfortRating,
      comments: payload.comments,
      wouldRecommend: payload.wouldRecommend,
      consent: payload.consent,
    })
    return NextResponse.json({ ok: true }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: 'Please check the information you entered.' }, { status: 400 })
    console.error('[v0] Feedback submission failed:', error)
    return NextResponse.json({ error: 'Unable to save feedback.' }, { status: 500 })
  }
}
