import { Plus, User2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Modal } from 'antd';

function App() {

  const [users, setUsers] = useState([])
  const [open,setOpen] = useState(false)

  const fetchUser = async() =>{
const res = await fetch("http://localhost:8080/users-list")
const data = await res.json()
console.log(data)
setUsers(data)
  }
  useEffect(()=>{
   fetchUser()
  },[])
  return (
    <div className='bg-blue-600 min-h-screen py-24'>
      <div className='w-9/12 mx-auto bg-white p-8 rounded-xl'>
      <div className='mb-8 flex items-center justify-between'>
        <div className='w-9/12'>
          <h1 className='text-3xl font-bold'>User Crud</h1>
          <p className='text-black/80 mt-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam necessitatibus molestiae nisi officiis quae ex tenetur quasi cum magni, dolore nostrum reprehenderit perspiciatis, sapiente id vero voluptatum eveniet aperiam earum.</p>
        </div>
        <button onClick={()=>setOpen(true)} className='active:scale-90 duration-300 transition flex items-center gap-1 bg-rose-600 px-8 py-2.5 rounded font-medium text-white'>
          <Plus className='w-4 h-4'/>
          New User
        </button>
      </div>
     <table className='w-full text-left'>
        <thead>
          <tr className='bg-gray-300'>
            <th className='p-4'>Fullname</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Role</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((item,index)=>(
          <tr key={index} className='border-b border-b-gray-200 text-black/80'>
            <td className='p-4'>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.contact}</td>
            <td>{item.role}</td>
            <td>june 4, 2026</td>
          </tr>
            ))
          }
        </tbody>
     </table>
      </div>
    <Modal open={open} footer={null} onCancel={()=>setOpen(false)}>
      <h1 className='text-lg font-medium mb-3'>New User</h1>
    </Modal>
    </div>
  )
}

export default App
