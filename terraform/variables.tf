variable "review_env_vars" {
  type      = map(string)
  sensitive = true
  default   = {}
}
