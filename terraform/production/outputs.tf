output "s3-user" { value = "${module.S3_bucket.s3-user}" }
output "s3-user-access-key" { value = "${module.S3_bucket.s3-user-access-key}" }
output "s3-user-secret-key" { value = "${module.S3_bucket.s3-user-secret-key}" }
output "website_cdn_hostname" { value = "${module.site-main.website_cdn_hostname}"}
output "website_cdn_zone_id" { value = "${module.site-main.website_cdn_zone_id}"}
