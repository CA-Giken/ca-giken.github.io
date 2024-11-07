---
title: "ROS on Docker"
description: "CA技研ではロボット開発フレームワーク「ROS」をDocker上で実行する事で、最新システムとレガシーシステムの統合を可能にしています。"
image: "/images/products/ros-docker.png"
created_at: 20241107
last_updated: 20241107
category: "oss"
archived: false
---

![タイトル](/images/products/ros-docker.png)

# CA技研では ROS + Docker を採用しています

CA技研ではロボット開発フレームワーク「[Robot Operating System (ROS)](https://www.ros.org/)」を使用して製品開発を行っております。

製品開発を行う際に、弊社ではお客様がお持ちの3Dカメラやロボットを利用する機会が多く、弊社システムは幅広い機器への対応が課題となっていました。

そこで、ROSを仮想コンテナシステム「[Docker](https://www.docker.com/ja-jp/)」を利用する事で、多様な機器への対応を可能にし、同時にアップデートが難しくなってきた機器を稼働させ続ける事を可能にしています。

## 公開レポジトリ

[https://github.com/CA-Giken/docker-noetic-capc](https://github.com/CA-Giken/docker-noetic-capc)

## 技術記事

[Zenn: 令和最新版 ROS Noetic on Docker のすすめ](https://zenn.dev/kyoizmy/articles/333ffb5102e2cf)
