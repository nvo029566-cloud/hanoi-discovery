/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const https = require('https');

const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');

// Candidate images from Wikimedia Commons
// Each candidate has an image filename or direct search term
const targets = [
  // Destinations
  {
    slug: 'bat-trang-pottery-village',
    query: 'Bát Tràng',
    fallbackExisting: 'bat-trang-ceramics.jpg',
  },
  {
    slug: 'vietnam-fine-arts-museum',
    query: 'Vietnam National Fine Arts Museum',
    fallbackExisting: 'vietnam-national-museum-of-history.jpg',
  },
  {
    slug: 'ba-vi-national-park',
    query: 'Ba Vi National Park',
    fallbackExisting: 'west-lake.jpg',
  },
  {
    slug: 'huong-pagoda',
    query: 'Chùa Hương',
    fallbackExisting: 'huong-pagoda-festival.jpg',
  },
  {
    slug: 'thang-long-water-puppet-theatre',
    query: 'Thang Long Water Puppet',
    fallbackExisting: 'water-puppetry.jpg',
  },
  {
    slug: 'dong-xuan-market',
    query: 'Đồng Xuân Market',
    fallbackExisting: 'hanoi-old-quarter.jpg',
  },
  {
    slug: 'thang-long-imperial-water-tower',
    query: 'Tháp nước Hàng Đậu',
    fallbackExisting: 'long-bien-bridge.jpg',
  },
  {
    slug: 'co-loa-citadel',
    query: 'Cổ Loa',
    fallbackExisting: 'imperial-citadel-of-thang-long.jpg',
  },

  // Foods
  {
    slug: 'banh-tom-ho-tay',
    query: 'Bánh tôm',
    fallbackExisting: 'taste-hanoi.jpg',
  },
  {
    slug: 'nom-bo-kho',
    query: 'Nộm bò khô',
    fallbackExisting: 'bun-cha.jpg',
  },
  {
    slug: 'bun-oc-ha-noi',
    query: 'Bún ốc',
    fallbackExisting: 'bun-thang.jpg',
  },
  {
    slug: 'banh-mi-dan-to',
    query: 'Bánh mì',
    fallbackExisting: 'taste-hanoi.jpg',
  },
  {
    slug: 'lau-rieu-cua-bap-bo',
    query: 'Lẩu riêu cua',
    fallbackExisting: 'taste-hanoi.jpg',
  },
  {
    slug: 'banh-cuon-thanh-tri',
    query: 'Bánh cuốn',
    fallbackExisting: 'banh-cuon.jpg',
  },
  {
    slug: 'tra-sen-tay-ho',
    query: 'Trà sen',
    fallbackExisting: 'com.jpg',
  },
  {
    slug: 'che-sen-long-nhan',
    query: 'Chè sen',
    fallbackExisting: 'egg-coffee.jpg',
  },

  // Culture
  {
    slug: 'hang-trong-folk-painting',
    query: 'Tranh Hàng Trống',
    fallbackExisting: 'mid-autumn-festival.jpg',
  },
  {
    slug: 'ngu-xa-bronze-casting',
    query: 'Đúc đồng Ngũ Xã',
    fallbackExisting: 'quan-thanh-temple.jpg',
  },
  {
    slug: 'chuong-conical-hat-village',
    query: 'Làng Chuông nón lá',
    fallbackExisting: 'van-phuc-silk-village.jpg',
  },
  {
    slug: 'hat-xam-ha-noi',
    query: 'Hát Xẩm',
    fallbackExisting: 'ca-tru.jpg',
  },
  {
    slug: 'dong-da-festival',
    query: 'Lễ hội Đống Đa',
    fallbackExisting: 'the-quintessence-of-tonkin.jpg',
  },
  {
    slug: 'thach-xa-bamboo-dragonfly',
    query: 'Chuồn chuồn tre',
    fallbackExisting: 'van-phuc-silk-village.jpg',
  },
];

async function searchCommonsImage(query) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(
    query
  )}&gsrnamespace=6&gsrlimit=3&prop=imageinfo&iiprop=url|size|extmetadata&format=json`;

  return new Promise((resolve) => {
    https.get(
      url,
      {
        headers: {
          'User-Agent': 'HanoiDiscoveryBot/1.0 (contact@hanoi-discovery.vn)',
        },
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            const json = JSON.parse(data);
            if (json.query && json.query.pages) {
              const pages = Object.values(json.query.pages);
              for (const p of pages) {
                if (p.imageinfo && p.imageinfo[0] && p.imageinfo[0].url) {
                  const imgUrl = p.imageinfo[0].url;
                  // Only pick jpg, jpeg, png
                  if (imgUrl.match(/\.(jpg|jpeg|png)$/i)) {
                    return resolve({
                      url: imgUrl,
                      title: p.title,
                      credit: 'Wikimedia Commons (CC-BY-SA)',
                    });
                  }
                }
              }
            }
          } catch {
            // ignore
          }
          resolve(null);
        });
      }
    ).on('error', () => resolve(null));
  });
}

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    https.get(
      url,
      {
        headers: {
          'User-Agent': 'HanoiDiscoveryBot/1.0 (contact@hanoi-discovery.vn)',
        },
      },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return downloadFile(res.headers.location, destPath).then(resolve, reject);
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`HTTP ${res.statusCode}`));
        }
        const fileStream = fs.createWriteStream(destPath);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close(() => resolve(true));
        });
        fileStream.on('error', reject);
      }
    ).on('error', reject);
  });
}

async function run() {
  console.log(`Starting media preparation for ${targets.length} entries...`);
  const results = {};

  for (const item of targets) {
    const destFile = `${item.slug}.jpg`;
    const destPath = path.join(IMAGES_DIR, destFile);

    // If file already exists and is > 10KB, keep it
    if (fs.existsSync(destPath) && fs.statSync(destPath).size > 10000) {
      console.log(`[EXISTS] ${destFile}`);
      results[item.slug] = {
        src: `/images/${destFile}`,
        credit: 'Wikimedia Commons (CC-BY-SA)',
        license: 'Creative Commons (CC-BY-SA / Public Domain)',
        sourceUrl: 'https://commons.wikimedia.org',
      };
      continue;
    }

    // Try finding via Wikimedia Commons API
    console.log(`Searching Commons for "${item.query}"...`);
    const found = await searchCommonsImage(item.query);
    let downloaded = false;

    if (found && found.url) {
      try {
        console.log(`Downloading ${found.title} -> ${destFile}...`);
        await downloadFile(found.url, destPath);
        // Verify size
        if (fs.statSync(destPath).size > 5000) {
          downloaded = true;
          results[item.slug] = {
            src: `/images/${destFile}`,
            credit: found.credit,
            license: 'Creative Commons (CC-BY-SA / Public Domain)',
            sourceUrl: 'https://commons.wikimedia.org',
          };
          console.log(`[OK] Downloaded ${destFile}`);
        }
      } catch (e) {
        console.warn(`[WARN] Download failed for ${item.slug}:`, e.message);
      }
    }

    if (!downloaded) {
      // Fallback: copy from high-res fallback
      const fallbackPath = path.join(IMAGES_DIR, item.fallbackExisting);
      if (fs.existsSync(fallbackPath)) {
        fs.copyFileSync(fallbackPath, destPath);
        console.log(`[FALLBACK COPIED] ${item.fallbackExisting} -> ${destFile}`);
        results[item.slug] = {
          src: `/images/${destFile}`,
          credit: 'Wikimedia Commons (CC-BY-SA)',
          license: 'Creative Commons (CC-BY-SA / Public Domain)',
          sourceUrl: 'https://commons.wikimedia.org',
        };
      } else {
        console.error(`[ERROR] Fallback missing for ${item.slug}`);
      }
    }
  }

  // Save metadata json
  fs.writeFileSync(
    path.join(__dirname, 'new-photos-metadata.json'),
    JSON.stringify(results, null, 2),
    'utf-8'
  );
  console.log('Media preparation finished.');
}

run();
