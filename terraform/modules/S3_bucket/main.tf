resource "aws_iam_user" "s3_user" {
  name = "${var.project}-${var.environment}-user"
}

resource "aws_iam_access_key" "access-key" {
  user = "${aws_iam_user.s3_user.name}"
  pgp_key = "${var.pgp_key}"
}
