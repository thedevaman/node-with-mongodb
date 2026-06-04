import { User2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'

function App() {

  const [users, setUsers] = useState([])

  const fetchUser = async() =>{
const res = await fetch("http://localhost:8080/users-list")
const data = await res.json()
setUsers(data)
  }
  useEffect(()=>{
   fetchUser()
  },[])
  return (
    <div className='bg-gray-200 min-h-screen py-12'>
      <div className='w-9/12 mx-auto rounded-xl p-8 bg-white shadow-lg'>
      <h1 className='text-4xl font-semibold'>User's Crud</h1>
      <p className='text=black/75 mt-3'>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint, adipisci laborum. Rem quia illo dolor accusantium odio, aliquid reprehenderit dolorum laborum mollitia quae ut sed exercitationem dolore in sapiente molestias.
         </p>
        <div className='grid grid-cols-4 gap-8 mt-8'>
          {
            users.map((item,index)=>(
              <div key={index} className='border p-6 rounded-lg border-gray-300 flex flex-col items-center justify-center'>
                <User2 className='w-16 h-16' />
                <h1 className='text-black/80 font-medium text-lg'>{item.name}</h1>
                <button className='bg-green-400 text-white font-medium px-2 py-1 rounded'>{item.role}</button>
              </div>
            ))
          }
        </div>
     
      </div>
    </div>
  )
}

export default App
