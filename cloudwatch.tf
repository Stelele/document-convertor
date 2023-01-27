resource "aws_cloudwatch_log_group" "document_convertor" {
  name = "/aws/lambda/${aws_lambda_function.document_convertor.function_name}"

  retention_in_days = 3
}