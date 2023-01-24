resource "aws_iam_role" "lambda-document-convertor" {
  name = "lambda-document-convertor"

  assume_role_policy = <<EOF
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "",
                "Effect": "Allow",
                "Principal": {
                    "Service": "lambda.amazonaws.com"
                },
                "Action": "sts:AssumeRole"
            }
        ]
    }
  EOF
}

resource "aws_iam_policy" "lambda-document-convertor-execution" {
  name = "lambda-document-convertor-execution"
  description = "Allow document convertor lambda function access to S3 bucket(dbuket)"

  policy = jsonencode({
        Version: "2012-10-17",
        Statement: [
            {
                Effect: "Allow",
                Action: [
                  "s3:DeleteObject",
                  "s3:DeleteObjects",
                  "s3:GetObject",
                  "s3:PutObject",
                  "s3:PutObjectAcl",
                  "s3:PutObjectTagging"
                ],
                Resource: "${aws_s3_bucket.dbucket.arn}/*"
            }
        ]
    })
}

resource "aws_iam_role_policy_attachment" "lambda-doc-conv-attach" {
  role = aws_iam_role.lambda-document-convertor.name
  policy_arn = aws_iam_policy.lambda-document-convertor-execution.arn
}