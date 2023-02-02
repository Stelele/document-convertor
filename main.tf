terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "4.51.0"
    }

    archive = {
      source  = "hashicorp/archive"
      version = "2.3.0"
    }

    null = {
      source  = "hashicorp/null"
      version = "3.2.1"
    }
  }

  cloud {
    organization = "giftm"
    workspaces {
      name = "document-convetor-aws"
    }
  }

  required_version = "1.3.7"
}

provider "aws" {
  region = var.aws_region
}

