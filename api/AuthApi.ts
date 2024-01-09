import { WhoAmIResponse } from '@/interfaces/api/auth'
import Api from './base/Api'
import { AuthError, PayloadError } from './base/errors'
import { StaffMember } from '@/interfaces/api/admin/staff'

export default class AuthApi extends Api {
  async login(email: string, password: string): Promise<string> {
    const path = `/login`
    const body = {
      email,
      password,
    }

    try {
      const authTokenResponse = await this.query({ path, body, method: 'POST' })
      return authTokenResponse.token.plainTextToken
    } catch (error: unknown) {
      if (error instanceof AuthError) {
        throw new PayloadError(error.message, error.fieldErrors)
      }

      throw error
    }
  }

  async getCurrentUser(): Promise<StaffMember> {
    const currentUser = await this.query({ path: '/whoami' })
    return currentUser
  }
}
