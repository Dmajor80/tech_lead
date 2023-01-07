
import  React, { useEffect, useState } from 'react'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import EditIcon from '@mui/icons-material/Edit'
import { Container, TextField, Typography } from '@mui/material'
import itemData from '../components/item'
import { Button } from '@mui/material'
import api from '../config'
import Navbar from '../components/Navbar'
import {  useNavigate } from 'react-router-dom'

export default function Account() {


  
const [order, setOrder] = useState([])
const navigate = useNavigate()
const [isEditing, setIsEditing] = useState(false)

const [values, setvalues] = useState({
  id: '',
  value: '',
  description: '',
  name: '',
  product_category_name: '',
})
const [proid, setProId] = useState('')
// orders
const handleData = async () => {
  try {
    const { data } = await api.get('/order_items', {})
    console.log(data, 'data')
    if (!data.success) navigate('/home')
    //todo
    //populate UI
    setOrder(data.data)
  } catch (error) {
    console.log(error.response.data.error)
  }
}



// function to handle when the "Edit" button is clicked
function handleEditClick(e) {
  const pro_id = e.target.id
  const findProduct = order.find((curr) => curr.id === pro_id)
  setProId(pro_id)

  setIsEditing(true) ///where are you using that state?
  setvalues(findProduct)
  // set the currentTodo to the todo item that was clicked
}

// handle submit edit
const handleEditSubmit = async (e) => {
  e.preventDefault()
  const { data } = await api.put(
    `/account`,
    //   {
    //     productId: proid,
    //     product_category_name: values.product_category_name,
    //   }
    {},
          {
            params: {
              id: values.pro_id,
            },
          }
  )
  console.log(data)

  if (data.success) {
    navigate('/home')
  }
  setIsEditing(false)
  handleData()
}

// useEffect(() => {
//   console.log(UserContext)
//   if (!userContext.user_city || !userContext.user_state) {
//     navigate('/')
//   } else {
//     handleData()
//   }
//   // handleDelete()
// }, [])


 

  return (
    <>
      <div className=''>
        <Navbar />
        <Container maxWidth=''>
          {isEditing ? (
            <div className='text-black'>
              <form onSubmit={handleEditSubmit}>
                {/* we've added an h2 element */}
                <h2>Edit Account</h2>
                {/* also added a label for the input */}

                <TextField
                  id='outlined-error'
                  label='name'
                  // helpterText={message}
                  onChange={(e) => {
                    setvalues({ ...values, [e.target.name]: e.target.value })
                  }}
                  name='name'
                />
                <TextField
                  id='outlined-error'
                  label='city'
                  // helpterText={message}
                  onChange={(e) => {
                    setvalues({ ...values, [e.target.name]: e.target.value })
                  }}
                  name='city'
                />
                {/* here we added an "update" button element - use the type="submit" on the button which will still submit the form when clicked using the handleEditFormSubmit function */}
                <Button type='submit'>Update</Button>
                {/* here we added a "Cancel" button to set isEditing state back to false which will cancel editing mode */}
                <Button onClick={() => setIsEditing(false)}>Cancel</Button>
              </form>
            </div>
          ) : (
            <div className=''>
              <ImageList
              //  sx={{ width: 500, height: 450 }}
              >
                <ImageListItem key='Subheader'>
                  {/* <ListSubheader component='div'>December</ListSubheader> */}
                </ImageListItem>
                {itemData.map((item) => (
                  <ImageListItem key={item.img}>
                    <div className=''>
                      <Typography>Name</Typography>
                      <Typography>City</Typography>
                      <EditIcon onClick={(e) => handleEditClick(e)} />
                    </div>

                    
                  </ImageListItem>
                ))}
              </ImageList>
            </div>
          )}
        </Container>
      </div>
    </>
  )
}


