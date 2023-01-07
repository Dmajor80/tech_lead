import  React, { useContext, useEffect, useState } from 'react'
import { Container, TextField } from '@mui/material'
import { Button } from '@mui/material'
import Navbar from '../components/Navbar'
import {  useNavigate } from 'react-router-dom'
import { UserContext } from '../Context'


export default function Account() {

  const userContext = useContext(UserContext)

  
const navigate = useNavigate()
const [isEditing, setIsEditing] = useState(false)

const [values, setvalues] = useState({
  seller_city: userContext.user_city,
  seller_state: userContext.user_state,
})

console.log(values)


// handle submit edit
const handleEditSubmit = async (e) => {
  e.preventDefault()
  console.log(values);

  setIsEditing(false)
}
const handleInpputChange = (e) =>{
    setvalues({...values,[e.target.name]:e.target.value});
}

useEffect(() => {
    console.log(userContext)
    if (!userContext.user_city || !userContext.user_state) {
     navigate('/')  
    }  
  }, [])

 

  return (
    <>
      <div className=''>
        <Navbar />
        <Container maxWidth=''>
          {isEditing ? (
            <div className='text-black'>
              <form onSubmit={handleEditSubmit}>
                {/* we've added an h2 element */}
                <h2> Account</h2>
                {/* also added a label for the input */}

                <TextField
                  id='outlined-error'
                  label='seller_city'
                  onChange={(e) => {
                    setvalues({ ...values, [e.target.name]: e.target.value })
                  }}
                  name='seller_city'
                />
                <TextField
                  id='outlined-error'
                  label='seller_state'
                  name='seller_state'
                  onChange={(e) => {
                    setvalues({ ...values, [e.target.name]: e.target.value })
                  }}
                />
                {/* here we added an "update" button element - use the type="submit" on the button which will still submit the form when clicked using the handleEditFormSubmit function */}
                <Button type='submit'>Update</Button>
                {/* here we added a "Cancel" button to set isEditing state back to false which will cancel editing mode */}
                <Button onClick={() => setIsEditing(false)}>Cancel</Button>
              </form>
            </div>
          ) : (
            <div className=''>
              
              <div className='text-black'>
                <form onSubmit={handleEditSubmit}>
                  {/* we've added an h2 element */}
                  <h2>Edit Account</h2>
                  {/* also added a label for the input */}

                  <TextField
                    id='outlined-error'
                    label='seller_city'
                    
                     value={values.seller_city}
                    onChange={(e) => {
                      handleInpputChange(e)
                    }}
                    name='seller_city'
                  />
                  <TextField
                    id='outlined-error'
                    label='seller_state'
                    name='seller_state'
                    value={values.seller_state}
                    onChange={(e) => {
                      handleInpputChange(e)
                    }}
                  />
                  {/* here we added an "update" button element - use the type="submit" on the button which will still submit the form when clicked using the handleEditFormSubmit function */}
                  <Button type='submit'>Update</Button>
                </form>
              </div>
            </div>
          )}
        </Container>
      </div>
    </>
  )
}


