---
title: "DC + Arduino = ArDCino"
description: "ArduinoでDCをDXする"
image: "/images/products/ArDCino_Cardiff.png"
created_at: 20240925
last_updated: 20170116
category: "oss"
archived: false
---

# "ArDCino" ベイトリールのDigital Transformation

![ArDCino](/images/products/ArDCino_Cardiff.png)

## ベイトリールのDXとは

Shimano DCが発売されて20年が経過した。8Bitの乗算命令すらないマイコンから始まったコントローラも、現在は3世代目となりCPUは32Bitに更新された。しかし、処理能力が約100倍になったにも拘らず、ブレーキのコア技術は20年前から変わっていません。  

**ArDCino**は、真のベイトリールの**Digital Transformation**です。
- 完全自動制御  
**AdDCinoは[張力制御技術](https://www.mitsubishielectric.co.jp/fa/products/drv/tencon/pmerit/case/whats/whats_tencon_ba03.html)によりラインテンションを制御する唯一のテクノロジです。**  
従来のブレーキは電子制御も含めてラインテンションを制御していません。このため、ルアーや風向きに応じて、『ヒト』が適切なブレーキの強さを選択しないと、バックラッシュしたり、飛距離を損なったりします。  
張力制御は、実際のラインテンションが目標値に追従するように、自動的にブレーキ力を調整します。その結果、単にバックラッシュが防止されるだけでなく、過剰なブレーキも同時に抑制できるため、回転フィールも一層引き立ちます。
- オープンソース  
Arduinoベースのプログラムコードを提供します。このコードはオープンソースで誰もが自由に改変・再配布が可能です。
- IoT化  
電池を装着すれば、スマホと接続が出来、パラメータの書き換えや、キャストのロギングが可能です。もちろん自己発電でも回路は駆動するので、バッテリ無しでもキャストが可能です。
- シンプル回路  
スプール回転を検出する特殊なセンサーなどを廃しました。またダイアル等によるブレーキ選択も不要となるため、汎用部品のみで構成されるシンプルな回路が実現できます。

## GitHub Repository

- [ドキュメント](https://github.com/KazukiHiraizumi/arDCino)
- [コード](https://github.com/KazukiHiraizumi/DCuino)

## Movies
- https://www.youtube.com/shorts/YRz96Ap-nOw
