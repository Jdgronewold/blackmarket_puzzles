# take from https://section411.com/2019/07/hello-world/

# The assume_role_policy field works with the following aws_iam_policy_document to allow
# ECS tasks to assume this role we're creating.

data "aws_secretsmanager_secret" "bmp_db_secrets" {
  arn = "arn:aws:secretsmanager:us-east-1:975414870563:secret:bmp_db_creds-qrbjuy"
}

resource "aws_iam_role" "bmp_api_task_execution_role" {
  name               = "bmp-api-task-execution-role"
  assume_role_policy = data.aws_iam_policy_document.ecs_task_assume_role.json
}

data "aws_iam_policy_document" "ecs_task_assume_role" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

# change task definition image to this eventually
resource "aws_ecr_repository" "bmp_api" {
  name = "bmp-api"
}

# Normally we'd prefer not to hardcode an ARN in our Terraform, but since this is
# an AWS-managed policy, it's okay.

data "aws_iam_policy" "ecs_task_execution_role" {
  arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

data "aws_iam_policy" "aws_secrets_role" {
  arn = "arn:aws:iam::aws:policy/SecretsManagerReadWrite"
}
data "aws_iam_policy" "ecr_read_role" {
  arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryFullAccess"
}

# Attach the above policy to the execution role.
resource "aws_iam_role_policy_attachment" "ecs_task_execution_role" {
  role       = aws_iam_role.bmp_api_task_execution_role.name
  policy_arn = data.aws_iam_policy.ecs_task_execution_role.arn
}
resource "aws_iam_role_policy_attachment" "aws_secrets_role" {
  role       = aws_iam_role.bmp_api_task_execution_role.name
  policy_arn = data.aws_iam_policy.aws_secrets_role.arn
}
resource "aws_iam_role_policy_attachment" "ecr_read_role" {
  role       = aws_iam_role.bmp_api_task_execution_role.name
  policy_arn = data.aws_iam_policy.ecr_read_role.arn
}

# Logs
resource "aws_cloudwatch_log_group" "bmp_api" {
  name = "/ecs/bmp-api"
}

# Here's our task definition, which defines the task that will be running to provide
# our service. The idea here is that if the service decides it needs more capacity,
# this task definition provides a perfect blueprint for building an identical container.

resource "aws_ecs_task_definition" "bmp_api" {
  family = "blackmarketapi"

  container_definitions = <<EOF
  [
    {
      "name": "bmp-api",
      "image": "975414870563.dkr.ecr.us-east-1.amazonaws.com/blackmarket-puzzles:latest",
      "portMappings": [
        {
          "containerPort": 3001
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-region": "us-east-1",
          "awslogs-group": "/ecs/bmp-api",
          "awslogs-stream-prefix": "ecs"
        }
      },
      "secrets": [
        {
          "name": "db_creds",
          "valueFrom": "${data.aws_secretsmanager_secret.bmp_db_secrets.arn}"
        }
      ],
      "environment": [
        {
          "name": "env",
          "value": "production"
        }
      ]
    }
  ]
  EOF
  execution_role_arn = aws_iam_role.bmp_api_task_execution_role.arn

  # These are the minimum values for Fargate containers.
  cpu = 256
  memory = 512
  requires_compatibilities = ["FARGATE"]

  # This is required for Fargate containers (more on this later).
  network_mode = "awsvpc"
}

resource "aws_ecs_cluster" "bmp_app" {
  name = "bmp-app"
}

resource "aws_ecs_service" "bmp_api" {
  name            = "bmp-api"
  cluster         = aws_ecs_cluster.bmp_app.id
  task_definition = aws_ecs_task_definition.bmp_api.arn
  launch_type     = "FARGATE"
  desired_count = 1

  network_configuration {
    assign_public_ip = false

    security_groups = [
      aws_security_group.egress_all.id,
      aws_security_group.ingress_api.id,
      aws_security_group.rds_access_sg.id
    ]

    subnets = [
      aws_subnet.private_d.id,
      aws_subnet.private_e.id,
    ]
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.bmp_api.arn
    container_name   = "bmp-api"
    container_port   = "3001"
  }
}

resource "aws_lb_target_group" "bmp_api" {
  name        = "bmp-api"
  port        = 3001
  protocol    = "HTTP"
  target_type = "ip"
  vpc_id      = aws_vpc.app_vpc.id

  health_check {
    enabled = true
    path    = "/health"
  }

  depends_on = [aws_alb.bmp_api]
}

resource "aws_alb" "bmp_api" {
  name               = "bmp-api-lb"
  internal           = false
  load_balancer_type = "application"

  subnets = [
    aws_subnet.public_d.id,
    aws_subnet.public_e.id,
  ]

  security_groups = [
    aws_security_group.http.id,
    aws_security_group.https.id,
    aws_security_group.egress_all.id,
  ]

  depends_on = [aws_internet_gateway.igw]
}

resource "aws_alb_listener" "bmp_api_http" {
  load_balancer_arn = aws_alb.bmp_api.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.bmp_api.arn
  }
}

output "alb_url" {
  value = "http://${aws_alb.bmp_api.dns_name}"
}