# CA Giken Homepage

## Preview Guide

- Github Markdown の CSS を利用しているので、VSCodeのMarkdown Previewとほぼ同じ表示になると思います。

| directory | description | note |
| --- | --- | --- |
| /content/products | 製品 | |
| /content/blogs | ブログ | |
| /content/rnd | 研究開発 | 今のところ利用なし |
| /content/support | サポート | |

### Local Preview

1. Install node.js
2. Install pnpm: `npm install -g pnpm`
3. `pnpm install`
4. `pnpm dev`
5. Access to localhost:3000 in browser.

### Staging Preview

TODO: ステージングブランチの用意とプレビュー用urlの準備

## Post & Modify Topics

### Create/modify `.md` in `/content` directory

- Based on Github Markdown. Same view as Github README.md.

### Image embedding

- Place an image file at `/public/images`
- In `.md`, `[](/images/xxx.png)`

### Write header

Markdown files require a header field.

| key | value | types |
| --- | --- | --- |
| title | "記事タイトル" | |
| description | "記事概要" | 記事カードに表示されます。|
| image | "/images/xxx.png" | 記事カードのサムネイルに表示されます。 |
| created_at | 20241002 | 記事作成日、ソートに利用します。|
| last_updated | 20241002 | 記事更新日、今のところ利用なし |
| category | "oss" | 記事種別 |
| archived | false | 一覧に表示するかどうか |

| categories | directory | description |
| --- | --- | --- |
| blog | /content/blogs | ブログ記事 |
| oss | /content/products | オープンソース製品 |
| embedded_controller | /content/products | 組み込みコントローラー製品 |
| robotics_and_automation | /content/rnd | 研究開発 |
| support | /content/supports | 製品サポート |

Example:

```md
---
title: "ベイトリール練習アプリ BaitMaster の使い方"
description: "ベイトマスターアプリの操作方法を説明します。"
image: "/images/product_placeholder.png"
created_at: 20241002
last_updated: 20241002
category: "support"
archived: false
---
```

### Theme colors
- Accent: rgb(0, 197, 255), #33ccff
- Accent2: rgb(253, 153, 0), #ff9900
