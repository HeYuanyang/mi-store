CREATE TABLE `ad_tb` (
  `id`        bigint(20)   NOT NULL COMMENT '广告ID',
  `url`       varchar(300) NOT NULL COMMENT '广告地址',
  `img`       varchar(300) NOT NULL COMMENT '广告图片',
  `create_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  PRIMARY KEY (`id`)
)
ENGINE=InnoDB DEFAULT CHARSET=utf8
COMMENT='广告表信息';

CREATE TABLE `goods_tb` (
  `id`           bigint(20)     NOT NULL COMMENT '商品ID',
  `type`         varchar(50)    NOT NULL COMMENT '商品类型',
  `img`          varchar(300)   NOT NULL COMMENT '商品图片',
  `name`         varchar(50)    NOT NULL COMMENT '商品名称',
  `info`         varchar(300)   NOT NULL COMMENT '商品介绍',
  `amount`       decimal(10, 2) NOT NULL COMMENT '商品价格',
  `is_recommend` int(10)        NOT NULL COMMENT '是否推荐商品',
  `create_at`    timestamp(6)   NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_at`    timestamp(6)   NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  PRIMARY KEY (`id`)
)
ENGINE=InnoDB DEFAULT CHARSET=utf8
COMMENT='商品表信息';
