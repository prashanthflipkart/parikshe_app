import { load } from "cheerio";
import { db } from "../config/db";

type ScrapeTarget = {
  categoryId: string;
  url: string;
  productType: string;
  price: number;
};

const targets: ScrapeTarget[] = [
  { categoryId: "sslc", url: "https://www.parikshe.in/sslc/", productType: "full_year", price: 4999 },
  { categoryId: "puc_science", url: "https://www.parikshe.in/puc/", productType: "full_year", price: 6999 },
  { categoryId: "puc_commerce", url: "https://www.parikshe.in/puc-commerce/", productType: "full_year", price: 5999 }
];

const extractTitle = (html: string) => {
  const $ = load(html);
  const h1 = $("h1").first().text().trim();
  const title = h1 || $("title").text().trim();
  return title || "Parikshe Course";
};

export const scrapePariksheCourses = async () => {
  const results: Array<{
    categoryId: string;
    title: string;
    url: string;
    status: "created" | "updated" | "failed";
  }> = [];

  for (const target of targets) {
    try {
      const response = await fetch(target.url);
      const html = await response.text();
      const title = extractTitle(html);

      const existing = await db.query(
        `
          SELECT id FROM products
          WHERE category_id = $1 AND title = $2 AND source = 'parikshe_web'
          LIMIT 1
        `,
        [target.categoryId, title]
      );

      if (existing.rows[0]) {
        await db.query(
          `
            UPDATE products
            SET price = $1, last_synced_at = NOW()
            WHERE id = $2
          `,
          [target.price, existing.rows[0].id]
        );
        results.push({ categoryId: target.categoryId, title, url: target.url, status: "updated" });
        continue;
      }

      await db.query(
        `
          INSERT INTO products (id, category_id, title, type, duration_months, price, is_active, source, last_synced_at)
          VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, TRUE, 'parikshe_web', NOW())
        `,
        [target.categoryId, title, target.productType, 12, target.price]
      );

      results.push({ categoryId: target.categoryId, title, url: target.url, status: "created" });
    } catch {
      results.push({
        categoryId: target.categoryId,
        title: "Unknown",
        url: target.url,
        status: "failed"
      });
    }
  }

  return results;
};
