/*
  Warnings:

  - You are about to drop the column `fromKey` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `toKey` on the `Transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Transaction" DROP COLUMN "fromKey",
DROP COLUMN "toKey";
