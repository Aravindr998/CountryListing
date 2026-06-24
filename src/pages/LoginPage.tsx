import { useState } from "react"
import { Link, useNavigate } from "react-router"

const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/

const LoginPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        keepSignedIn: false
    })
    const [errors, setErrors] = useState<Record<string, string>>({})

    const navigate = useNavigate()
    
    const handleChange = (key: string, value: string | boolean) => {
        setErrors(prevState => {
            return {
                ...prevState,
                [key]: ""
            }
        })
        setFormData(prevState => {
            return {
                ...prevState,
                [key]: value
            }
        })
    }

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault()
        setErrors({})
        const {error, hasErrors} = handleValidate()
        if (hasErrors) {
            setErrors(error)
            return
        }
        localStorage.setItem("token", "test")
        navigate("/")
    }

    const handleValidate = () => {
        let hasErrors = false
        const error: Record<string, string> = {}
        if (!formData.username.trim()) {
            hasErrors = true
            error.username = "Username cannot be empty"
        }
        if (!formData.password.trim()) {
            hasErrors = true
            error.password = "Password cannot be empty"
        } else {
            if (formData.password.length < 8) {
                hasErrors = true
                error.password = "Password must have atleast 8 characters"
            }
            if (!passwordRegex.test(formData.password)) {
                hasErrors = true
                error.password = "Invalid password"
            }
        }
        return {
            error,
            hasErrors
        }
    }
    
    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <div className="flex gap-5 justify-around items-center w-[75%]">
        <div className="text-[#3C3C3C] w-full sm:w-[40%] flex flex-col gap-5">
            <h1 className="noto-sans-700 text-2xl">Sign In</h1>
            <div className="flex gap-2">
                <p className="noto-sans-700">New User?</p>
                <Link className="text-[#587FFF] noto-sans-600" to={"/register"}>Create an account</Link>
            </div>
            <div>
                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <input type="text" placeholder="Username or Email" className="border-2 border-solid px-3 py-2 form-input" value={formData.username} onChange={(e) => handleChange("username", e.target.value)} />
                        {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                    </div>
                    <div className="flex flex-col">
                        <input type="text" placeholder="Password" className="border-2 border-solid px-3 py-2 form-input" value={formData.password} onChange={(e) => handleChange("password", e.target.value)} />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>
                    <div className="flex gap-1 noto-sans-700">
                        <input type="checkbox" id="keep_me_signed_in" checked={formData.keepSignedIn} onChange={() => handleChange("keepSignedIn", !formData.keepSignedIn)} />
                        <label htmlFor="keep_me_signed_in">Keep me signed in</label>
                    </div>
                    <button className="bg-[#3C3C3C] px-5 py-2 text-white">Sign In</button>
                </form>
                <div className="mt-5">
                    <div className="flex justify-between items-center">
                        <hr className="flex-1" /><p className="flex-2s">or sign in with</p><hr className="flex-1" />
                    </div>
                    <div>
                        <img />
                        <img />
                        <img />
                        <img />
                    </div>
                </div>
            </div>
        </div>
        <div className="hidden sm:block">
            <img src="https://picsum.photos/200/300" />
        </div>
    </div>
        </div>
    )
}

export default LoginPage