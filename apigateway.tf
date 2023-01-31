resource "aws_apigatewayv2_api" "lambda_doc_conv" {
  name          = "serverless_lambda_doc_conv_gw"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_stage" "lambda_doc_conv" {
  api_id = aws_apigatewayv2_api.lambda_doc_conv.id

  name        = "serverless_lambda_doc_conv_stage"
  auto_deploy = true

  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.api_gw.arn

    format = jsonencode({
      requestId               = "$context.requestId"
      sourceIp                = "$context.identity.sourceIp"
      requestTime             = "$context.requestTime"
      protocol                = "$context.protocol"
      httpMethod              = "$context.httpMethod"
      resourcePath            = "$context.resourcePath"
      routeKey                = "$context.routeKey"
      status                  = "$context.status"
      responseLength          = "$context.responseLength"
      integrationErrorMessage = "$context.integrationErrorMessage"
    })
  }
}

resource "aws_apigatewayv2_integration" "doc_conv" {
  api_id = aws_apigatewayv2_api.lambda_doc_conv.id

  integration_uri    = aws_lambda_function.document_convertor.invoke_arn
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
}

resource "aws_apigatewayv2_route" "doc_conv" {
  api_id = aws_apigatewayv2_api.lambda_doc_conv.id

  route_key = "GET /doc"
  target    = "integrations/${aws_apigatewayv2_integration.doc_conv.id}"
}