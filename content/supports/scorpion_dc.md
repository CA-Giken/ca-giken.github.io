---
title: "RP683/DCプログラム書換"
description: "DC(11-Scorpion) 書換器の利用方法と書換プログラムのダウンロード"
image: "/images/products/robo_winder.png"
created_at: 20241002
last_updated: 20241002
category: "support"
---

# RP683/DCプログラム書き換え

## スコーピオンDC書き換え用HEXファイル一覧

## スコーピオンDC書き換えマニュアル

### Google Chromeをインストール

### ライターソフト Hex Dropper をインストール

RP683用ライターソフトにはGoogle Chrome™アプリの「Hex Dropper」を使います。

※ Googleアカウントをお持ちでない場合は、Googleアカウントをご用意ください。
[Googleアカウントの作成方法はこちら](https://support.google.com/accounts/answer/27441?hl=ja&co=GENIE.Platform%3DAndroid)

以下のリンクより、Chromeウェブストアに接続します。Hex Dropperのページのインストールボタン(＋無料)を選びます。
[Chrome ウェブストア](https://chromewebstore.google.com/detail/hexdropper/caoadeoangogegeghmogikkfjfgdiojg)

インストールが完了すると、Windows の【スタートメニュー】->【Chromeアプリ】 から起動することができます。

### Arduino ドライバーのインストール

お持ちの RP683 に Arduino ドライバーをインストールします。

1. [ドライバーをダウンロードします。](/resources/arduino.inf)
2. USB ケーブルで RP683 をパソコンに接続します。
3. RP683 の黄色ランプが点滅状態になるまで数秒待ちます。
  [RP683 黄色LED点滅場所](/images/supports/scorpion/a0.png)
4. デバイスマネージャーで RP683 が認識されている事を確認します。
(Windows) スタートボタンを右クリック -> デバイスマネージャー -> その他のデバイス -> **Arduino Leonardo** 
5. **Arduino Leonardo** を右クリックし、「ドライバーソフトウェアの更新」を選択します。
6. ウィザードの指示に従い、「特定の場所からインストールする」を選択します。
7. 「参照」ボタンを押し、先ほどダウンロードしたArduinoドライバー(arduino.inf)が保存されているフォルダを選択します。
8. インストールに成功した事を確認し、「閉じる」を押します。

### DC 基盤への書き込み

1. 書き込みたいHEXファイルをダウンロードします。
2. DCユニットをセットします。
[DCユニットをセット](/images/supports/scorpion/w1.png)
3. Hex Dropperを起動し、RP683(Arduino)がつながっているCOMポートを選び、「チェック」ボタンを押します。
[HexDropper接続](/images/supports/scorpion/w0.png)
4. 接続確認に成功すると、「書き込み出来ます」と表示されます。。エラーが出るときは、DCユニットを挿し直して繰り返します。
[HexDropper接続確認](/images/supports/scorpion/w2.png)
5. 書き込みたいHEXファイルをドラッグ＆ドロップします。
6. ドロップすると書き込みが始まります。約 20 秒で完了します。
7. 書き込みが完了すると、「書き込み完了」と表示されます。
[HexDropper書き込み完了画面](/images/supports/scorpion/w5.png)

書き込み中にエラーが発生した場合は、手順 1. に戻って再度進めてください。
