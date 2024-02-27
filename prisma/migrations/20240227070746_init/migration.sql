-- CreateTable
CREATE TABLE "target" (
    "id" SERIAL NOT NULL,
    "admin" VARCHAR(255),
    "nama_kpp" VARCHAR(255),
    "target" BIGINT,
    "target_internal" BIGINT,
    "target_py" BIGINT,

    CONSTRAINT "target_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mpn" (
    "admin" VARCHAR(3),
    "kdmap" VARCHAR(6),
    "kdbayar" VARCHAR(6),
    "masa" VARCHAR(2),
    "masa2" VARCHAR(2),
    "tahun" VARCHAR(4),
    "tanggalbayar" INTEGER,
    "bulanbayar" INTEGER,
    "tahunbayar" INTEGER,
    "datebayar" DATE,
    "nominal" REAL,
    "ket" VARCHAR(255),
    "segmentasi_wp" VARCHAR(255),
    "jenis_wp" TEXT,
    "nama_klu" TEXT,
    "kd_kategori" VARCHAR(5),
    "nm_kategori" TEXT,
    "nm_golpok" TEXT,
    "map" VARCHAR(255),
    "npwp15" VARCHAR(255),
    "nama_wp" TEXT,
    "nama_ar" TEXT,
    "ntpn" VARCHAR(255),
    "id" SERIAL NOT NULL,

    CONSTRAINT "mpn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
