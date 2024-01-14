import pandas as pd
import psycopg2
from sqlalchemy import create_engine

engine = create_engine("sqlite:///./sample.db")
postgres = create_engine("postgresql://postgres:postgres@localhost:5432/testDB")
conn = psycopg2.connect("postgres://postgres:postgres@localhost/testDB")

df = pd.read_sql("select * from mpn", con=engine)

delete_db = """DROP TABLE "mpn" CASCADE;"""

create_db = """
CREATE TABLE IF NOT EXISTS "mpn" (
"admin" TEXT,
  "kdmap" TEXT,
  "kdbayar" TEXT,
  "masa" TEXT,
  "masa2" TEXT,
  "tahun" TEXT,
  "tanggalbayar" INTEGER,
  "bulanbayar" INTEGER,
  "tahunbayar" INTEGER,
  "datebayar" timestamp,
  "nominal" REAL,
  "ket" TEXT,
  "seksi" TEXT,
  "segmentasi_wp" TEXT,
  "jenis_wp" TEXT,
  "nama_klu" TEXT,
  "kd_kategori" TEXT,
  "nm_kategori" TEXT,
  "nm_golpok" TEXT,
  "map" TEXT,
  "npwp15" TEXT,
  "nama_wp" TEXT,
  "nama_ar" TEXT,
  "ntpn" TEXT,
  "id" INTEGER PRIMARY KEY
)
"""

with conn.cursor() as cur:
    cur.execute(delete_db)
    print("delete_db")
    cur.execute(create_db)
    conn.commit()

df.to_sql(
    "mpn",
    con=postgres,
    index=False,
    if_exists="append",
)
print("Populate data DONE")
