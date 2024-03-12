import os

import pandas as pd
import psycopg2
from sqlalchemy import create_engine

db_url = os.environ.get("DATABASE_URL")
if db_url:
    print("Connecting to database:", db_url)
    # Use the database connection string as needed
else:
    print("Database URL not found in environment variables.")

engine = create_engine("sqlite:///./microservice/sample.db")
postgres = create_engine(db_url)
conn = psycopg2.connect(db_url)
# postgres = create_engine("postgresql://postgres:postgres@localhost:5432/testDB")
# conn = psycopg2.connect("postgres://postgres:postgres@localhost/testDB")

df = pd.read_sql("select * from mpn", con=engine)
df_target = pd.read_sql("select * from target", con=engine)
# df = pd.read_parquet("trms_dataset.parquet")

delete_db = """DROP TABLE IF EXISTS "mpn" CASCADE;"""
delete_target = """DROP TABLE IF EXISTS "target" CASCADE;"""

create_db = """
CREATE TABLE IF NOT EXISTS "mpn" (
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
    "seksi" VARCHAR(255),
    "segmentasi_wp" VARCHAR(255),
    "jenis_wp" VARCHAR(255),
    "nama_klu" TEXT,
    "kd_kategori" VARCHAR(5),
    "nm_kategori" TEXT,
    "nm_golpok" TEXT,
    "map" VARCHAR(255),
    "npwp15" VARCHAR(255),
    "nama_wp" TEXT,
    "nama_ar" TEXT,
    "ntpn" VARCHAR(255),
    "id" SERIAL PRIMARY KEY
);

"""
create_target = """
CREATE TABLE IF NOT EXISTS "target" (
  "id" SERIAL  PRIMARY KEY,
  "admin" VARCHAR(255) ,
  "nama_kpp" VARCHAR(255),
  "target" BIGINT,
  "target_internal" BIGINT,
  "target_py" BIGINT
)
"""

with conn.cursor() as cur:
    cur.execute(delete_db)
    print("delete_db")
    cur.execute(create_db)
    print("create_db")

    cur.execute(delete_target)
    print("delete_target")
    cur.execute(create_target)
    print("create_target")
    conn.commit()

df.to_sql(
    "mpn",
    con=postgres,
    index=False,
    if_exists="append",
)
print("Populate data MPN:DONE")
df_target.to_sql(
    "target",
    con=postgres,
    index=False,
    if_exists="append",
)
print("Populate data target:DONE")
print("Populate data DONE")
