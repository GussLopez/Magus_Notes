import { useForm, SubmitHandler } from "react-hook-form";
import IUser from "../interfaces/IUser";


function Login() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<IUser>();
    const onSubmit: SubmitHandler<IUser> = data => console.log(data);
    return (
        <>
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
                <div className="box-border w-[400px] p-5 flex flex-col shadow bg-white rounded-2xl">
                    <h1 className="text-center text-3xl font-bold text-cyan-700 my-5">TimeBoxing ⏰</h1>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        {/* register your input into the hook by invoking the "register" function */}
                        <input type="email" {...register("email")} placeholder="Email" className="block p-3 my-6 w-full rounded border-gray-black border-2 border-solid border-gray-200" />

                        {/* include validation with required or other standard HTML validation rules */}
                        <input type="password" {...register("password", { required: true })} placeholder="Password" className="block p-3 my-6 w-full rounded  border-2 border-solid border-gray-200" />
                        {/* errors will return when field validation fails  */}
                        {errors.password && <span className="block my-5 py-2 rounded text-center bg-red-600 text-white">Debe ingresar una contraseña</span>}

                        <input type="submit" className="bg-cyan-500 px-3 py-2 rounded w-full cursor-pointer hover:bg-cyan-600 transition-colors text-white" />
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login