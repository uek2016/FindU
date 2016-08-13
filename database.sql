-- phpMyAdmin SQL Dump
-- version 4.4.10
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: 2016-08-13 11:29:16
-- 服务器版本： 5.5.42
-- PHP Version: 7.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `uek`
--
CREATE DATABASE IF NOT EXISTS `uek` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `uek`;

-- --------------------------------------------------------

--
-- 表的结构 `uek_extra_work`
--

DROP TABLE IF EXISTS `uek_extra_work`;
CREATE TABLE `uek_extra_work` (
  `wid` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `w_title` varchar(255) NOT NULL,
  `w_keywords` varchar(255) NOT NULL,
  `w_progress` int(11) NOT NULL,
  `w_start_time` int(11) NOT NULL,
  `w_end_time` int(11) NOT NULL,
  `ctime` int(11) NOT NULL,
  `mtime` int(11) NOT NULL,
  `w_date` int(11) NOT NULL,
  `is_del` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `uid` int(11) NOT NULL,
  `account` varchar(255) NOT NULL,
  `sindex` varchar(255) NOT NULL,
  `uname` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `authority` int(11) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `tel` varchar(255) NOT NULL,
  `ctime` int(11) NOT NULL,
  `mtime` int(11) NOT NULL,
  `is_del` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `uek_extra_work`
--
ALTER TABLE `uek_extra_work`
  ADD PRIMARY KEY (`wid`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`uid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `uek_extra_work`
--
ALTER TABLE `uek_extra_work`
  MODIFY `wid` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT;