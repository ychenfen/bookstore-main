# 网上书城系统

一个基于 React、tRPC、Express、Drizzle ORM 和 MySQL 的网上书城系统。项目包含用户端购书流程、个人中心、订单管理，以及管理员后台的图书、分类、订单和统计管理功能。

## 功能概览

- 用户端：首页、图书列表、图书详情、购物车、结算、订单列表、订单详情、个人中心
- 管理端：数据概览、图书管理、分类管理、订单状态管理
- 订单流程：购物车下单、库存校验、订单取消、订单状态流转
- 权限控制：普通用户和管理员角色区分
- 数据持久化：MySQL + Drizzle ORM schema/migration
- 工程化：Vite、React、TypeScript、tRPC、Vitest、pnpm

## 技术栈

- Frontend: React 19, TypeScript, Vite, Wouter, TanStack Query, Radix UI, Tailwind CSS
- Backend: Express, tRPC, Zod
- Database: MySQL, Drizzle ORM
- Tooling: pnpm, Vitest, esbuild

## 目录结构

```text
client/          前端应用源码
server/          后端服务、tRPC 路由、数据库访问逻辑
shared/          前后端共享类型和常量
drizzle/         数据库 schema、relations 和迁移文件
patches/         pnpm patched dependencies
scripts/         辅助脚本
thesis_assets/   论文、截图、图表等项目交付素材
output/          演示视频、导出文档和渲染结果
```

## 环境要求

- Node.js 20+
- pnpm 10+
- MySQL 8+

## 本地运行

1. 安装依赖

```bash
pnpm install
```

2. 配置环境变量

```bash
cp .env.example .env
```

填写 `.env`：

```env
DATABASE_URL=mysql://USER:PASSWORD@HOST:PORT/DATABASE
JWT_SECRET=replace-with-a-random-secret
VITE_APP_ID=your-app-id
OWNER_OPEN_ID=admin-user-open-id
OAUTH_SERVER_URL=
```

`OWNER_OPEN_ID` 对应的用户首次登录或同步后会拥有管理员权限。

3. 初始化数据库

```bash
pnpm db:push
```

如需演示数据，可参考：

```text
thesis_assets/demo_seed.sql
```

4. 启动开发环境

```bash
pnpm dev
```

默认服务会由后端入口启动，并挂载前端 Vite 开发服务。启动后按终端提示访问本地地址。

## 常用命令

```bash
pnpm dev       # 开发环境
pnpm build     # 构建前后端
pnpm start     # 运行构建后的生产服务
pnpm check     # TypeScript 类型检查
pnpm test      # 单元/集成测试
pnpm format    # 格式化代码
pnpm db:push   # 生成并执行数据库迁移
```

## 数据库模型

核心表包括：

- `users`: 用户与角色信息
- `categories`: 图书分类
- `books`: 图书信息、价格、库存、上下架状态
- `cart_items`: 购物车明细
- `orders`: 订单主表
- `order_items`: 订单商品明细

数据库结构定义见 `drizzle/schema.ts`。

## 测试与交付素材

仓库包含完整项目源码，以及论文、截图、演示视频、测试相关输出等交付素材。依赖目录、构建缓存和本机环境变量未纳入版本控制。

未提交内容包括：

- `node_modules/`
- `dist/`
- `tmp/`
- `.env`
- 本机日志和缓存目录

这些内容可通过 `pnpm install`、`pnpm build` 和本地环境配置重新生成。

## License

MIT
