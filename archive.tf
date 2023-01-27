data "archive_file" "lambda_document_convertor" {
  type = "zip"

  source_dir  = abspath("src")
  output_path = abspath("lambda_document_convertor.zip")
}