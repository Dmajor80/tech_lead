import { Button,  TextField } from '@mui/material'
import React, {  useContext, useState } from 'react'
import Box from '@mui/material/Box'
import api from '../config'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../Context'


export default function Login() {

     const [values, setvalues] = useState({username:'', password:'', })
     const [message, setMessage] = useState('')
     const navigate = useNavigate()
      const userContext = useContext(UserContext);
     const  handleSubmit = async(e) =>{
        e.preventDefault();
 

        try {
          const { data  } = await api.post('/auth', {
            ...values,
          })
          console.log(data);
          if(data.success){
            userContext.user_city=data.user.seller_city;
            userContext.user_state=data.user.seller_state;
            navigate('/home')
          }else{
            //display error
          }
        } catch (error) {
          console.log(error.response.data.error);
          // setMessage(error.response.data.error)
        }
  


}
     
  return (
    <div>
     

      <Box
        component='form'
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit}
      >
          <div>
            <TextField
            //   error
              id='outlined-error'
              label='Username'
              helpterText={message}
              onChange={(e) => {
                setvalues({ ...values, [e.target.name]: e.target.value })
              }}
              name='username'
            />
            <TextField
            //   error
              id='outlined-error-helper-text'
              label='Password'
            //   helperText='Incorrect entry.'
              type='password'
              onChange={(e) => {
                setvalues({ ...values, [e.target.name]: e.target.value })
              }}
              name='password'
            />
          </div>
          <div className=''>
            <Button type='submit'>submit</Button>
          </div>
        {/* </form> */}
      </Box>
    </div>
  )
}
