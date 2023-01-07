import  React, { useContext, useEffect, useState } from 'react'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import ListSubheader from '@mui/material/ListSubheader'
import IconButton from '@mui/material/IconButton'
import {  Button,  TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import api from '../config'
import { UserContext } from '../Context'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Navbar from '../components/Navbar'
import Grid from '@mui/material/Grid'

 
export default function Home() {
  const userContext = useContext(UserContext) 
  const [order, setOrder] = useState([])
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)

  const [values, setvalues] = useState({
    id: '',
    value: '',
    description: '',
    name: '',
    product_category_name: "",
  })
 const [proid,setProId]=useState("");
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

  const handleDelete = async (e) => {
    try {
      values.id=e.target.id;
      const { data } = await api.delete(`/order_items`, {
        params: {
          ...values,
        },
      })
       if (data.success) {
         handleData();
       } else {
         //display error
       }
    } catch (error) {
      console.log(error.response.data.error)
    }
  }

  // function to handle when the "Edit" button is clicked
  function handleEditClick(e) {
    const pro_id = e.target.id
    const findProduct = order.find(
      (curr) =>curr.id===pro_id
      )
      setProId(pro_id);
    setIsEditing(true)
    setvalues(findProduct)
  }


  // handle submit edit
  const handleEditSubmit = async (e) => {
    e.preventDefault()
    const { data } = await api.put(`/order_items/product`, {
      productId:proid,
      product_category_name:values.product_category_name,
    })
    console.log(data)

    if(data.success){
      navigate('/home')
    }
    setIsEditing(false)
    handleData()
  }

  useEffect(() => {
    console.log(userContext);
    if (!userContext.user_city || !userContext.user_state) {
      navigate('/')
    } else {
      handleData()
    }
  }, [])

 

  return (
    <div className=''>
      <div className=''>
        <Navbar />
      </div>
      <Grid
        // maxWidth='xl' fluid
        container
        // spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {isEditing ? (
          <div className='text-black'>
            <form onSubmit={handleEditSubmit}>
              <Typography>Edit Orders</Typography>

              <TextField
                id='outlined-error'
                // id={item.id}
                label='name'
                name='product_category_name'
                onChange={(e) => {
                  setvalues({ ...values, [e.target.name]: e.target.value })
                }} 
              />

              <div className=''>
                {/* here we added an "update" button element - use the type="submit" on the button which will still submit the form when clicked using the handleEditFormSubmit function */}
                <Button type='submit'>Update</Button>
                {/* here we added a "Cancel" button to set isEditing state back to false which will cancel editing mode */}
                <Button onClick={() => setIsEditing(false)}>Cancel</Button>
              </div>
            </form>
          </div>
        ) : (
          <div className=''>
            <ImageList
            //  sx={{ width: 500, height: 450 }}
            >
              <ImageListItem key='Subheader' cols={4}>
                <ListSubheader component='div'>Orders</ListSubheader>
              </ImageListItem>
              {order?.map((item) => (
                <ImageListItem key={item.img}>
                  <Typography color='#f44336'>DATE: {item.date}</Typography>
                  <Typography color='#9c27b0'>ID: {item.id}</Typography>
                  <Typography color='#9c27b0'>
                    CATEGORY NAME: {item.product_category_name}
                  </Typography>
                  <Typography color='#f50057'>PRICE: {item.price}</Typography>
                  <Typography color='#009688'>
                    PRODUCT CATEGORY: {item.product_category}
                  </Typography>
                  <Typography color='#cddc39'>
                    PRODUCT ID: {item.product_id}
                  </Typography>

                  <ImageListItemBar
                    title={item.title}
                    subtitle={item.author}
                    actionIcon={
                      <IconButton
                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                        aria-label={`info about ${item.title}`}
                      >
                        
                        <div
                          className=''
                          id={item.id}
                          onClick={(e) => handleDelete(e)}
                          startIcon={<DeleteIcon />}
                        >
                          Delete
                        </div>
                        <div
                          className=''
                          id={item.id}
                        >
                          
                          <EditIcon onClick={(e) => handleEditClick(e)} />
                        </div>
                      </IconButton>
                    }
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </div>
        )}

      </Grid>
    </div>
  )
}

