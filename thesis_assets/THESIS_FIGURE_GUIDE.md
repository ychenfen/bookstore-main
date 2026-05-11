# 论文插图与截图使用说明

这个目录下的素材已经按“用户端截图 / 管理端截图 / 结构图 / 流程图”分好类，可以直接用于毕业论文和答辩 PPT。

## 1. 系统截图清单

### 用户端界面

| 文件名 | 推荐图题 | 建议放置章节 |
| --- | --- | --- |
| `screenshots/01-home.png` | 图4-1 系统首页界面 | 系统实现 / 用户端界面实现 |
| `screenshots/02-book-list.png` | 图4-2 图书列表与检索界面 | 系统实现 / 图书浏览模块 |
| `screenshots/03-book-detail.png` | 图4-3 图书详情界面 | 系统实现 / 图书详情与加购功能 |
| `screenshots/04-user-cart.png` | 图4-4 购物车管理界面 | 系统实现 / 购物车模块 |
| `screenshots/05-user-checkout.png` | 图4-5 订单结算界面 | 系统实现 / 订单提交模块 |
| `screenshots/06-user-orders.png` | 图4-6 用户订单列表界面 | 系统实现 / 订单查询模块 |
| `screenshots/07-user-order-detail.png` | 图4-7 订单详情界面 | 系统实现 / 订单详情模块 |
| `screenshots/08-user-profile.png` | 图4-8 个人中心界面 | 系统实现 / 个人中心模块 |

### 管理员端界面

| 文件名 | 推荐图题 | 建议放置章节 |
| --- | --- | --- |
| `screenshots/09-admin-dashboard.png` | 图4-9 管理后台首页 | 系统实现 / 管理员端界面实现 |
| `screenshots/10-admin-books.png` | 图4-10 书籍管理界面 | 系统实现 / 后台书籍管理 |
| `screenshots/11-admin-categories.png` | 图4-11 分类管理界面 | 系统实现 / 后台分类管理 |
| `screenshots/12-admin-orders.png` | 图4-12 订单管理界面 | 系统实现 / 后台订单管理 |

## 2. 结构图与流程图

| 文件名 | 推荐图题 | 用途 |
| --- | --- | --- |
| `diagrams/system_architecture_diagram.png` | 图3-1 系统总体架构图 | 说明浏览器、前端、后端、数据库之间的整体关系 |
| `diagrams/database_er_diagram.png` | 图3-2 数据库 E-R 关系图 | 说明核心数据表及其主外键关系 |
| `diagrams/ui_page_structure.png` | 图3-3 系统 UI 页面关系图 | 说明前端页面之间的导航关系 |
| `diagrams/role_module_diagram.png` | 图3-4 系统角色与功能模块图 | 说明普通用户与管理员的权限边界 |
| `diagrams/user_purchase_flow.png` | 图3-5 用户购书业务流程图 | 说明浏览、加购、下单、支付的完整链路 |
| `diagrams/admin_crud_flow.png` | 图3-6 管理员 CRUD 管理流程图 | 说明后台增删改查与订单状态管理闭环 |

## 3. 推荐插图顺序

如果你论文采用“第3章系统设计 + 第4章系统实现”的结构，可以直接按下面顺序插图：

1. 第3章先放 `system_architecture_diagram.png`
2. 再放 `database_er_diagram.png`
3. 接着放 `ui_page_structure.png`
4. 然后放 `role_module_diagram.png`
5. 再放 `user_purchase_flow.png`
6. 如果后台实现写得比较详细，再放 `admin_crud_flow.png`
7. 第4章开始依次放用户端截图
8. 第4章后半部分放管理员端截图

## 4. 图下注释写法建议

下面这些句子可以直接改一改后放进论文正文：

- 首页界面展示了系统的推荐图书、分类入口和热销图书区域，便于用户快速进入目标业务流程。
- 图书列表页支持关键词搜索和分类筛选，是系统实现图书检索功能的主要入口。
- 图书详情页展示图书封面、价格、库存与简介信息，并支持用户选择数量后加入购物车。
- 购物车页面支持数量修改、商品删除和总价汇总，为订单结算提供数据基础。
- 管理后台中的书籍管理、分类管理和订单管理模块共同构成了管理员端的核心 CRUD 功能。

## 5. 如果需要重新截图

当前截图脚本文件是：

- `capture_screenshots.mjs`

当前演示数据脚本文件是：

- `demo_seed.sql`

如果后面你改了页面样式或者数据，只要重新准备数据库并再次运行截图脚本，就可以批量更新全部论文截图。
