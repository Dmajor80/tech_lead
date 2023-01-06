import  React, { useContext, useEffect, useState } from 'react'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import ListSubheader from '@mui/material/ListSubheader'
import IconButton from '@mui/material/IconButton'
import InfoIcon from '@mui/icons-material/Info'
import Pagination from '@mui/material/Pagination'
import { Box, Button, Container, FormControl, Input, InputLabel, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import api from '../config'
import { UserContext } from '../Context'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
 


export default function Home() {
  const userContext = useContext(UserContext)
  const [order, setOrder] = useState([])
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  // const [currentItem, setCurrentItem] = useState({})

  const [values, setvalues] = useState({
    id: '',
    value: '',
    description: '',
    name: '',
  })

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
      console.log(e)
      const { data } = await api.delete(`/order_items`, {
        params: {
          ...values,
        },
      })
      console.log(data)
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
    const pro_id = e.targe.id 
    const findProduct = order.find((item)=>item.id===pro_id);

    setIsEditing(true)
    // set the currentTodo to the todo item that was clicked
    setvalues(findProduct)
  }

  // edit handle
  const handleEditChange = (e) => {
    // set the new state value to what's currently in the edit input box
    setvalues({ ...values, text: e.target.value })
    console.log(values)
  }

  // handle submit edit
  const handleEditSubmit = async (e) => {
    e.preventDefault()
    const { data } = await api.put(`/account`, {

    },{
      params: {
        id:values.pro_id,
      },
    })
    console.log(data)
    // handleUpdateTodo(currentItem.id, currentItem)
  }

  useEffect(() => {
    console.log(UserContext)
    if (!userContext.user_city || !userContext.user_state) {
      navigate('/')
    } else {
      handleData()
    }
    // handleDelete()
  }, [])

  return (
    <div className=''>
      <Container maxWidth='xl'>
        {isEditing ? (
          <div className='text-black'>
            {/* {order?.map()} */}
            <form onSubmit={handleEditSubmit}>
              <Typography>Edit Orders</Typography>

              <TextField
                id='outlined-error'
                // id={item.id}
                value={'hey'}
                label='id'
                // onChange={(e) => {
                //   // setvalues({ ...values, [e.target.name]: e.target.value })
                // }}
                name='id'
                onChange={handleEditChange}
              />
              <TextField
                id='outlined-error'
                label='price'
                // onChange={(e) => {
                //   // setvalues({ ...values, [e.target.name]: e.target.value })
                // }}
                onChange={handleEditChange}
                name='price'
              />
              <TextField
                id='outlined-error'
                label='product_category'
                // onChange={(e) => {
                //   // setvalues({ ...values, [e.target.name]: e.target.value })
                // }}
                onChange={handleEditChange}
                name='product_category'
              />
              <TextField
                id='outlined-error'
                label='product_id'
                // onChange={(e) => {
                //   // setvalues({ ...values, [e.target.name]: e.target.value })
                // }}
                onChange={handleEditChange}
                name='product_id'
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
                        <InfoIcon
                          // onClick={() => navigate(`/post/${item?._id}`)}
                          onClick={() => navigate(`/preview`)}
                        />
                        <Button
                          className=''
                          id={item.id}
                          onClick={(e) => handleDelete(e)}
                          startIcon={<DeleteIcon />}
                        >
                          {/* <DeleteIcon
                          /> */}
                          {/* Delete */}
                        </Button>
                        <Button></Button>
                        <EditIcon onClick={() => handleEditClick(values)} />
                      </IconButton>
                    }
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </div>
        )}

        {/* <Pagination count={10} color='primary' /> */}
      </Container>
    </div>
  )
}

