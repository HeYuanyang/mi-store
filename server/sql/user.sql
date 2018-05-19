CREATE TABLE `user_tb` (
  `id`        int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username`  varchar(50)      NOT NULL COMMENT '用户名',
  `password`  varchar(50)      NOT NULL COMMENT '密码',
  `create_at` timestamp(6)     NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_at` timestamp(6)     NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  PRIMARY KEY (`id`)
)
ENGINE=InnoDB DEFAULT CHARSET=utf8
COMMENT='用户表信息';
