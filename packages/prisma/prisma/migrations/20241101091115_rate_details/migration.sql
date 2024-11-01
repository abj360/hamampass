/*
  Warnings:

  - A unique constraint covering the columns `[detailsId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "detailsId" TEXT;

-- CreateTable
CREATE TABLE "Review_Details" (
    "id" TEXT NOT NULL,
    "location" INTEGER NOT NULL,
    "staff" INTEGER NOT NULL,
    "atmosphere" INTEGER NOT NULL,
    "cleanliness" INTEGER NOT NULL,
    "facilities" INTEGER NOT NULL,
    "value_for_money" INTEGER NOT NULL,

    CONSTRAINT "Review_Details_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Review_detailsId_key" ON "Review"("detailsId");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_detailsId_fkey" FOREIGN KEY ("detailsId") REFERENCES "Review_Details"("id") ON DELETE CASCADE ON UPDATE CASCADE;
