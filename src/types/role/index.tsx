export type TParamsGetRoles = {
  limit: number
  page: number,
  search?: string
}

export type TParamsCreateRole = {
  name: string
}

export type TParamsEditRole = {
  name: string
  id: string
}

export type TParamsDeleteRole = {
  name: string
  id: string
}