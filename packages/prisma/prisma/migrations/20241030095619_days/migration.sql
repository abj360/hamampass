-- CreateTable
CREATE TABLE "Days" (
    "id" SERIAL NOT NULL,
    "propertyId" TEXT NOT NULL,
    "dayIndex" INTEGER NOT NULL,
    "sex" INTEGER NOT NULL,
    "open" TEXT NOT NULL,
    "close" TEXT NOT NULL,

    CONSTRAINT "Days_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Days_propertyId_dayIndex_key" ON "Days"("propertyId", "dayIndex");

-- AddForeignKey
ALTER TABLE "Days" ADD CONSTRAINT "Days_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
