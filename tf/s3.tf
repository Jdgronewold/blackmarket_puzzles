resource "aws_s3_bucket" "bmp_client" {
  bucket = "blackmarketpuzzles-client"
  acl    = "private"

  website {
    index_document = "index.html"
    error_document = "error.html"
  }
}

resource "aws_s3_bucket_public_access_block" "block_public_access" {
  bucket = aws_s3_bucket.bmp_client.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket" "bmp_client_redirect" {
  bucket = "blackmarketpuzzles-client-redirect"
  acl = "private"

  website {
    redirect_all_requests_to = "https://www.blackmarketpuzzles.com"
  }
}

resource "aws_s3_bucket_public_access_block" "block_public_access-redirect" {
  bucket = aws_s3_bucket.bmp_client_redirect.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}
