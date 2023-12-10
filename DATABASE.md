# Database
## 登录
```bash
mysql -u root
```
## 建表语句
```sql
create database jiamei;
use jiamei;
```
## product
```sql
CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `category_id` int(11) NOT NULL,
  `location_id` int(11) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`category_id`) REFERENCES `category`(`id`),
  FOREIGN KEY (`location_id`) REFERENCES `location_table`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

```
## category
```sql
CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `category` (`name`) VALUES ('测试');
```
## product_image
```sql
CREATE TABLE `product_image` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11),
  `category_id` int(11),
  `name` varchar(255),
  `url` varchar(255),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
-- 删除的时候不会影响到 product 表
```
## location
```sql
CREATE TABLE `location_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `province` varchar(255),
  `city` varchar(255),
  `district` varchar(255),
  `street` varchar(255),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `location_table` (`province`, `city`, `district`, `street`) VALUES
('广东省', '深圳市', '南山区', '高新南区'),
('广东省', '广州市', '天河区', '珠江新城'),
('江苏省', '南京市', '鼓楼区', '中央路'),
('江苏省', '苏州市', '吴中区', '相城街道'),
('北京市', '北京市', '海淀区', '中关村');
```
# 数据获取
```sql
SELECT `product`.*, `category`.`name` AS `category_name`, `product_image`.`url` AS `img_url`, `location_table`.*
FROM `product`
JOIN `category` ON `product`.`category_id` = `category`.`id`
JOIN `product_image` ON `product`.`id` = `product_image`.`product_id`
JOIN `location_table` ON `product`.`location_id` = `location_table`.`id`;
```