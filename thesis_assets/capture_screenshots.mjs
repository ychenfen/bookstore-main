import { chromium } from "playwright";
import { SignJWT } from "jose";
import fs from "node:fs/promises";
import path from "node:path";

const baseUrl = process.env.BASE_URL || "http://127.0.0.1:3000";
const outputDir = path.resolve(process.env.OUTPUT_DIR || "thesis_assets/screenshots");
const appId = process.env.VITE_APP_ID || "bookstore-demo";
const jwtSecret = process.env.JWT_SECRET || "bookstore-secret";

const cookieName = "app_session_id";

async function createSession(openId, name) {
  const secretKey = new TextEncoder().encode(jwtSecret);
  return new SignJWT({ openId, appId, name })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(Math.floor((Date.now() + 7 * 24 * 60 * 60 * 1000) / 1000))
    .sign(secretKey);
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function capture(page, url, fileName, options = {}) {
  console.log(`Capturing ${fileName} -> ${url}`);
  await page.goto(`${baseUrl}${url}`, { waitUntil: "load" });
  await page.waitForLoadState("networkidle", { timeout: 3000 }).catch(() => {});
  if (options.waitForSelector) {
    await page.waitForSelector(options.waitForSelector, { timeout: 15000 });
  }
  if (options.beforeShot) {
    await options.beforeShot(page);
    await page.waitForLoadState("networkidle", { timeout: 3000 }).catch(() => {});
    await page.waitForTimeout(400);
  }
  await page.waitForTimeout(800);
  await page.screenshot({
    path: path.join(outputDir, fileName),
    fullPage: options.fullPage ?? false,
  });
}

async function createContext(browser, session) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1024 },
    deviceScaleFactor: 1.5,
  });

  if (session) {
    await context.addCookies([
      {
        name: cookieName,
        value: session,
        url: baseUrl,
        httpOnly: false,
        sameSite: "Lax",
      },
    ]);
  }

  return context;
}

async function main() {
  await ensureDir(outputDir);

  const browser = await chromium.launch({ headless: true });
  const userSession = await createSession("demo-user", "演示用户");
  const adminSession = await createSession("demo-admin", "系统管理员");

  const publicContext = await createContext(browser);
  const userContext = await createContext(browser, userSession);
  const adminContext = await createContext(browser, adminSession);

  const publicPage = await publicContext.newPage();
  const userPage = await userContext.newPage();
  const adminPage = await adminContext.newPage();

  await capture(publicPage, "/", "01-home.png");
  await capture(publicPage, "/books", "02-book-list.png");
  await capture(publicPage, "/books/1", "03-book-detail.png", {
    waitForSelector: "text=内容简介",
  });

  await capture(userPage, "/cart", "04-user-cart.png", {
    waitForSelector: "text=订单摘要",
  });
  await capture(userPage, "/checkout", "05-user-checkout.png", {
    waitForSelector: "text=收货信息",
  });
  await capture(userPage, "/orders", "06-user-orders.png", {
    waitForSelector: "text=我的订单",
  });
  await capture(userPage, "/orders/1", "07-user-order-detail.png", {
    waitForSelector: "text=订单详情",
  });
  await capture(userPage, "/profile", "08-user-profile.png", {
    waitForSelector: "text=最近订单",
  });

  await capture(adminPage, "/admin", "09-admin-dashboard.png", {
    waitForSelector: "text=管理后台",
  });
  await capture(adminPage, "/admin", "10-admin-books.png", {
    waitForSelector: "text=管理后台",
    beforeShot: async (page) => {
      await page.getByRole("tab", { name: "书籍管理" }).click();
    },
  });
  await capture(adminPage, "/admin", "11-admin-categories.png", {
    waitForSelector: "text=管理后台",
    beforeShot: async (page) => {
      await page.getByRole("tab", { name: "分类管理" }).click();
    },
  });
  await capture(adminPage, "/admin", "12-admin-orders.png", {
    waitForSelector: "text=管理后台",
    beforeShot: async (page) => {
      await page.getByRole("tab", { name: "订单管理" }).click();
    },
  });

  await Promise.all([
    publicContext.close(),
    userContext.close(),
    adminContext.close(),
  ]);
  await browser.close();

  console.log(`Screenshots exported to ${outputDir}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
