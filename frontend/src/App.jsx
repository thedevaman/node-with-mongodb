import { Edit, Plus, Trash2, User2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {Input, Form, Modal, DatePicker, Button } from 'antd';

function App() {

  const [users, setUsers] = useState([])
  const [open,setOpen] = useState(false)

  const fetchUser = async() =>{
const res = await fetch("http://localhost:8080/users-list")
const data = await res.json()
setUsers(data)
  }
  useEffect(()=>{
   fetchUser()
  },[])

  const createUser = (values)=>{
    values.date = values.date.toDate()
  console.log(values)
  }
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
            <th>Actions</th>
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
            <td>
              <div className='space-x-3'>
                <Button icon={<Edit className='w-4 h-4'/>} type='primary'/>
                <Button icon={<Trash2 className='w-4 h-4'/>} type='primary' danger/>
              </div>
            </td>
          </tr>
            ))
          }
        </tbody>
     </table>
      </div>
    <Modal open={open} footer={null} onCancel={()=>setOpen(false)}>
      <h1 className='text-lg font-medium mb-3'>New User</h1>
      <Form layout='vertical' onFinish={createUser}>
        <Form.Item
        label="Fullname"
        name="fullname"
        rules={[{required:true}]}
        >
          <Input
          size="large"
          placeholder="Fullname"
          />
        </Form.Item>

         <Form.Item
        name="email"
        label="E-Mail"
        rules={[{required:true,type:'email'}]}
        >
          <Input
          size="large"
          placeholder="abc@gmail.com"
          />
        </Form.Item>

         <Form.Item
         label="Mobile No."
        name="mobile_no"
        rules={[{required:true}]}
        >
          <Input
          size="large"
          placeholder="Mobile No."
          />
        </Form.Item>

         <Form.Item
         label="Role"
        name="role"
        rules={[{required:true}]}
        >
          <Input
          size="large"
          placeholder="Role"
          />
        </Form.Item>

          <Form.Item
         label="Date"
        name="date"
        rules={[{required:true,type:'date'}]}
        >
          <DatePicker
          size="large"
          placeholder="DD/MM/YYYY"
          className='w-full'
          />
        </Form.Item>

        <Form.Item>
          <Button size='large' type='primary' htmlType='submit'>Submit</Button>
        </Form.Item>
      </Form>
    </Modal>
    </div>
  )
}

export default App
