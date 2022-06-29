resource "aws_cloudfront_origin_access_identity" "oai" {
  comment = "bmp OAI"
}

resource "aws_cloudfront_distribution" "blackmarket_puzzles" {
  enabled         = true
  is_ipv6_enabled = true

  origin {
    domain_name = "${aws_s3_bucket.bmp_client.bucket_domain_name}"
    origin_id   = "bmpWebsite"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.oai.cloudfront_access_identity_path
    }
  }

  origin {
    domain_name = aws_alb.bmp_api.dns_name
    origin_id   = "bmpALB"
    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }


  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  ordered_cache_behavior {
    path_pattern     = "/api/*"
    allowed_methods  = ["HEAD", "DELETE", "POST", "GET", "OPTIONS", "PUT", "PATCH"]
    cached_methods   = ["GET", "HEAD", "OPTIONS"]
    target_origin_id = "bmpALB"
    viewer_protocol_policy = "redirect-to-https"

    forwarded_values {
      query_string = true
      headers      = ["Origin"]
      cookies {
        forward = "all"
      }
    }
  }

  default_cache_behavior {
    target_origin_id = "bmpWebsite"

    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    compress = true
    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 7200
    max_ttl                = 86400
  }

  aliases = ["www.blackmarketpuzzles.com"]

  viewer_certificate {
    ssl_support_method = "sni-only"
    acm_certificate_arn = "arn:aws:acm:us-east-1:975414870563:certificate/acd57f47-f2d2-4391-a69d-a93f9867801a"

  }

  custom_error_response {
    error_caching_min_ttl = 300
    error_code            = 403
    response_code         = 200
    response_page_path    = "/index.html"
  }
}

data "aws_route53_zone" "bmp_hosted_zone" {
  name = "blackmarketpuzzles.com"
}

resource "aws_route53_record" "www-a" {
  zone_id = "${data.aws_route53_zone.bmp_hosted_zone.zone_id}"
  name    = "www.blackmarketpuzzles.com"
  type    = "A"

  alias {
    name                   = "${aws_cloudfront_distribution.blackmarket_puzzles.domain_name}"
    zone_id                = "${aws_cloudfront_distribution.blackmarket_puzzles.hosted_zone_id}"
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "www-aaaa" {
  zone_id = "${data.aws_route53_zone.bmp_hosted_zone.zone_id}"
  name    = "www.blackmarketpuzzles.com"
  type    = "AAAA"

  alias {
    name                   = "${aws_cloudfront_distribution.blackmarket_puzzles.domain_name}"
    zone_id                = "${aws_cloudfront_distribution.blackmarket_puzzles.hosted_zone_id}"
    evaluate_target_health = false
  }
}

data "aws_iam_policy_document" "bmp_client_s3_policy" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.bmp_client.arn}/*"]

    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.oai.iam_arn]
    }
  }
}

resource "aws_s3_bucket_policy" "bmp_client_bucket_policy" {
  bucket = aws_s3_bucket.bmp_client.id
  policy = data.aws_iam_policy_document.bmp_client_s3_policy.json
}

resource "aws_s3_bucket_public_access_block" "cf_s3_bucket_acl" {
  bucket = aws_s3_bucket.bmp_client.id

  block_public_acls   = true
  block_public_policy = true
}

