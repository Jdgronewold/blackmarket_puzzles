# config.tf
provider "aws" {
  region  = "us-east-1"
  profile = "blackmarket"
}

terraform {
  required_version = ">= 1.0"

  backend "s3" {
    bucket  = "blackmarketpuzzles-terraform"
    key     = "blackmarketpuzzles-terraform.tfstate"
    region  = "us-east-1"
    profile = "blackmarket"
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.69.0"
    }
  }
}