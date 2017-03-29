output "s3-user" { value = "${aws_iam_user.s3_user.name}" }
output "s3-user-access-key" { value = "${aws_iam_access_key.access-key.id}" }
output "s3-user-secret-key" { value = "${aws_iam_access_key.access-key.encrypted_secret}" }