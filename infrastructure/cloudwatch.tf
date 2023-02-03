resource "aws_cloudwatch_log_group" "document_convertor" {
  name = "/aws/lambda/${aws_lambda_function.document_convertor.function_name}"

  retention_in_days = 1
}

resource "aws_cloudwatch_log_group" "api_gw" {
  name = "/aws/api_gw/${aws_apigatewayv2_api.lambda_doc_conv.name}"

  retention_in_days = 1
}