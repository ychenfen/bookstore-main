USE bookstore;

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE order_items;
TRUNCATE TABLE orders;
TRUNCATE TABLE cart_items;
TRUNCATE TABLE books;
TRUNCATE TABLE categories;
TRUNCATE TABLE users;
SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO users (`id`, `openId`, `name`, `email`, `loginMethod`, `role`, `createdAt`, `updatedAt`, `lastSignedIn`) VALUES
  (1, 'demo-user', '演示用户', 'user@example.com', 'manual', 'user', NOW(), NOW(), NOW()),
  (2, 'demo-admin', '系统管理员', 'admin@example.com', 'manual', 'admin', NOW(), NOW(), NOW());

INSERT INTO categories (`id`, `name`, `description`, `createdAt`) VALUES
  (1, '文学小说', '经典文学与当代小说', NOW()),
  (2, '计算机', '程序设计、算法与系统架构', NOW()),
  (3, '经济管理', '商业思维、管理实践与战略案例', NOW()),
  (4, '人文社科', '历史、哲学与社会科学读物', NOW()),
  (5, '科学新知', '自然科学、前沿科技与通识科普', NOW()),
  (6, '艺术设计', '设计方法、审美与创意实践', NOW());

INSERT INTO books (`id`, `title`, `author`, `isbn`, `price`, `originalPrice`, `description`, `coverImage`, `categoryId`, `stock`, `salesCount`, `publisher`, `pageCount`, `status`, `createdAt`, `updatedAt`) VALUES
  (1, '活着', '余华', '9787506365437', '39.90', '49.90', '一部关于生命韧性与时代变迁的中文小说代表作。', 'https://picsum.photos/seed/book-huozhe/400/560', 1, 86, 532, '作家出版社', 224, 'active', NOW(), NOW()),
  (2, '百年孤独', '加西亚·马尔克斯', '9787544291178', '59.00', '69.00', '魔幻现实主义文学的高峰之作，展现布恩迪亚家族七代人的命运。', 'https://picsum.photos/seed/book-solitude/400/560', 1, 64, 428, '南海出版公司', 360, 'active', NOW(), NOW()),
  (3, '深入浅出 React', '王宁', '9787121456770', '79.00', '89.00', '从组件、状态到工程化实践，适合作为前端课程延伸阅读。', 'https://picsum.photos/seed/book-react/400/560', 2, 42, 196, '电子工业出版社', 420, 'active', NOW(), NOW()),
  (4, 'MySQL 性能调优实战', '张磊', '9787111668886', '88.00', '108.00', '围绕索引设计、SQL 优化和高并发场景进行案例讲解。', 'https://picsum.photos/seed/book-mysql/400/560', 2, 35, 143, '机械工业出版社', 398, 'active', NOW(), NOW()),
  (5, '金字塔原理', '芭芭拉·明托', '9787543222791', '56.00', '68.00', '提升表达与结构化思维的经典方法论。', 'https://picsum.photos/seed/book-pyramid/400/560', 3, 71, 267, '民主与建设出版社', 256, 'active', NOW(), NOW()),
  (6, '置身事内', '兰小欢', '9787208171336', '65.00', '75.00', '理解中国政府与经济运行逻辑的热门财经读物。', 'https://picsum.photos/seed/book-economy/400/560', 3, 58, 305, '上海人民出版社', 320, 'active', NOW(), NOW()),
  (7, '设计中的设计', '原研哉', '9787563360147', '48.00', '58.00', '从日本设计实践出发，讨论设计的本质与方法。', 'https://picsum.photos/seed/book-design/400/560', 6, 27, 119, '山东人民出版社', 272, 'active', NOW(), NOW()),
  (8, '算法图解', 'Aditya Bhargava', '9787115447630', '66.00', '79.00', '图解算法入门图书，便于课堂演示和概念理解。', 'https://picsum.photos/seed/book-algo/400/560', 2, 0, 88, '人民邮电出版社', 246, 'inactive', NOW(), NOW());

INSERT INTO cart_items (`id`, `userId`, `bookId`, `quantity`, `createdAt`, `updatedAt`) VALUES
  (1, 1, 1, 1, NOW(), NOW()),
  (2, 1, 3, 2, NOW(), NOW());

INSERT INTO orders (`id`, `userId`, `totalAmount`, `status`, `shippingName`, `shippingPhone`, `shippingAddress`, `note`, `createdAt`, `updatedAt`) VALUES
  (1, 1, '197.00', 'pending', '演示用户', '13800138000', '北京市海淀区中关村软件园 8 号楼', '工作日白天送达', DATE_SUB(NOW(), INTERVAL 1 DAY), DATE_SUB(NOW(), INTERVAL 1 DAY)),
  (2, 1, '95.90', 'shipped', '演示用户', '13800138000', '北京市海淀区中关村软件园 8 号楼', '请提前联系', DATE_SUB(NOW(), INTERVAL 5 DAY), DATE_SUB(NOW(), INTERVAL 3 DAY)),
  (3, 1, '56.00', 'paid', '演示用户', '13800138000', '北京市海淀区中关村软件园 8 号楼', NULL, DATE_SUB(NOW(), INTERVAL 2 DAY), DATE_SUB(NOW(), INTERVAL 2 DAY)),
  (4, 2, '59.00', 'completed', '系统管理员', '13900139000', '上海市浦东新区张江高科园区', NULL, DATE_SUB(NOW(), INTERVAL 8 DAY), DATE_SUB(NOW(), INTERVAL 6 DAY));

INSERT INTO order_items (`id`, `orderId`, `bookId`, `quantity`, `price`, `bookTitle`, `bookAuthor`, `bookCoverImage`, `createdAt`) VALUES
  (1, 1, 3, 1, '79.00', '深入浅出 React', '王宁', 'https://picsum.photos/seed/book-react/400/560', DATE_SUB(NOW(), INTERVAL 1 DAY)),
  (2, 1, 5, 1, '56.00', '金字塔原理', '芭芭拉·明托', 'https://picsum.photos/seed/book-pyramid/400/560', DATE_SUB(NOW(), INTERVAL 1 DAY)),
  (3, 1, 7, 1, '62.00', '设计中的设计', '原研哉', 'https://picsum.photos/seed/book-design/400/560', DATE_SUB(NOW(), INTERVAL 1 DAY)),
  (4, 2, 1, 1, '39.90', '活着', '余华', 'https://picsum.photos/seed/book-huozhe/400/560', DATE_SUB(NOW(), INTERVAL 5 DAY)),
  (5, 2, 7, 1, '56.00', '设计中的设计', '原研哉', 'https://picsum.photos/seed/book-design/400/560', DATE_SUB(NOW(), INTERVAL 5 DAY)),
  (6, 3, 5, 1, '56.00', '金字塔原理', '芭芭拉·明托', 'https://picsum.photos/seed/book-pyramid/400/560', DATE_SUB(NOW(), INTERVAL 2 DAY)),
  (7, 4, 2, 1, '59.00', '百年孤独', '加西亚·马尔克斯', 'https://picsum.photos/seed/book-solitude/400/560', DATE_SUB(NOW(), INTERVAL 8 DAY));
