/*
 Navicat Premium Data Transfer

 Source Server         : es
 Source Server Type    : MySQL
 Source Server Version : 80011
 Source Host           : localhost:3306
 Source Schema         : easy_sign

 Target Server Type    : MySQL
 Target Server Version : 80011
 File Encoding         : 65001

 Date: 31/01/2020 11:51:30
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for es_comment
-- ----------------------------
DROP TABLE IF EXISTS `es_comment`;
CREATE TABLE `es_comment` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `message_id` int(10) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `is_delete` varchar(1) DEFAULT NULL,
  `is_hidden` varchar(1) DEFAULT NULL,
  `parent` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for es_message
-- ----------------------------
DROP TABLE IF EXISTS `es_message`;
CREATE TABLE `es_message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `content` varchar(1000) DEFAULT NULL,
  `creator` varchar(255) DEFAULT NULL,
  `create_at` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL COMMENT '消息类型',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for es_session
-- ----------------------------
DROP TABLE IF EXISTS `es_session`;
CREATE TABLE `es_session` (
  `id` int(10) DEFAULT NULL,
  `user_id` int(10) DEFAULT NULL,
  `session_key` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `expire_at` varchar(255) DEFAULT NULL,
  `create_at` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for es_sign
-- ----------------------------
DROP TABLE IF EXISTS `es_sign`;
CREATE TABLE `es_sign` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `message_id` int(11) DEFAULT NULL,
  `sign_user_id` int(11) DEFAULT NULL,
  `create_at` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for es_user
-- ----------------------------
DROP TABLE IF EXISTS `es_user`;
CREATE TABLE `es_user` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `nickname` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `role` varchar(255) NOT NULL DEFAULT '1',
  `create_at` varchar(255) DEFAULT NULL,
  `last_login` varchar(255) DEFAULT NULL,
  `client_type` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `telephone` varchar(255) DEFAULT NULL,
  `openid` varchar(50) DEFAULT NULL,
  `unionid` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of es_user
-- ----------------------------
BEGIN;
INSERT INTO `es_user` VALUES (1, 'zhangsan', 'zhangsan', 'hh', '1', '22', '22', '1', '1', '111', '111', NULL);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
