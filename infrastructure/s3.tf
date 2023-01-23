resource "aws_s3_bucket" "dbucket" {
  bucket = "s3-document-convertor-bucket"

  tags = {
    Name        = "S3 Document Convertor bucket"
    Environment = var.env
  }
}

resource "aws_s3_bucket_acl" "dbucket_acl" {
  bucket = aws_s3_bucket.dbucket.id

  acl = "public-read"
}

resource "aws_s3_bucket_lifecycle_configuration" "dbucket_lifecycle_config" {
  bucket = aws_s3_bucket.dbucket.id

  rule {
    id = "temp-docs"

    expiration {
      days = 1
    }

    filter {
      prefix = "temp/"
    }

    status = "Enabled"
  }
}

resource "aws_s3_object" "libre_office_zip" {
  bucket = aws_s3_bucket.dbucket.id

  key = "libre_office_zip"

  acl = "private"

  source = var.libre_office_location

  etag = filemd5(var.libre_office_location)
}