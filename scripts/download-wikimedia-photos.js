/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const items = [
  // 18 Destinations
  {
    slug: 'hoan-kiem-lake',
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/81/Hoan_Kiem_10082026.jpg/1280px-Hoan_Kiem_10082026.jpg',
    credit: 'Wikimedia Commons (CC-BY-SA)',
    sourceUrl: 'https://vi.wikipedia.org/wiki/H%E1%BB%93_Ho%C3%A0n_Ki%E1%BA%BFm',
  },
  {
    slug: 'temple-of-literature',
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/39/Hanoi_Temple_of_Literature_%28cropped%29.jpg/1280px-Hanoi_Temple_of_Literature_%28cropped%29.jpg',
    credit: 'Wikimedia Commons (CC-BY-SA)',
    sourceUrl: 'https://en.wikipedia.org/wiki/Temple_of_Literature,_Hanoi',
  },
  {
    slug: 'hanoi-old-quarter',
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/44/Hanoi%2C_Vietnam_%2812036443176%29.jpg/1280px-Hanoi%2C_Vietnam_%2812036443176%29.jpg',
    credit: 'Wikimedia Commons (CC-BY-SA)',
    sourceUrl: 'https://vi.wikipedia.org/wiki/Ph%E1%BB%91_c%E1%BB%95_H%C3%A0_N%E1%BB%99i',
  },
  {
    slug: 'west-lake',
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4a/H%E1%BB%93_T%C3%A2y_ho%C3%A0ng_h%C3%B4n_-_NKS.jpg/1280px-H%E1%BB%93_T%C3%A2y_ho%C3%A0ng_h%C3%B4n_-_NKS.jpg',
    credit: 'Nguyễn Kim Sơn / Wikimedia Commons (CC-BY-SA)',
    sourceUrl: 'https://vi.wikipedia.org/wiki/H%E1%BB%93_T%C3%A2y_(H%C3%A0_N%E1%BB%99i)',
  },
  {
    slug: 'imperial-citadel-of-thang-long',
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4a/Doan_Mon_Gate_2.jpg/1280px-Doan_Mon_Gate_2.jpg',
    credit: 'Wikimedia Commons (CC-BY-SA)',
    sourceUrl: 'https://vi.wikipedia.org/wiki/Ho%C3%A0ng_th%C3%A0nh_Th%C4%83ng_Long',
  },
  {
    slug: 'vietnam-museum-of-ethnology',
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6e/Tr%E1%BB%91ng_%C4%90%E1%BB%93ng_building%2C_Vietnam_Museum_of_Ethnology.jpg/1280px-Tr%E1%BB%91ng_%C4%90%E1%BB%93ng_building%2C_Vietnam_Museum_of_Ethnology.jpg',
    credit: 'Wikimedia Commons (CC-BY-SA)',
    sourceUrl: 'https://en.wikipedia.org/wiki/Vietnam_Museum_of_Ethnology',
  },
  {
    slug: 'ho-chi-minh-mausoleum',
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fd/L%C4%83ng_B%C3%A1c_-_NKS.jpg/1280px-L%C4%83ng_B%C3%A1c_-_NKS.jpg',
    credit: 'Nguyễn Kim Sơn / Wikimedia Commons (CC-BY-SA)',
    sourceUrl: 'https://vi.wikipedia.org/wiki/L%C4%83ng_Ch%E1%BB%A7_t%E1%BB%8Bch_H%E1%BB%93_Ch%C3%AD_Minh',
  },
  {
    slug: 'one-pillar-pagoda',
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5c/Hanoi%2C_Vietnam_%2812041825854%29.jpg/1280px-Hanoi%2C_Vietnam_%2812041825854%29.jpg',
    credit: 'Wikimedia Commons (CC-BY-SA)',
    sourceUrl: 'https://en.wikipedia.org/wiki/One_Pillar_Pagoda',
  },
  {
    slug: 'hoa-lo-prison',
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/95/HanoiHilton.jpg/1280px-HanoiHilton.jpg',
    credit: 'Wikimedia Commons (CC-BY-SA)',
    sourceUrl: 'https://en.wikipedia.org/wiki/H%E1%BB%8fa_L%C3%B2_Prison',
  },
  {
    slug: 'long-bien-bridge',
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/92/Long_Bi%C3%AAn_Bridge_-_panoramio.jpg/1280px-Long_Bi%C3%AAn_Bridge_-_panoramio.jpg',
    credit: 'Wikimedia Commons (CC-BY-SA)',
    sourceUrl: 'https://vi.wikipedia.org/wiki/C%E1%BA%A7u_Long_Bi%C3%AAn',
  },
  {
    slug: 'st-josephs-cathedral',
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/St._Joseph%27s_Cathedral_-_Hanoi%2C_Vietnam.jpg',
    credit: 'Wikimedia Commons (CC-BY-SA)',
    sourceUrl: 'https://en.wikipedia.org/wiki/St._Joseph%27s_Cathedral,_Hanoi',
  },
  {
    slug: 'hanoi-opera-house',
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/52/Hanoi_Opera_House%2C_24_December_2016.jpg/1280px-Hanoi_Opera_House%2C_24_December_2016.jpg',
    credit: 'Wikimedia Commons (CC-BY-SA)',
    sourceUrl: 'https://vi.wikipedia.org/wiki/Nh%C3%A0_h%C3%A1t_L%E1%BB%9Bn_H%C3%A0_N%E1%BB%99i',
  },
  {
    slug: 'tran-quoc-pagoda',
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8b/Tran_Quoc_Pagoda%2C_Hanoi%2C_Vietnam.jpg/1280px-Tran_Quoc_Pagoda%2C_Hanoi%2C_Vietnam.jpg',
    credit: 'Wikimedia Commons (CC-BY-SA)',
    sourceUrl: 'https://vi.wikipedia.org/wiki/Ch%C3%B9a_Tr%E1%BA%A5n_Qu%E1%BB%91c',
  },
  {
    slug: 'quan-thanh-temple',
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/67/Hanoi_-_Quan-Thanh-Tempel_0001.JPG',
    credit: 'Wikimedia Commons (CC-BY-SA)',
    sourceUrl: 'https://vi.wikipedia.org/wiki/%C4%90%E1%BB%81n_Qu%C3%A1n_Th%C3%A1nh',
  },
  {
    slug: 'van-phuc-silk-village',
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/L%E1%BB%A5aV%E1%BA%A1nPh%C3%BAc-2198867187_a0d4cdce3b_o.jpg',
    credit: 'Wikimedia Commons (CC-BY-SA)',
    sourceUrl: 'https://vi.wikipedia.org/wiki/L%C3%A0ng_l%E1%BB%A5a_V%E1%BA%A1n_Ph%C3%BAc',
  },
  {
    slug: 'quang-phu-cau-incense-village',
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/21/Incense_in_Vietnam.jpg/1280px-Incense_in_Vietnam.jpg',
    credit: 'Wikimedia Commons (CC-BY-SA)',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Incense_in_Vietnam.jpg',
  },
  {
    slug: 'duong-lam-ancient-village',
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8a/C%E1%BB%95ng_v%C3%A0o_l%C3%A0ng_c%E1%BB%95_%C4%90%C6%B0%E1%BB%9Dng_L%C3%A2m.jpg/1280px-C%E1%BB%95ng_v%C3%A0o_l%C3%A0ng_c%E1%BB%95_%C4%90%C6%B0%E1%BB%9Dng_L%C3%A2m.jpg',
    credit: 'Wikimedia Commons (CC-BY-SA)',
    sourceUrl: 'https://vi.wikipedia.org/wiki/%C4%90%C6%B0%E1%BB%9Dng_L%C3%A2m',
  },
  {
    slug: 'vietnam-national-museum-of-history',
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6a/Vietnam_National_Museum_of_History%2C_Hanoi%2C_Vietnam.jpg/1280px-Vietnam_National_Museum_of_History%2C_Hanoi%2C_Vietnam.jpg',
    credit: 'Wikimedia Commons (CC-BY-SA)',
    sourceUrl: 'https://vi.wikipedia.org/wiki/B%E1%BA%A3o_t%C3%A0ng_L%E1%BB%8Bch_s%E1%BB%AD_Qu%E1%BB%91c_gia_(Vi%E1%BB%87t_Nam)',
  },

  // 12 Foods
  {
    slug: 'pho',
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/99/Ph%E1%BB%9F_b%C3%B2%2C_C%E1%BA%A7u_Gi%E1%BA%A5y%2C_H%C3%A0_N%E1%BB%99i.jpg/1280px-Ph%E1%BB%9F_b%C3%B2%2C_C%E1%BA%A7u_Gi%E1%BA%A5y%2C_H%C3%A0_N%E1%BB%99i.jpg',
    credit: 'Wikimedia Commons (CC-BY-SA)',
    sourceUrl: 'https://vi.wikipedia.org/wiki/Ph%E1%BB%9F',
  },
  {
    slug: 'bun-cha',
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8b/B%C3%BAn_ch%E1%BA%A3_Th%E1%BB%A5y_Khu%C3%AA.jpg/1280px-B%C3%BAn_ch%E1%BA%A3_Th%E1%BB%A5y_Khu%C3%AA.jpg',
    credit: 'Wikimedia Commons (CC-BY-SA)',
    sourceUrl: 'https://vi.wikipedia.org/wiki/B%C3%BAn_ch%E1%BA%A3',
  },
  {
    slug: 'banh-cuon',
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a7/Banh_cuon.jpg/1280px-Banh_cuon.jpg',
    credit: 'Wikimedia Commons (CC-BY-SA)',
    sourceUrl: 'https://vi.wikipedia.org/wiki/B%C3%A1nh_cu%E1%BB%91n',
  },
  {
    slug: 'egg-coffee',
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/22/C%C3%A0_ph%C3%AA_tr%E1%BB%A9ng.jpg/1280px-C%C3%A0_ph%C3%AA_tr%E1%BB%A9ng.jpg',
    credit: 'Wikimedia Commons (CC-BY-SA)',
    sourceUrl: 'https://vi.wikipedia.org/wiki/C%C3%A0_ph%C3%AA_tr%E1%BB%A9ng',
  },
  {
    slug: 'com',
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c9/C%E1%BB%91m_M%E1%BB%85_Tr%C3%AC_-_NKS.jpg/1280px-C%E1%BB%91m_M%E1%BB%85_Tr%C3%AC_-_NKS.jpg',
    credit: 'Nguyễn Kim Sơn / Wikimedia Commons (CC-BY-SA)',
    sourceUrl: 'https://vi.wikipedia.org/wiki/C%E1%BB%91m',
  },
  {
    slug: 'cha-ca',
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b7/Ch%E1%BA%A3_c%C3%A1_L%C3%A3_V%E1%BB%8Dng_H%C3%A0_N%E1%BB%99i_th%C3%A1ng_2_n%C4%83m_2018_%281%29.jpg/1280px-Ch%E1%BA%A3_c%C3%A1_L%C3%A3_V%E1%BB%8Dng_H%C3%A0_N%E1%BB%99i_th%C3%A1ng_2_n%C4%83m_2018_%281%29.jpg',
    credit: 'Wikimedia Commons (CC-BY-SA)',
    sourceUrl: 'https://vi.wikipedia.org/wiki/Ch%E1%BA%A3_c%C3%A1_L%C3%A3_V%E1%BB%8Dng',
  },
  {
    slug: 'bun-thang',
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/64/B%C3%BAn_thang.JPG/1280px-B%C3%BAn_thang.JPG',
    credit: 'Wikimedia Commons (CC-BY-SA)',
    sourceUrl: 'https://vi.wikipedia.org/wiki/B%C3%BAn_thang',
  },
  {
    slug: 'cha-ruoi',
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e9/Cha_ruoi_2.JPG/1280px-Cha_ruoi_2.JPG',
    credit: 'Wikimedia Commons (CC-BY-SA)',
    sourceUrl: 'https://vi.wikipedia.org/wiki/Ch%E1%BA%A3_r%C6%B0%C6%A1i',
  },
  {
    slug: 'bun-dau-mam-tom',
    url: 'https://upload.wikimedia.org/wikipedia/commons/1/11/B%C3%BAn_%C4%91%E1%BA%ADu_m%E1%BA%AFm_t%C3%B4m_%282019%29.jpg',
    credit: 'Wikimedia Commons (CC-BY-SA)',
    sourceUrl: 'https://vi.wikipedia.org/wiki/B%C3%BAn_%C4%91%E1%BA%ADu_m%E1%BA%AFm_t%C3%B4m',
  },
  {
    slug: 'xoi-xeo',
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f9/X%C3%B4i_x%C3%A9o.jpg/1280px-X%C3%B4i_x%C3%A9o.jpg',
    credit: 'Wikimedia Commons (CC-BY-SA)',
    sourceUrl: 'https://vi.wikipedia.org/wiki/X%C3%B4i',
  },
  {
    slug: 'trang-tien-ice-cream',
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/38/Kem_Tr%C3%A0ng_Ti%E1%BB%81n%2C_Tr%C3%A0ng_Ti%E1%BB%81n%2C_H%C3%A0_N%E1%BB%99i_001.JPG/1280px-Kem_Tr%C3%A0ng_Ti%E1%BB%81n%2C_Tr%C3%A0ng_Ti%E1%BB%81n%2C_H%C3%A0_N%E1%BB%99i_001.JPG',
    credit: 'Wikimedia Commons (CC-BY-SA)',
    sourceUrl: 'https://vi.wikipedia.org/wiki/Kem_Tr%C3%A0ng_Ti%E1%BB%81n',
  },
  {
    slug: 'giang-cafe',
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/59/Giang_Caf%C3%A9_-_Nguyen_Huu_Huan_Street%2C_Hanoi%2C_Vietnam_-_DSC03675.JPG/1280px-Giang_Caf%C3%A9_-_Nguyen_Huu_Huan_Street%2C_Hanoi%2C_Vietnam_-_DSC03675.JPG',
    credit: 'Wikimedia Commons (CC-BY-SA)',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Giang_Caf%C3%A9_-_Nguyen_Huu_Huan_Street,_Hanoi,_Vietnam_-_DSC03675.JPG',
  },

  // 6 Culture
  {
    slug: 'water-puppetry',
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b3/Thang_Long_Water_Puppet_Theatre.jpg/1280px-Thang_Long_Water_Puppet_Theatre.jpg',
    credit: 'Wikimedia Commons (CC-BY-SA)',
    sourceUrl: 'https://vi.wikipedia.org/wiki/M%C3%BAa_r%E1%BB%91i_n%C6%B0%E1%BB%9Bc',
  },
  {
    slug: 'ca-tru',
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f3/Ca_tr%C3%B9_performance.jpg/1280px-Ca_tr%C3%B9_performance.jpg',
    credit: 'Wikimedia Commons (CC-BY-SA)',
    sourceUrl: 'https://vi.wikipedia.org/wiki/Ca_tr%C3%B9',
  },
  {
    slug: 'mid-autumn-festival',
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/71/Den_ong_sao.JPG/1280px-Den_ong_sao.JPG',
    credit: 'Wikimedia Commons (CC-BY-SA)',
    sourceUrl: 'https://vi.wikipedia.org/wiki/T%E1%BA%BFt_Trung_thu',
  },
  {
    slug: 'bat-trang-ceramics',
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/10/Bat-Trang-Ceramic-Village8.jpg/1280px-Bat-Trang-Ceramic-Village8.jpg',
    credit: 'Wikimedia Commons (CC-BY-SA)',
    sourceUrl: 'https://vi.wikipedia.org/wiki/L%C3%A0ng_g%E1%BB%91m_B%C3%A1t_Tr%C3%A0ng',
  },
  {
    slug: 'the-quintessence-of-tonkin',
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/29/Th%E1%BA%A7y_Temple_-_01.jpg/1280px-Th%E1%BA%A7y_Temple_-_01.jpg',
    credit: 'Wikimedia Commons (CC-BY-SA)',
    sourceUrl: 'https://vi.wikipedia.org/wiki/Ch%C3%B9a_Th%E1%BA%A7y',
  },
  {
    slug: 'huong-pagoda-festival',
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Ch%C3%B9a_H%C6%B0%C6%A1ng.jpg',
    credit: 'Wikimedia Commons (CC-BY-SA)',
    sourceUrl: 'https://vi.wikipedia.org/wiki/Ch%C3%B9a_H%C6%B0%C6%A1ng',
  },

  // Stories & Home
  {
    slug: 'morning-around-hoan-kiem',
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/81/Hoan_Kiem_10082026.jpg/1280px-Hoan_Kiem_10082026.jpg',
    credit: 'Wikimedia Commons (CC-BY-SA)',
    sourceUrl: 'https://vi.wikipedia.org/wiki/H%E1%BB%93_Ho%C3%A0n_Ki%E1%BA%BFm',
  },
  {
    slug: 'following-the-scent-of-com',
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c9/C%E1%BB%91m_M%E1%BB%85_Tr%C3%AC_-_NKS.jpg/1280px-C%E1%BB%91m_M%E1%BB%85_Tr%C3%AC_-_NKS.jpg',
    credit: 'Nguyễn Kim Sơn / Wikimedia Commons (CC-BY-SA)',
    sourceUrl: 'https://vi.wikipedia.org/wiki/C%E1%BB%91m',
  },
  {
    slug: 'walking-the-old-quarter',
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/44/Hanoi%2C_Vietnam_%2812036443176%29.jpg/1280px-Hanoi%2C_Vietnam_%2812036443176%29.jpg',
    credit: 'Wikimedia Commons (CC-BY-SA)',
    sourceUrl: 'https://vi.wikipedia.org/wiki/Ph%E1%BB%91_c%E1%BB%95_H%C3%A0_N%E1%BB%99i',
  },
  {
    slug: 'taste-of-hanoi',
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8b/B%C3%BAn_ch%E1%BA%A3_Th%E1%BB%A5y_Khu%C3%AA.jpg/1280px-B%C3%BAn_ch%E1%BA%A3_Th%E1%BB%A5y_Khu%C3%AA.jpg',
    credit: 'Wikimedia Commons (CC-BY-SA)',
    sourceUrl: 'https://vi.wikipedia.org/wiki/B%C3%BAn_ch%E1%BA%A3',
  },
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    function get(currentUrl, redirectCount = 0) {
      if (redirectCount > 5) return reject(new Error('Too many redirects'));
      const parsed = new URL(currentUrl);
      const client = parsed.protocol === 'https:' ? https : http;
      const req = client.get(
        currentUrl,
        {
          headers: {
            'User-Agent': 'HanoiDiscovery/1.0 (https://hanoidiscovery.vn; dev@hanoidiscovery.vn)',
          },
        },
        (res) => {
          if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            let nextUrl = res.headers.location;
            if (nextUrl.startsWith('/')) nextUrl = parsed.origin + nextUrl;
            return get(nextUrl, redirectCount + 1);
          }
          if (res.statusCode !== 200) {
            return reject(new Error(`Failed with status ${res.statusCode}: ${currentUrl}`));
          }
          const file = fs.createWriteStream(dest);
          res.pipe(file);
          file.on('finish', () => file.close(resolve));
          file.on('error', (err) => {
            fs.unlink(dest, () => reject(err));
          });
        }
      );
      req.on('error', reject);
    }
    get(url);
  });
}

async function main() {
  const imagesDir = path.join(__dirname, '..', 'public', 'images');
  if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });

  console.log(`Starting authentic image sync for ${items.length} items from Wikimedia Commons...`);

  for (const item of items) {
    const ext = '.jpg';
    const filename = `${item.slug}${ext}`;
    const dest = path.join(imagesDir, filename);

    try {
      await download(item.url, dest);
      const stats = fs.statSync(dest);
      console.log(`[OK] ${item.slug} -> ${(stats.size / 1024).toFixed(1)} KB`);
    } catch (err) {
      console.error(`[FAIL] ${item.slug}:`, err.message);
    }
  }

  // Update src/lib/local-photos.ts
  const photoEntries = {};
  for (const item of items) {
    photoEntries[item.slug] = {
      src: `/images/${item.slug}.jpg`,
      credit: item.credit,
      license: 'Creative Commons (CC-BY-SA / Public Domain)',
      sourceUrl: item.sourceUrl,
    };
  }

  const localPhotosContent = `export interface LocalPhoto {
  src: string;
  credit: string;
  license: string;
  sourceUrl: string;
}

export const localPhotos: Record<string, LocalPhoto> = ${JSON.stringify(photoEntries, null, 2)};

export function getLocalPhoto(slugOrKey?: string): LocalPhoto | undefined {
  if (!slugOrKey) return undefined;
  return localPhotos[slugOrKey];
}
`;

  const localPhotosPath = path.join(__dirname, '..', 'src', 'lib', 'local-photos.ts');
  fs.writeFileSync(localPhotosPath, localPhotosContent, 'utf-8');
  console.log(`Updated local-photos.ts with authentic Wikimedia Commons credits!`);
}

main().catch(console.error);
