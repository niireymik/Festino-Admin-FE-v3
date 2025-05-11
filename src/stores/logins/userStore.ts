
import { alertError, api } from "@/utils/api"
import { isUUID } from "@/utils/utils"
import { create } from "zustand"
import { UserStore } from "@/types/logins/user.types"
import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const useUserStore = create<UserStore>((set, get) => ({
    isError: false,
    errorMessage: '',
    userId: '',
    password: '',
    userOwnBoothId: '',
    isValidate: false,
    isAdmin: false,

    setUserId: (id) => set({ isError: false, userId: id }),
    setPassword: (pw) => set({ isError: false, password: pw }),
    setIsError: (err) => set({ isError: err }),
    setErrorMessage: (msg) => set({ errorMessage: msg }),

    // 유저 권한 확인
    isUserValid: async () => {
        try {
            const res = await api.post('/admin/user/role')
            const isAdmin = res.data.role
            const isValidate = res.data.success
            set({ isAdmin, isValidate })
            return { isAdmin, isValidate }
        } catch (e) {
            alertError('User Validate Error, Please try Login again!')
            set({ isAdmin: false, isValidate: false })
            return { isAdmin: false, isValidate: false }
        }
    },

    // 유저 부스 ID 확인
    getUserOwnBoothId: async () => {
        try {
            const res = await api.get('/admin/user/booth')
            if (res.data.success) {
                const boothId = res.data.boothId
                set({ userOwnBoothId: boothId })
                cookies.set('boothId', boothId, {path: '/'});
                return ''
            } else {
                set({ userOwnBoothId: '' })
                return ''
            }
        } catch (e) {
            set({ userOwnBoothId: '' })
            return ''
        }
    },

    // 부스 소유 여부 확인
    isUserOwnBooth: async (boothId: string) => {
        if (!isUUID(boothId)) return false

        const { isAdmin } = get()

        if (isAdmin) return true

        try {
            const res = await api.get('/admin/user/booth')
            const data = res.data
            if (data.success) {
                const ownedId = res.data.boothId
                set({ userOwnBoothId: ownedId })
                return boothId === ownedId
            } else {
                set({ userOwnBoothId: '' })
                return false
            }
        } catch (e) {
            set({ userOwnBoothId: '' })
            return false
        }
    },

    // 로그인
    login: async () => {
        const { userId, password, isUserValid } = get()
        try {
            const res = await api.post('/admin/user/login', {
                adminId: btoa(userId),
                passWord: btoa(password),
            })
            const isSuccess = res.data.success
            const message = res.data.message

            if (isSuccess) {
                set({ isError: false, errorMessage: '' })
                await isUserValid()
            } else {
                set({
                    isError: true,
                    errorMessage: message,
                    isAdmin: false,
                    isValidate: false,
                    userOwnBoothId: '',
                })
            }
            return isSuccess
        } catch (error) {
            set({
                isError: true,
                errorMessage: String(error),
                isAdmin: false,
                isValidate: false,
                userOwnBoothId: '',
            })
            get().logout()
            return false
        }
    },

    // 로그아웃
    logout: async () => {
        try {
            await api.post('/admin/user/logout')
        } catch (e) {
            alertError('error')
            console.error(e)
        } finally {
            set({
                isAdmin: false,
                isValidate: false,
                userOwnBoothId: '',
            })
        }
    },
}))
