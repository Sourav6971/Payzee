-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('pending', 'success', 'failed');

-- CreateEnum
CREATE TYPE "public"."Mode" AS ENUM ('phantom', 'other');

-- CreateTable
CREATE TABLE "public"."Merchant" (
    "id" TEXT NOT NULL,
    "publicKey" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "api_key" TEXT NOT NULL,
    "api_secret" TEXT NOT NULL,

    CONSTRAINT "Merchant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Project" (
    "id" TEXT NOT NULL,
    "publicKey" TEXT NOT NULL,
    "merchant_id" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Transaction" (
    "id" TEXT NOT NULL,
    "toKey" TEXT NOT NULL,
    "fromKey" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "txId" TEXT NOT NULL,
    "status" "public"."Status" NOT NULL DEFAULT 'pending',
    "merchant_id" TEXT NOT NULL,
    "mode" "public"."Mode" NOT NULL DEFAULT 'other',

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Merchant_publicKey_key" ON "public"."Merchant"("publicKey");

-- CreateIndex
CREATE UNIQUE INDEX "Merchant_api_key_key" ON "public"."Merchant"("api_key");

-- CreateIndex
CREATE UNIQUE INDEX "Merchant_api_secret_key" ON "public"."Merchant"("api_secret");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_txId_key" ON "public"."Transaction"("txId");

-- AddForeignKey
ALTER TABLE "public"."Project" ADD CONSTRAINT "Project_merchant_id_fkey" FOREIGN KEY ("merchant_id") REFERENCES "public"."Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Transaction" ADD CONSTRAINT "Transaction_merchant_id_fkey" FOREIGN KEY ("merchant_id") REFERENCES "public"."Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
