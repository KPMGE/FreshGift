export interface HttpResponse<T = any> {
  statusCode: number
  data: T
}

export interface HttpRequest<T = any> {
  body?: T
}
