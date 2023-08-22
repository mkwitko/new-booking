import '@/config/awsConfig'
import { Auth } from 'aws-amplify'

export function AuthApi() {
  const login = async ({
    username,
    password,
  }: {
    username: string
    password: string
  }) => {
    try {
      await Auth.signIn(username, password)
    } catch (err) {
      throw new Error('Credenciais Inválidas')
    }
  }

  const logout = async () => {
    try {
      Auth.signOut()
    } catch (err: any) {
      throw new Error('Erro ao fazer logout')
    }
  }

  const signUp = ({ signUpData }: { signUpData: any }) => {
    Auth.signUp(signUpData)
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  }

  const confirmSignUp = ({
    username,
    confirmCode,
  }: {
    username: string
    confirmCode: string
  }) => {
    Auth.confirmSignUp(username, confirmCode)
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  }

  const resendCode = ({ username }: { username: string }) => {
    Auth.resendSignUp(username)
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  }

  const forgotPassword = ({ email }: { email: string }) => {
    Auth.forgotPassword(email)
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  }

  const forgotPasswordReset = ({
    email,
    code,
    newPassword,
  }: {
    email: string
    code: string
    newPassword: string
  }) => {
    Auth.forgotPasswordSubmit(email, code, newPassword)
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  }

  const isAuth = () => {
    return Auth.currentAuthenticatedUser()
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  }

  return {
    login,
    isAuth,
    signUp,
    logout,
    resendCode,
    confirmSignUp,
    forgotPassword,
    forgotPasswordReset,
  }
}
