import { boolean, date, integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const hotelFeedback = pgTable('hotel_feedback', {
  id: uuid('id').defaultRandom().primaryKey(),
  guestName: text('guest_name').notNull(),
  email: text('email').notNull(),
  stayDate: date('stay_date').notNull(),
  roomNumber: text('room_number'),
  overallRating: integer('overall_rating').notNull(),
  cleanlinessRating: integer('cleanliness_rating').notNull(),
  serviceRating: integer('service_rating').notNull(),
  comfortRating: integer('comfort_rating').notNull(),
  comments: text('comments').notNull(),
  wouldRecommend: boolean('would_recommend').notNull().default(false),
  consent: boolean('consent').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})
