-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "project_nest_auth";

-- CreateEnum
CREATE TYPE "project_nest_auth"."TestRole" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('KITCHEN', 'CUSTOMER', 'BAR', 'OWNER');

-- CreateTable
CREATE TABLE "project_nest_auth"."TestUser" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" "project_nest_auth"."TestRole" DEFAULT 'USER',

    CONSTRAINT "TestUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Cafe" (
    "id" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "phoneCode" TEXT NOT NULL DEFAULT '+48',

    CONSTRAINT "Cafe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CafeSchedule" (
    "id" TEXT NOT NULL,
    "dayOfWeek" INTEGER NOT NULL DEFAULT 0,
    "openTime" TIME(6) NOT NULL,
    "closeTime" TIME(6) NOT NULL,
    "cafeId" TEXT NOT NULL,

    CONSTRAINT "CafeSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CafeSpecialWorkingHours" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "openTime" TIME(6) NOT NULL,
    "closeTime" TIME(6) NOT NULL,
    "isClosed" BOOLEAN NOT NULL DEFAULT false,
    "cafeId" TEXT NOT NULL,

    CONSTRAINT "CafeSpecialWorkingHours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Category" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "cafeId" TEXT,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MenuItem" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "ingredients" TEXT NOT NULL,
    "categoryId" TEXT,
    "calories" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "MenuItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "role" "public"."UserRole" NOT NULL DEFAULT 'CUSTOMER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."customers" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "image_url" VARCHAR(255) NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."invoices" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "customer_id" UUID NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "date" DATE NOT NULL,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."revenue" (
    "month" VARCHAR(4) NOT NULL,
    "revenue" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "public"."users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TestUser_email_key" ON "project_nest_auth"."TestUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Cafe_tag_key" ON "public"."Cafe"("tag");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "revenue_month_key" ON "public"."revenue"("month");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- AddForeignKey
ALTER TABLE "public"."CafeSchedule" ADD CONSTRAINT "CafeSchedule_cafeId_fkey" FOREIGN KEY ("cafeId") REFERENCES "public"."Cafe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CafeSpecialWorkingHours" ADD CONSTRAINT "CafeSpecialWorkingHours_cafeId_fkey" FOREIGN KEY ("cafeId") REFERENCES "public"."Cafe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Category" ADD CONSTRAINT "Category_cafeId_fkey" FOREIGN KEY ("cafeId") REFERENCES "public"."Cafe"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MenuItem" ADD CONSTRAINT "MenuItem_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
