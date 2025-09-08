/*
  Warnings:

  - A unique constraint covering the columns `[solanaAccount]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.
  - Made the column `solanaAccount` on table `Transaction` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Transaction" ALTER COLUMN "solanaAccount" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_solanaAccount_key" ON "public"."Transaction"("solanaAccount");
