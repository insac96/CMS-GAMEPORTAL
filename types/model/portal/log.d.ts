import type { Types } from 'mongoose'

export interface IDBPortalLogUser {
  _id: Types.ObjectId
  createdAt: Date
  updatedAt: Date
  
  user: Types.ObjectId
  type: string
  action: string
}

export interface IDBPortalLogAdmin {
  _id: Types.ObjectId
  createdAt: Date
  updatedAt: Date
  
  user: Types.ObjectId
  type: string
  action: string
}