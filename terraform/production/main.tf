module "remote_state" {
  source = "../modules/remote_state"
  project = "${var.project}"
  state-file-bucket = "${var.state-file-bucket}"
}

module "S3_bucket" {
  source = "../modules/S3_bucket"
  project = "${var.project}"
  environment = "${var.environment}"
  state-file-bucket = "${var.state-file-bucket}"
  pgp_key = "${var.pgp_key}"
}

module "site-main" {
   source = "github.com/eHealthAfrica/terraform-website-s3-cloudfront-route53//site-main"
   region = "eu-west-1"
   domain = "${var.project}-${var.environment}.${var.domain_name}"
   duplicate-content-penalty-secret = "${var.project}-${var.environment}-secret"
   deployer = "${var.project}-${var.environment}-user"
   acm-certificate-arn = "${var.cert_arn}"
   not-found-response-path = "/404.html"
}

module "dns-cname" {
   source = "github.com/eHealthAfrica/terraform-website-s3-cloudfront-route53//r53-cname"

   domain = "${var.project}-${var.environment}.${var.domain_name}"
   route53_zone_id = "${var.zone_id}"
   target = "${module.site-main.website_cdn_hostname}"
}
