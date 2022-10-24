-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               10.4.25-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for db3
CREATE DATABASE IF NOT EXISTS `db3` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `db3`;

-- Dumping structure for table db3.category
CREATE TABLE IF NOT EXISTS `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db3.category: ~4 rows (approximately)
INSERT INTO `category` (`id`, `category`) VALUES
	(1, 'thoitiet'),
	(2, 'quocte'),
	(3, 'thethao'),
	(4, 'thoisu');

-- Dumping structure for table db3.draft
CREATE TABLE IF NOT EXISTS `draft` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `path` varchar(255) NOT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `username` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_dde981489139b6aa54f7b319fd` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db3.draft: ~1 rows (approximately)
INSERT INTO `draft` (`id`, `title`, `content`, `path`, `time`, `username`) VALUES
	(2, 'Klopp: \'Liverpool chơi như những kẻ mất não\'', '"Tôi có thể giải thích đơn giản là kết quả trận này không phản ánh đúng trận đấu", Klopp nói trên kênh truyền hình BT Sport sau trận đấu trên sân City Ground. "Tôi chưa từng xem một trận đấu mà một đội bóng có đến bốn hoặc năm \'kẻ mất não\' trong một pha c', 'https://i1-thethao.vnecdn.net/2022/10/23/-3735-1666509870.png?w=680&h=0&q=100&dpr=1&fit=crop&s=r14ihvg8HHkHFnqyRVqw7Q', '2022-10-23 11:38:53', 'bao');

-- Dumping structure for table db3.post
CREATE TABLE IF NOT EXISTS `post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `path` varchar(255) NOT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `categoriesId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_4f87e1c2eb43f9bc4ec75a13aaa` (`categoriesId`),
  CONSTRAINT `FK_4f87e1c2eb43f9bc4ec75a13aaa` FOREIGN KEY (`categoriesId`) REFERENCES `category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db3.post: ~11 rows (approximately)
INSERT INTO `post` (`id`, `title`, `content`, `path`, `time`, `categoriesId`) VALUES
	(1, 'Bão Nesat hướng đến quần đảo Hoàng Sa, mạnh cấp 13', '7h sáng nay, tâm bão Nesat cách quần đảo Hoàng Sa khoảng 310 km, sức gió mạnh nhất 149 km/h (cấp 13), tăng một cấp so với chiều qua.', 'https://i1-vnexpress.vnecdn.net/2022/10/18/-8117-1666061594.png?w=680&h=0&q=100&dpr=1&fit=crop&s=WGVYNAbPVqs0nCehKu0e6Q', '2022-10-23 13:16:19', 1),
	(2, 'Thủ tướng Anh xin lỗi vì phạm sai lầm', 'Thủ tướng Liz Truss xin lỗi vì những sai lầm trong 6 tuần đầu nhiệm kỳ làm ảnh hưởng niềm tin của nhà đầu tư, nhưng quyết định không từ chức. Tôi chỉ muốn giúp đỡ người dân đang phải chịu hóa đơn năng lượng cao bằng chính sách cắt giảm thuế, nhưng chúng t', 'https://i1-vnexpress.vnecdn.net/2022/10/18/-7552-1666057622.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=CfCMplxfXgpvz5_1WTTO3A', '2022-10-23 13:17:07', 4),
	(3, 'Chính phủ Pháp họp khẩn vì khủng hoảng nhiên liệu', 'Tổng thống Macron triệu tập cuộc họp với các bộ trưởng nhằm giải quyết tình trạng đình công lan rộng, đang tạo ra cuộc khủng hoảng năng lượng tại Pháp.', 'https://i1-vnexpress.vnecdn.net/2022/10/18/-5789-1666059409.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=O3X1sZfVY1Mz0Q75GwmS0g', '2022-10-23 13:16:56', 2),
	(4, 'Mỹ nói Nga sắp diễn tập hạt nhân', 'Mỹ cho biết Nga chuẩn bị tiến hành diễn tập hạt nhân thường niên với nội dung bắn đạn thật, nhưng Washington chưa được Moskva thông báo theo thỏa thuận.', 'https://i1-vnexpress.vnecdn.net/2022/10/18/-4545-1666053638.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=E0bO-XhXpX3I0jFD5MbKww', '2022-10-23 13:16:53', 2),
	(5, 'Đức quyết định giữ ba nhà máy điện hạt nhân', 'Đức sẽ để ba nhà máy điện hạt nhân còn lại vận hành đến tháng 4/2023 trong bối cảnh nước này đối mặt khủng hoảng năng lượng.', 'https://i1-vnexpress.vnecdn.net/2022/10/18/-7316-1666052367.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=QhCOgRcdXFZ-oMPzAcgyTg', '2022-10-23 13:16:49', 2),
	(6, 'Xin thôi việc khi vừa nhận quyết định bổ nhiệm', 'Sáng 17/10, UBND tỉnh Đăk Nông công bố quyết định bổ nhiệm bà Thanh Hương, nguyên giám đốc Sở Y tế làm Phó giám đốc Sở Lao động, Thương binh và Xã hội. Tuy nhiên, ngay sau khi nhận quyết định, bà Hương trình bày mong muốn thôi việc và cho biết sẽ có đơn x', 'https://i1-vnexpress.vnecdn.net/2022/10/16/-8611-1665908791.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=PuEwMh-IPHVtDoGuciZk8g', '2022-10-23 13:16:45', 4),
	(7, 'Bài phát biểu tái khẳng định tầm nhìn của ông Tập với Trung Quốc', 'Bài phát biểu của ông Tập tại lễ khai mạc đại hội đảng không có nhiều thông điệp mới, chủ yếu nhấn mạnh tầm nhìn và định hướng phát triển đất nước của ông.\r\n\r\nĐại hội đại biểu toàn quốc đảng Cộng sản Trung Quốc (CCP) khai mạc sáng nay tại Đại lễ đường Nhâ', 'https://i1-vnexpress.vnecdn.net/2022/10/16/-8117-1665899879.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=dHLPMBQMONr5FNkC31YsFw', '2022-10-23 13:16:42', 4),
	(8, 'Mỹ có thể trừng phạt Arab Saudi thế nào', 'Hạn chế bán vũ khí hay rút lực lượng khỏi Arab Saudi là hai trong các phương án Washington đang xem xét nhằm trừng phạt Riyadh vì giảm sản lượng dầu.\r\n\r\nMối quan hệ Arab Saudi - Mỹ dường như đã rơi xuống đáy sau động thái cắt giảm sản lượng dầu của OPEC+,', 'https://i1-vnexpress.vnecdn.net/2022/10/15/-3247-1665806274.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=XGPlOdcb1tKn2qDamnx9Eg', '2022-10-23 13:16:39', 2),
	(9, 'Di sản của HLV Park', 'HLV Park đã tạo ra một sức hút kỳ lạ, không chỉ với CĐV Việt Nam mà còn với người hâm mộ ở Hàn Quốc và nhất là khu vực Đông Nam Á. Việc đội tuyển Indonesia, Malaysia đang sử dụng các nhà cầm quân Hàn Quốc là ví dụ về nguồn cảm hứng mà Park tạo ra ở các độ', 'https://i1-thethao.vnecdn.net/2022/10/18/-9612-1666077014.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=f_3SuYtXWHBXJz7wiB1nSw', '2022-10-23 13:16:31', 3),
	(10, 'Kroos mỉa mai việc Man City đoạt giải CLB hay nhất', 'Tiền vệ Toni Kroos bất bình khi tạp chí France Football trao giải CLB hay nhất thế giới mùa 2021-2022 cho Man City, còn Real đứng thứ ba.\r\n\r\n"CLB hay thứ ba thế giới mùa 2021-2022. Hạnh phúc chứ Real Madrid?", Kroos viết trên Twitter tối 17/10.', 'https://i1-thethao.vnecdn.net/2022/10/18/-5402-1666052565.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=3wbW54LVualeJtB76yqwsQ', '2022-10-23 13:16:28', 3),
	(13, 'Miền Bắc giữa tuần đón không khí lạnh', 'Đợt không khí lạnh tăng cường sẽ khiến miền Bắc mưa trong khoảng hai ngày, nhiệt độ thấp nhất vùng đồng bằng là 23 độ C.\r\n\r\nHai ngày qua, miền Bắc tạnh ráo, trời nắng do không khí lạnh bắt đầu suy yếu. Nhiệt độ cao nhất ở Hà Nội 14h hôm nay là 34 độ, thấp', 'https://i1-vnexpress.vnecdn.net/2022/10/04/-5456-1664856651.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=qzF72p9Dvz5PUodObs72fw', '2022-10-23 13:16:22', 1);

-- Dumping structure for table db3.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_fe0bb3f6520ee0469504521e71` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db3.users: ~4 rows (approximately)
INSERT INTO `users` (`id`, `username`, `password`, `avatar`) VALUES
	(1, 'cuong', '1234', '1666506633293.png'),
	(2, 'bao', '12345', '1666511189988.png'),
	(3, 'linh', '123456', '1666357278165.png'),
	(4, 'truc', '12345', '');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
