-- CreateEnum
CREATE TYPE "FeedStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "scheduled_feeds" (
    "id" SERIAL NOT NULL,
    "feed_name" TEXT NOT NULL,
    "content" TEXT,
    "image" TEXT,
    "tags" JSONB,
    "schedule_time" TIMESTAMP(3),
    "status" "FeedStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "scheduled_feeds_pkey" PRIMARY KEY ("id")
);
