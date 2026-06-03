import { User2 } from 'lucide-react'
import React, { useEffect } from 'react'

function App() {
  useEffect(()=>{
   fetch("http://localhost:8080/users-list")
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
            Array(12).fill(0).map((item,index)=>(
              <div key={index} className='border p-6 rounded-lg border-gray-300 flex flex-col items-center justify-center'>
                <User2 className='w-16 h-16' />
                <h1 className='text-black/80 font-medium text-lg'>Aman</h1>
                <button className='bg-green-400 text-white font-medium px-2 py-1 rounded'>Developer</button>
              </div>
            ))
          }
        </div>
     
      </div>
    </div>
  )
}

export default App
