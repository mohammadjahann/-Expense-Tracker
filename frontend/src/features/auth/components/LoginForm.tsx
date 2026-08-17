import { BiUser } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { LuLock } from "react-icons/lu";
import { FaEyeSlash } from "react-icons/fa";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";

export const LoginForm = () => {
    const { email, setEmail, password, setPassword, showPassword, setShowPassword, rememberMe, setRememberMe, error, isLoading, handleSubmit, } = useLogin();

    return (
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-500 to-emerald-600 p-6 text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-white/20 flex items-center justify-center mb-4">
                    <BiUser className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-white">از برگشتنت خوشحالیم</h1>
                <p className="text-teal-100 mt-2">وارد اکانت حسابدار شخصی خود شوید</p>
            </div>

            <div className="p-8">
                {error && (
                    <div className="mb-6 p-3 bg-red-50 text-red-700 rounded-lg flex items-center">
                        <span className="break-words">{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Email */}
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            ایمیل
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 right-1 flex items-center pointer-events-none text-gray-400">
                                <MdEmail className="size-5" />
                            </div>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="example@mail.com"
                                className="w-full pr-10 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-300 focus:border-teal-500"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            پسورد
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 right-1 flex items-center pointer-events-none text-gray-400">
                                <LuLock className="size-5" />
                            </div>
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="*******"
                                className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-300 focus:border-teal-500"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 hover:text-gray-600"
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? <FaEyeSlash className="size-5" /> : <BsEye className="size-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Remember Me */}
                    <div className="mb-6 flex items-center">
                        <input
                            id="remember"
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                        />
                        <label htmlFor="remember" className="mr-2 block text-sm text-gray-700">
                            من را به خاطر بسپار
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full bg-gradient-to-r from-teal-500 to-emerald-600 text-white py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all flex items-center justify-center ${isLoading ? "opacity-80 cursor-not-allowed" : ""
                            }`}
                    >
                        {isLoading ? "درحال وارد شدن..." : "ورود به اکانت"}
                    </button>
                </form>

                {/* Sign up call to action */}

                <div className="mt-8 text-center">
                    <p className="text-gray-600">
                        اکانت ندارید ؟ {" "}
                        <Link to={'/signup'} className="font-medium text-teal-600 hover:underline">
                            ساخت اکانت
                        </Link>
                    </p>

                </div>

            </div>
        </div>
    );
};