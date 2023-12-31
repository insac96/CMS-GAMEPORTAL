import md5 from 'md5'
import type { Mongoose } from 'mongoose'
import type { IDBPortalUser, IDBPortalUserLogin } from '~~/types'

export const DBPortalUser = (mongoose : Mongoose) => {
  const schema = new mongoose.Schema<IDBPortalUser>({ 
    auth: {
      username: { type: String, required: true },
      password: { type: String, required: true },
      type: { type: Number, default: 0 },
      block: { type: Boolean, default: false },
      token: { type: String },
    },
  
    profile: {
      fullname: { type: String },
      email: { type: String },
      phone: { type: String },
      avatar: { type: String },
      address: { type: String },
    },

    referral: {
      code: { type: String },
      person: { type: mongoose.Schema.Types.ObjectId, ref: 'PortalUser', index: true },
      count: { type: Number, default: 0, index: true },
    },

    currency: {
      bean: { type: Number, default: 0, index: true },
      diamond: { type: Number, default: 0, index: true },
      exp: { type: Number, default: 0, index: true },
    },

    login: {
      month: { type: Number, default: 0, index: true },
      total: { type: Number, default: 0, index: true },
    },

    pay: {
      day: {
        money: { type: Number, default: 0, index: true },
        count: { type: Number, default: 0, index: true },
      },
      month: {
        money: { type: Number, default: 0, index: true },
        count: { type: Number, default: 0, index: true },
      },
      total: {
        money: { type: Number, default: 0, index: true },
        count: { type: Number, default: 0, index: true },
      }
    }
  }, {
    timestamps: true
  })

  schema.index({ 
    'auth.username': 'text', 
    'profile.fullname': 'text', 
    'profile.email': 'text', 
    'profile.phone': 'text' 
  })

  const model = mongoose.model('PortalUser', schema, 'PortalUser')

  const autoCreate = async () => {
    const admin = await model.count({ 'auth.username': 'admin' })
    if(admin == 0) await model.create({
      auth: {
        username: 'admin',
        password: md5('123123'),
        type: 2
      }
    })
  }
  autoCreate()

  return model 
}

export const DBPortalUserLogin = (mongoose : Mongoose) => {
  const schema = new mongoose.Schema<IDBPortalUserLogin>({ 
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'PortalUser' },
  }, {
    timestamps: true
  })

  const model = mongoose.model('PortalUserLogin', schema, 'PortalUserLogin')
  return model 
}