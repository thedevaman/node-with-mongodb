import { Edit, Plus, Trash2, User2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {Input, Form, Modal, DatePicker, Button, message, Popconfirm } from 'antd';
import { useForm } from 'antd/es/form/Form';
import moment from 'moment'
const api = "http://localhost:8080/"

function App() {

  const [users, setUsers] = useState([])
  const [open,setOpen] = useState(false)
  const [form] = useForm()
  const [updateCount,setUpdateCount] = useState(0) 
  const [editId,setEditId] = useState(null)

  const handleClose = ()=>{
    setEditId(null)
    setOpen(false)
    form.resetFields()
  }

  const fetchUser = async() =>{
const res = await fetch(api + "users-list")
const data = await res.json()
setUsers(data)
  }
  useEffect(()=>{
   fetchUser()
  },[updateCount])

  const deleteUser = (id)=>{
  
   fetch(url,{method:'DELETE'})
   .then((res)=>res.json()).then((data)=>{
     setUpdateCount(updateCount+1)
      message.success(data.message)
   })
  }

  const editUser = (item)=>{
    item.date = moment(item.date)
    setOpen(true)
    form.setFieldsValue(item)
    setEditId(item._id)
  }

  const createUser = (values)=>{
    values.date = values.date.toDate()
    fetch(api + "users",{
      method:'POST',
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify(values)
    })
    .then((res)=>res.json())
    .then((data)=>{
      message.success(data.message)
      handleClose()
      setUpdateCount(updateCount+1)

    })

    handleClose
  }

  const saveUser = (value) =>{
    const id = editId
    value.date = moment(value.date.toDate())
      const editurl = `${api}users-update/${id}`
      fetch(editurl,{
        method:'PUT',
        body : JSON.stringify(value),
        headers: {'content-Type':'application/json'}
      })
      .then((res)=>res.json())
      .then((data)=>{
       message.success(data.message)
       handleClose()
       setUpdateCount(updateCount+1)
      })
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
            <th className='text-center'>Sr.No</th>
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
            <td className='text-center'>{index+1}</td>
            <td className='p-4 capitalize'>{item.fullname}</td>
            <td>{item.email}</td>
            <td>{item.mobile_no}</td>
            <td>{item.role}</td>
            <td>{moment(item.date).format('MMM DD, YYYY hh:mm A')}</td>
            <td>
              <div className='space-x-3'>
                <Button onClick={()=>editUser(item)} icon={<Edit className='w-4 h-4'/>} type='primary'/>
                <Popconfirm onConfirm={()=>deleteUser(item._id)}  title="Delete user"
                 description="Are you sure you want to delete this user?">
                <Button icon={<Trash2 className='w-4 h-4'/>} type='primary' danger/>
                </Popconfirm>
              </div>
            </td>
          </tr>
            ))
          }
        </tbody>
     </table>
      </div>
    <Modal open={open} footer={null} onCancel={handleClose}>
      <h1 className='text-lg font-medium mb-3'>New User</h1>
      <Form layout='vertical' onFinish={ editId ? saveUser : createUser} form={form}>
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
         {
          editId ? 
           <Button size='large' type='primary' htmlType='submit'>Save</Button>
          :
           <Button size='large' type='primary' htmlType='submit'>Submit</Button>
         }

         
        </Form.Item>
      </Form>
    </Modal>
    </div>
  )
}

export default App
