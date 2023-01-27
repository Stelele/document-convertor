resource "aws_lambda_function" "document_convertor" {
  function_name = "DocumentConvertor"

  s3_bucket = aws_s3_bucket.dbucket.id
  s3_key    = aws_s3_object.lambda_document_convertor_zip.key

  runtime = "nodejs12.x"
  handler = "convertor.handler"

  source_code_hash = data.archive_file.lambda_document_convertor.output_base64sha256

  role = aws_iam_role.lambda-document-convertor.arn
}