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
- フルオートマチック  
**AdDCinoは[張力制御技術](https://www.mitsubishielectric.co.jp/fa/products/drv/tencon/pmerit/case/whats/whats_tencon_ba03.html)をリールに組み込みました。**  
この技術によって、ダイヤルなどによるブレーキ選択が不要となります。ただキャストするだけで、あとはリールに組み込まれた制御アルゴリズムが、フルオートでブレーキ制御をします。
<img src="/images/products/fig02.png" width="500" />
- IoT化  
電池を装着すれば、スマホと接続が出来、パラメータの書き換えや、キャストのロギングが可能です。もちろん自己発電でも回路は駆動するので、バッテリ無しでもキャストが可能です。
<img src="/images/products/fig03.png" width="500" />
- シンプル回路  
最小数の汎用部品のみで構成される回路設計を提示します。スプール回転検出はコイル起電力により検出するため、磁気や光センサーなどが不要です。それに加えて、フルオート化によってダイアル等の入力回路も不要となるため、DC技術をローコストで実現できます。
<img src="/images/products/fig04.png" width="500" />
- オープンソース  
Arduinoベースのプログラムコードを提供します。このコードはオープンソースで誰もが自由に改変・再配布が可能です。

## GitHub Repository
- [ドキュメント](https://github.com/KazukiHiraizumi/arDCino)
- [コード](https://github.com/KazukiHiraizumi/DCuino)

## Movies
- https://www.youtube.com/shorts/YRz96Ap-nOw
