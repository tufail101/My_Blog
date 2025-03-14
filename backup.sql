-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: myblog
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` varchar(255) NOT NULL,
  `userId` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` text,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES ('a53d3f3a-5300-4785-a77c-84052234f81a',NULL,' How AI is Shaping the Future: Opportunities and Challenges','\nArtificial Intelligence (AI) is no longer just a concept from science fictionΓÇöitΓÇÖs rapidly becoming a core part of our everyday lives. From virtual assistants like Siri and Alexa to more advanced applications in healthcare and finance, AI is revolutionizing industries and transforming the way we live and work. In this blog, weΓÇÖll explore the opportunities AI brings, the challenges it poses, and what the future might hold.\n\nOpportunities with AI:\n1. Automation and Efficiency: AI-driven automation is streamlining repetitive tasks, reducing human error, and saving time and costs across industries like manufacturing, logistics, and customer service.\n2. Data Analysis and Insights: AI algorithms can process vast amounts of data at lightning speed, uncovering patterns and generating insights that would take humans much longer to identify.\n3. Healthcare Advancements: AI-powered diagnostic tools, robotic surgeries, and personalized medicine are improving patient outcomes and making healthcare more accessible.\n4. Enhanced Creativity: AI is assisting artists, writers, and musicians in creating new forms of art, helping push creative boundaries.\n\nChallenges of AI:\n1. Ethical Concerns: AI systems can inadvertently reflect biases present in their training data, leading to unfair or discriminatory outcomes.\n2. Job Displacement: Automation powered by AI threatens certain jobs, necessitating a shift in workforce skills and training.\n3. Privacy Issues: AIΓÇÖs ability to analyze data raises concerns about surveillance and misuse of personal information.\n4. Security Risks: Advanced AI systems could be exploited for cyberattacks, misinformation, or other malicious purposes.\n\nThe Future of AI:\nThe future of AI holds incredible promise but also calls for responsible development and regulation. Collaborative efforts between governments, tec','2025-03-01 17:25:55'),('c1a701d7-9a9f-4361-b046-ed23c2ae86df',NULL,'Web Development in 2025: Trends, Tools, and Best Practices','\nWeb development is evolving faster than ever, shaping the digital experiences we rely on daily. As we step into 2025, developers must stay ahead of the curve by adopting the latest technologies and best practices. In this blog, weΓÇÖll explore key trends, essential tools, and strategies for building efficient, user-friendly websites.\n\nEmerging Trends in Web Development:\n1. AI-Powered Web Design: Tools like Framer AI and WixΓÇÖs AI website builder are making design more intuitive and accessible, allowing developers to focus on functionality.\n2. Jamstack Architecture: Jamstack continues to gain popularity for its speed, security, and scalability, decoupling the front end from the back end for more efficient web apps.\n3. Web3 and Decentralization: With the rise of blockchain technology, decentralized websites and applications are offering new opportunities for ownership and privacy.\n4. Enhanced Web Performance: Techniques like server-side rendering (SSR), static site generation (SSG), and edge computing are pushing web performance to new heights.\n\nEssential Tools for Modern Web Dev:\n1. Frameworks: React, Next.js, and Vue.js remain dominant, providing powerful libraries for building dynamic user interfaces.\n2. CSS Solutions: Tailwind CSS and Sass streamline styling, offering flexibility and efficiency in design.\n3. Deployment Platforms: Vercel and Netlify make deployment fast and seamless, with built-in CI/CD and serverless capabilities.\n4. API Management: Tools like GraphQL and REST APIs ensure efficient data fetching and smooth integration between services.\n\nBest Practices for 2025:\n1. Prioritize Accessibility: Ensure your site is usable by everyone, implementing proper contrast, alt text, and keyboard navigation.\n2. Optimize for Performance: Use lazy loading, image compression, and code splitting to keep load times fast.\n3. Focus on Security: Implement HTTPS, content security policies, and regular vulnerability checks to protect user data.\n4. Responsive Design: Design with mobile-first principles to ensure a seamless experience across all devices.\n\nWeb development in 2025 is full of exciting opportunities. By staying up-to-date with new trends and adopting best practices, developers can create more innovative, secure, and accessible digital experiences. Stay tuned for more insights and tutorials on modern web development!\n\n','2025-03-01 17:29:10'),('d0fbe623-e07a-447d-b33b-2fa518c3674b','1','Fixing the Cloudinary Image URL Issue with MySQL: Storing Buffers Instead of URLs','\r\nWhen building a blog site or any app that requires image uploads, a common setup involves Cloudinary for cloud storage, MySQL for the database, and Node.js for the backend. Recently, I ran into an issue where my image URL column in MySQL was mysteriously storing binary data (like PNG buffers) instead of the image URL from Cloudinary. LetΓÇÖs walk through the problem and fix it.\r\n\r\n#### The Issue: Binary Data Instead of URL\r\n\r\nMySQL started throwing this error:\r\n\r\n```\r\nError Code: 1366. Incorrect string value: \'\\x89PNG\\x0D\\x0A...\' for column \'img_url\'\r\n```\r\n\r\nThis clearly indicates that the `img_url` column was getting raw image data instead of a URL string. After a quick `console.log(img_url)`, I saw something like:\r\n\r\n```\r\n<Buffer 89 50 4e 47 0d 0a ...>\r\n```\r\n\r\nSo how did we end up here?\r\n\r\n#### Debugging the Problem\r\n\r\nLetΓÇÖs take a closer look at the backend.\r\n\r\n```javascript\r\nconst cloudinary = require(\"cloudinary\").v2;\r\nconst fs = require(\"fs\");\r\n\r\ncloudinary.config({\r\n    cloud_name: \'your-cloud-name\',\r\n    api_key: \'your-api-key\',\r\n    api_secret: \'your-api-secret\'\r\n});\r\n\r\nconst uploadOnCloudinary = async(localFilePath) => {\r\n    try {\r\n        if(!localFilePath) return null;\r\n        const response = await cloudinary.uploader.upload(localFilePath, {\r\n            resource_type: \"auto\"\r\n        });\r\n        console.log(\"Cloudinary Response:\", response);\r\n        return response;\r\n    } catch (error) {\r\n        fs.unlinkSync(localFilePath);\r\n        console.error(\"Upload failed:\", error);\r\n        return null;\r\n    }\r\n};\r\n\r\nmodule.exports = uploadOnCloudinary;\r\n```\r\n\r\nWhen using `response`, we were mistakenly sending the **whole response object** into MySQL:\r\n\r\n```javascript\r\nconst img_url = response; // Wrong!\r\n```\r\n\r\nInstead, we only want the image URL (`secure_url`):\r\n\r\n```javascript\r\nconst img_url = response.secure_url; // Right!\r\n```\r\n\r\n#### Checking the Database\r\n\r\nEven after fixing that, the error persisted. Time to check the column type in MySQL:\r\n\r\n```sql\r\nDESCRIBE posts;\r\n```\r\n\r\nIt turned out `img_url` was still set as a `BLOB`, which explains why it was accepting binary data.\r\n\r\n#### The Fix\r\n\r\n1. Ensure the right value is being passed to MySQL:\r\n\r\n```javascript\r\nconst query = `INSERT INTO posts(id, userId, title, content, img_url) VALUES(?, ?, ?, ?, ?)`;\r\nconst values = [postId, userId, title, content, response.secure_url];\r\nconnection.query(query, values, (err, result) => {\r\n    if (err) throw err;\r\n    console.log(\"Data inserted successfully:\", result);\r\n});\r\n```\r\n\r\n2. Alter the `img_url` column to store strings:\r\n\r\n```sql\r\nALTER TABLE posts MODIFY COLUMN img_url VARCHAR(2083);\r\n```\r\n\r\nOr, if the URLs are longer or vary:\r\n\r\n```sql\r\nALTER TABLE posts MODIFY COLUMN img_url TEXT;\r\n```\r\n\r\n#### Wrapping Up\r\n\r\nWith these changes, the issue was resolved ΓÇö no more binary data in the `img_url` column, and Cloudinary image URLs were being properly stored and retrieved. Debugging this taught me the importance of closely examining API responses and database column types.\r\n\r\nIf you run into a similar problem, I hope this breakdown saves you some time. Happy coding! ≡ƒÜÇ\r\n\r\n','2025-02-27 19:02:41'),('e942f3be-63a4-47b0-85bc-1276db51a82e','1','Web Development in 2025: Trends, Tools, and Best Practices','\nWeb development is evolving faster than ever, shaping the digital experiences we rely on daily. As we step into 2025, developers must stay ahead of the curve by adopting the latest technologies and best practices. In this blog, weΓÇÖll explore key trends, essential tools, and strategies for building efficient, user-friendly websites.\n\nEmerging Trends in Web Development:\n1. AI-Powered Web Design: Tools like Framer AI and WixΓÇÖs AI website builder are making design more intuitive and accessible, allowing developers to focus on functionality.\n2. Jamstack Architecture: Jamstack continues to gain popularity for its speed, security, and scalability, decoupling the front end from the back end for more efficient web apps.\n3. Web3 and Decentralization: With the rise of blockchain technology, decentralized websites and applications are offering new opportunities for ownership and privacy.\n4. Enhanced Web Performance: Techniques like server-side rendering (SSR), static site generation (SSG), and edge computing are pushing web performance to new heights.\n\nEssential Tools for Modern Web Dev:\n1. Frameworks: React, Next.js, and Vue.js remain dominant, providing powerful libraries for building dynamic user interfaces.\n2. CSS Solutions: Tailwind CSS and Sass streamline styling, offering flexibility and efficiency in design.\n3. Deployment Platforms: Vercel and Netlify make deployment fast and seamless, with built-in CI/CD and serverless capabilities.\n4. API Management: Tools like GraphQL and REST APIs ensure efficient data fetching and smooth integration between services.\n\nBest Practices for 2025:\n1. Prioritize Accessibility: Ensure your site is usable by everyone, implementing proper contrast, alt text, and keyboard navigation.\n2. Optimize for Performance: Use lazy loading, image compression, and code splitting to keep load times fast.\n3. Focus on Security: Implement HTTPS, content security policies, and regular vulnerability checks to protect user data.\n4. Responsive Design: Design with mobile-first principles to ensure a seamless experience across all devices.\n\nWeb development in 2025 is full of exciting opportunities. By staying up-to-date with new trends and adopting best practices, developers can create more innovative, secure, and accessible digital experiences. Stay tuned for more insights and tutorials on modern web development!\n\n','2025-03-01 17:41:56');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` varchar(36) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `userName` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('1','ALEX','alex@13','alex@gamail.com','12345'),('bf6de8ce-841f-47c4-a51b-294eb90e8ed8','!test','test@2','test@gmail.com','841438'),('e602175f-0e94-497a-ba2a-ff2a75fbfaac','forgotPass','forgotPass@3','gco540203@gmail.com','12345');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-08 22:03:50
