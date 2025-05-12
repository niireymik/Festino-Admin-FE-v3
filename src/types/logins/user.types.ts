export interface UserStore {
    userId: string
    password: string
    isAdmin: boolean
    isValidate: boolean
    userOwnBoothId: string
    isError: boolean
    errorMessage: string

    setUserId: (id: string) => void
    setPassword: (pw: string) => void
    setIsError: (err: boolean) => void
    setErrorMessage: (msg: string) => void

    login: () => Promise<boolean>
    logout: () => Promise<void>
    isUserValid: () => Promise<{ isAdmin: boolean; isValidate: boolean }>
    getUserOwnBoothId: () => Promise<string>
    isUserOwnBooth: (boothId: string) => Promise<boolean>
}
