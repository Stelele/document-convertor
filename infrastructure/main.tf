terraform {
   required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
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
