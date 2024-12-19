-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "roomName" TEXT NOT NULL,
    "bookedBy" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);
