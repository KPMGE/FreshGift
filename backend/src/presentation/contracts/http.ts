export interface HttpResponse<T = any> {
  statusCode: number
  data: T
}

export interface HttpRequest<T = any> {
  body?: T
}

export const serverError = (error: Error): HttpResponse => {
  return {
    statusCode: 500,
    data: error.message || "Unexpected error"
  }
}

export const ok = (data: any): HttpResponse => {
  return {
    statusCode: 200,
    data
  }
}

export const badRequest = (resource: string): HttpResponse => {
  return {
    statusCode: 404,
    data: resource
  }
}

export const resourceNotFoundError = (resource: string): HttpResponse => {
  return {
    statusCode: 404,
    data: resource
  }
}
