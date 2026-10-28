# Wolffia Vision Studio 1.0.0 candidate

[日本語](README.md) · [License](LICENSE) · [License guide](LICENSE_EN.md)

A Windows desktop workflow for duckweed image annotation, dataset preparation, fine-tuning, held-out testing, object detection, masks, orientation alignment and feature measurement. Other duckweed species require appropriate annotations and independent evaluation.
By Kento Kuwata / wolffia.vision@gmail.com

## Install

This build is a provisional 1.0.0 release candidate. The website itself does not run inference. Compare SHA256SUMS.txt when a public package is prepared.

Windows protection warnings
This 1.0.0 candidate build is unsigned. SmartScreen may show "Windows protected your PC". This warning alone neither proves infection nor guarantees safety.
Verify the official download source, filename and published SHA-256. A matching hash verifies integrity, not harmlessness. Scan the download. Only if you trust the source and choose to proceed, use "More info" then "Run anyway".
Do not run files with a mismatched hash, unknown origin or a detected threat. If organization policy or Smart App Control blocks execution, contact your administrator. Do not disable protection or add antivirus exclusions.
Publisher-side options include trusted code signing or Microsoft Store distribution. Signing does not guarantee immediate removal of reputation warnings. This package has not been signed.
Analysis and classification are assistive. Accuracy and applicability to other duckweed species are not guaranteed. Keep original data and review results. Do not load untrusted .pt checkpoints.
Reference: https://learn.microsoft.com/en-us/windows/apps/package-and-deploy/smartscreen-reputation

## Workflow

Select a workspace on HOME, then YOLO or Mask. Press C to advance the class ID assigned to the next newly created rectangle, wrapping from the last class to 0. Change an existing rectangle through the item list. N toggles new annotation; Delete/Backspace removes selection; E toggles mask eraser and H toggles visibility. All-image assistance saves each completed image immediately, so completed drafts remain if processing is stopped. Review assisted labels before export.
Use preprocessing to split train/val/test. For prepared training input, select the parent containing data.yaml and images/labels or masks. An unsplit annotation export is not a prepared training dataset. Separate input shows four train/validation image and label/mask folders plus class definition data.yaml. Source files are copied.
Training displays a validation confusion matrix every epoch (GT rows / prediction columns), not a training-set matrix. Matrix rows are normalized to 0–1 and centered with two decimals. Testing shows comparisons, the same matrix format, TP/FP/FN/WC, precision, recall, F1 and error rate. Error rate is `(FP+FN+WC)/(TP+FP+FN+WC)`; processing failures are reported separately. Binary masks count pixels and have WC=0.

## Output layout

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

Crop margin defaults to 0%. For a checkpoint inside weights, test output defaults to the enclosing fine-tune folder. Manual output selection remains available. HOME opens a searchable Terms and index window alongside other work. Clustering thresholds and expanded chart controls (density, ECDF, strip plots, log axes and trend lines) are available in the GUI.

[Dataset form setup](FORM_SETUP_EN.md). The responder URL is configured in the application and website; the owner must verify publication, response collection and notifications in Google Forms. See the bundled verification record for tested scope. Independent clean-PC testing, all Windows/GPU combinations, elimination of protection warnings and downloading 1.0.0 from the public site remain unverified. Models and images have separate redistribution terms.
Corresponding source and third-party license notices are included in the executable distribution.
