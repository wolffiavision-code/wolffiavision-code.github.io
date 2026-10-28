# Wolffia Vision Studio 1.0.0 candidate

[English](README_EN.md) · [ライセンス](LICENSE) · [日本語のライセンス案内](LICENSE_JA.md)

ウキクサ画像のアノテーション、前処理、追加学習、テスト、YOLO検出、個体領域の抽出、向き補正、特徴量計測をまとめたWindowsアプリです。他のウキクサ種では専用の教師データと評価が必要です。
開発者：Kento Kuwata / wolffia.vision@gmail.com

## 入手と起動

本ビルドは1.0.0の暫定リリース候補です。Webページ自体はアプリの実行場所ではありません。公開時はSHA256SUMS.txtと照合してください。

## Windowsの警告

Windows の保護警告について
この1.0.0候補ビルドはコード署名なしです。SmartScreenの「WindowsによってPCが保護されました」が出る場合があります。警告が出たことだけで感染とは判断できませんが、安全の保証でもありません。
公式配布ページとファイル名を確認し、公開されたSHA-256値と比較してください。ハッシュ一致は改変確認であり、無害性の証明ではありません。Windowsセキュリティで検査し、信頼できると判断した場合に限り「詳細情報」→「実行」を選択できます。
脅威検出がある、出所が不明、ハッシュが違う場合は実行しないでください。組織ポリシーやSmart App Controlで停止された場合は、管理者に相談してください。保護の無効化や除外設定は推奨しません。
開発者の対策は信頼された証明書による署名またはMicrosoft Store配布です。署名しても新しいファイルの警告が必ず消えるわけではありません。この配布物には署名を付与していません。
画像解析・分類は補助結果です。正確性や他のウキクサ種への適用を保証しません。元データを保管し、結果を確認してください。信頼できない.ptモデルは読み込まないでください。
参考 https://learn.microsoft.com/en-us/windows/apps/package-and-deploy/smartscreen-reputation

## 基本操作

1. HOMEでデータ作成、学習・テスト、推論・処理、解析を選びます。
2. YOLOとマスクの作業を分けます。YOLOではCキーを押すたびに、これから新しく作る矩形のクラスIDが次へ進み、最後のクラスから0へ循環します。既存矩形のクラスは一覧から変更します。
3. Nで新規作成の切替、DeleteまたはBackspaceで削除。マスクはEでブラシ／消しゴム、Hで表示／非表示。全画像への補助ラベリングは1画像ずつ保存するため、途中停止しても完了済み結果を保持します。結果を確認してからエクスポートします。
4. 前処理でtrain/val/testを分割します。学習の「準備済み」はdata.yamlとimages/labels（またはmasks）を含む親フォルダです。未分割のアノテーション保存先は学習データセットではありません。
5. 個別形式では学習画像、学習ラベル／マスク、検証画像、検証ラベル／マスク、クラス定義data.yamlを指定します。元データはコピーされます。
6. 学習中は毎エポックの検証混同行列を表示します。GTは行、推定は列。各行を0〜1へ正規化し、小数点以下2桁で中央表示します。テストでは比較画像・同形式の混同行列・8指標を表示します。errorは誤判定率 `(FP+FN+WC)/(TP+FP+FN+WC)` です。処理失敗は別のエラー詳細に記録します。マスクは画素単位でWC=0です。

## 保存先

```text
output/
  annotations/             BBOX_annotation_* / Mask_annotation_*
  datasets/                dataset_*
  training/                yolo_finetune_* / segmentation_finetune_*
    <finetune>/            weights / data.yaml / training_console.log / test_*
  practice/
   run_YYYYMMDD_HHMMSS_*/
    input_jpg_trans/
    01_yolo/               predicted / comparisons / details / CSV
    02_crops/
    03_segmentation/        original_seg / normalize
    04_features&analysis/  features / population / sorting
   continuous_YYYYMMDD_HHMMSS_*/
    01_yolo/               predicted / comparisons / annotated.mp4 / CSV
default_models/
  yolo/best.pt
  segmentation/
  download/

```

切り抜き余白は初期値0%。weights内のチェックポイントを選んだ場合、テスト保存先はその外側のfinetuneフォルダです。任意の保存先へ変更できます。HOMEの「用語・索引」は別ウィンドウで開き、処理画面と並べて検索できます。分別のクラスタリング条件、作図の密度・累積分布・個体値・対数軸・傾向線はGUIから設定できます。

## 教師画像申請

[設定手順](FORM_SETUP_JA.md)。アプリとWebには回答者用GoogleフォームURLを設定済みです。フォームの公開状態・受付設定・通知・回答内容は所有者がGoogle Forms側で確認してください。

## 確認範囲・注意

同梱ソースと検証記録を参照してください。別のクリーンPC、すべてのWindows/GPU、SmartScreenの警告解消、公開先からの1.0.0ダウンロードは未確認です。モデル・画像の配布条件はソフトウェアライセンスとは別です。
EXEにsource-code.zip、第三者ライセンス、対応する設定を同梱しています。
