import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useUserStore } from "@/stores/logins/userStore"
import IconLogo from "@/components/icons/IconLogo"

const LoginPage: React.FC = () => {
    const {
        setPassword,
        setUserId,
        setIsError,
        login,
        logout,
        userId,
        password,
        isError,
    } = useUserStore()

    const [isSubmit, setIsSubmit] = useState(false)
    const navigate = useNavigate()

    const handleInputId = (e: React.ChangeEvent<HTMLInputElement>) => {
        // 영문자, 숫자, 언더스코어(_), 하이픈(-) 만 허용하고 20자로 제한
        const input = e.target.value
        const sanitizedInput = input.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 20)
        e.target.value = sanitizedInput
        setUserId(sanitizedInput)
    }

    const handleInputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        // 공백을 제외한 모든 문자를 허용하고 20자로 제한
        const input = e.target.value
        const sanitizedInput = input.replace(/\s/g, '').slice(0, 20)
        e.target.value = sanitizedInput
        setPassword(sanitizedInput)
    }

    const handleClickSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (isSubmit) return
        if (!userId || !password) {
            setIsError(true)
            alert('아이디와 비밀번호를 입력해주세요.')
            return
        }
        setIsSubmit(true)
        const isSuccess = await login()
        setIsSubmit(false)

        if (isSuccess) {
            navigate('/') // '/booth-lists'
        } else {
            alert('아이디와 비빌번호를 다시 확인해주세요.')
            return
        }
        
        setUserId('')
        setPassword('')
    }
    return (
        <>
            <div className='flex flex-col justify-center items-center w-full h-full overflow-hidden'>
                <div className='text-primary-900 font-semibold pb-[60px]'>
                    <div className='w-[120px] h-[91px]'></div>
                </div>

                <form onSubmit={handleClickSubmit}>
                    <div className='w-[630px] h-[500px] bg-white flex flex-col justify-between items-center shadow-md rounded-2xl py-14 px-16'>
                        <div className='text-primary-900 text-2xl font-semibold'>
                            <IconLogo />
                        </div>
                        <div className='flex flex-col w-full gap-[20px]'>
                            <div className='flex justify-between w-full items-center'>
                                <div className='text-md'>아이디</div>
                                <input
                                    lang='en'
                                    autoFocus
                                    autoComplete='username'
                                    type='text'
                                    className={`w-[390px] h-[55px] focus:border-primary-900 rounded-xl border-[1px] px-[20px] text-sm ${
                                        isError ? 'border-red-700' : ''
                                    }`}
                                    placeholder='아이디를 입력하세요.'
                                    maxLength={20}
                                    onChange={handleInputId}
                                    value={userId}
                                />
                            </div>
                            <div className='flex justify-between w-full items-center'>
                                <div className='text-md'>비밀번호</div>
                                <input
                                    type='password'
                                    autoComplete='new-password'
                                    className={`w-[390px] h-[55px] focus:border-primary-900 rounded-xl border-[1px] px-[20px] text-sm ${
                                        isError ? 'border-red-700' : ''
                                    }`}
                                    placeholder='비밀번호를 입력하세요.'
                                    maxLength={20}
                                    onChange={handleInputPassword}
                                    value={password}
                                />
                            </div>
                        </div>
                        <div className='flex flex-col justify-center items-center w-full gap-[30px]'>
                            <button
                                className='text-lg is-button w-full h-[55px] flex items-center justify-center'
                                type='submit'>
                                완료
                            </button>
                            <div
                                className='text-md text-secondary-900 underline cursor-pointer'
                                onClick={logout}>
                                Cannot Login?
                            </div>
                        </div>
                    </div>
                </form>

                <div className='w-[600px] h-[150px] bg-gray-200 mt-[50px] mb-[75px] flex items-center justify-center'>
                    불쌍한 개발자에게 커피를 사주세요... 스타벅스로
                </div>
            </div>
        </>
    )
}

export default LoginPage
