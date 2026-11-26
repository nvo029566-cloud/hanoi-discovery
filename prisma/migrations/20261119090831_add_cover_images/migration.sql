-- AlterTable
ALTER TABLE "CultureItem" ADD COLUMN     "imageId" TEXT;

-- AlterTable
ALTER TABLE "Destination" ADD COLUMN     "imageId" TEXT;

-- AlterTable
ALTER TABLE "Food" ADD COLUMN     "imageId" TEXT;

-- AlterTable
ALTER TABLE "Story" ADD COLUMN     "imageId" TEXT;

-- CreateIndex
CREATE INDEX "CultureItem_imageId_idx" ON "CultureItem"("imageId");

-- CreateIndex
CREATE INDEX "Destination_imageId_idx" ON "Destination"("imageId");

-- CreateIndex
CREATE INDEX "Food_imageId_idx" ON "Food"("imageId");

-- CreateIndex
CREATE INDEX "Story_imageId_idx" ON "Story"("imageId");

-- AddForeignKey
ALTER TABLE "Destination" ADD CONSTRAINT "Destination_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "MediaAsset"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Food" ADD CONSTRAINT "Food_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "MediaAsset"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CultureItem" ADD CONSTRAINT "CultureItem_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "MediaAsset"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Story" ADD CONSTRAINT "Story_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "MediaAsset"("id") ON DELETE SET NULL ON UPDATE CASCADE;
