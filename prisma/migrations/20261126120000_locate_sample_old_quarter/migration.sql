-- Representative coordinates for Hanoi Old Quarter from Circular 10/2022/TT-BTNMT.
-- Only fill missing coordinates on the seeded entry, leaving custom locations intact.
UPDATE "Destination"
SET "latitude" = 21.034722,
    "longitude" = 105.846111,
    "sourceUrl" = 'https://datafiles.chinhphu.vn/cpp/files/vbpq/2022/10/10-btnmt.pdf',
    "updatedAt" = CURRENT_TIMESTAMP
WHERE "slug" = 'hanoi-old-quarter'
    AND "isSample" = TRUE
    AND "latitude" IS NULL
    AND "longitude" IS NULL
    AND ("sourceUrl" IS NULL OR "sourceUrl" = 'https://hanoi.gov.vn');
