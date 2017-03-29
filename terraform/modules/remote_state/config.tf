provider "aws" { region = "eu-west-1" }

data "terraform_remote_state" "s3_backend" {
    backend = "s3"
    config {
        bucket = "${var.state-file-bucket}"
        key = "${var.project}/terraform.tfstate"
        region = "eu-west-1"
    }
}
