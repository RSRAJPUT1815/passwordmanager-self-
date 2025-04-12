import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';

const Manager = () => {
    const [passwordArray, setpasswordArray] = useState([])
    const [form, setform] = useState({ site: "", password: "", username: "" })
    useEffect(() => {
        let password = localStorage.getItem('password')
        if (password) {
            setpasswordArray(JSON.parse(password))

        }

    }, [])

    const copyText = (text) => {
        navigator.clipboard.writeText(text)
        toast('Text is copied', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
    }
    const editpass= (e) => {
        setform(passwordArray.filter(item =>item.id ===e)[0])
        setpasswordArray(passwordArray.filter(item=>item.id !== e))
        
        
      
    }
    
    const deletepass= (e) => {
        
        let c = confirm("Do you wanted to delete it")
        if (c) {
            
            setpasswordArray(passwordArray.filter(item=>item.id !== e))
            localStorage.setItem("password",JSON.stringify(passwordArray.filter(item=>item.id !== e)))
            toast('deleted successfully', {
                position: "top-right",
                autoClose: 1200,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
      
    }
    




    const savepassword = () => {
        if (form.site.length >3 && form.password.length >3 && form.username.length >3) {
            
            setpasswordArray([...passwordArray, {...form ,id: uuidv4()}])
            localStorage.setItem("password", JSON.stringify([...passwordArray, {...form ,id: uuidv4()}]))
            setform({ site: "", password: "", username: "" })
            toast('Saved successfully', {
                position: "top-right",
                autoClose: 1200,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }else{
            toast('minimum 4 characters required', {
                position: "top-right",
                autoClose: 1200,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
    }


    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div className='bg-black min-h-screen  '>
                <div className='h-72 flex justify-center items-center flex-col gap-3 '>

                    <div className=" w-[70vw]  h-8">
                        <input value={form.site} onChange={handleChange} className='w-full rounded-lg outline-none px-3 bg-black text-white border-2 border-teal-600 h-full' type="text" name="site" id="site" />
                    </div>
                    <div className='w-[70vw] h-8 flex gap-2'>
                        <input value={form.username} onChange={handleChange} className='h-full w-1/2 rounded-lg outline-none px-3 bg-black text-white border-2 border-teal-600' type="text" name="username" id="username" />
                        <input value={form.password} onChange={handleChange} className='h-full w-1/2 rounded-lg outline-none px-3 bg-black text-white border-2 border-teal-600' type="text" name="password" id="password" />
                    </div>
                    <button onClick={savepassword} className='bg-cyan-700 py-1 rounded-xl px-5'>Save</button>
                </div>
                <div className="passwords text-emerald-800   ">
                    <h2 className='font-bold text-xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div className='text-sm'> No passwords to show</div>}
                    {passwordArray.length != 0 && <table className="table-auto text-xs w-full rounded-md overflow-hidden mb-10">
                        <thead className='text-emerald-300 '>
                            <tr>
                                <th className='py-3'>Site</th>
                                <th className='py-3'>Username</th>
                                <th className='py-3'>Password</th>
                                <th className='py-4'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className=' font-bold'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='max-w-20  text-center '>
                                        <div className='flex items-center justify-center gap-1 '>
                                            <div className='overflow-hidden'>
                                            <a href={item.site} target='
                                            _blank'>{item.site}</a>
                                            
                                            </div>
                                            <div className="copy" onClick={() => { copyText(item.site) }}>

                                                <span className="material-symbols-outlined text-lg cursor-pointer">
                                                    file_copy
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='flex items-center justify-center'>
                                            {item.username}
                                            <div className="copy" onClick={() => { copyText(item.username) }}>

                                                <span className="material-symbols-outlined text-lg cursor-pointer">
                                                    file_copy
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='flex items-center justify-center'>
                                            {item.password}
                                            <div className="copy" onClick={() => { copyText(item.password) }}>

                                                <span className="material-symbols-outlined text-lg cursor-pointer">
                                                    file_copy
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='flex items-center justify-center'>

                                            <span className="material-symbols-outlined text-lg cursor-pointer "onClick={()=>{editpass(item.id)}}>
                                                edit
                                            </span>
                                            <span className="material-symbols-outlined text-lg cursor-pointer"onClick={()=>{deletepass(item.id)}}>
                                                delete
                                            </span>

                                        </div>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                    }
                </div>
            </div>
        </>
    )
}

export default Manager
