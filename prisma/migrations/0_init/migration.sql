-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "project_nest_auth";

-- CreateEnum
CREATE TYPE "project_nest_auth"."TestRole" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "project_nest_auth"."TestUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "project_nest_auth"."TestRole" NOT NULL DEFAULT 'USER',

    CONSTRAINT "TestUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TestUser_email_key" ON "project_nest_auth"."TestUser"("email");

