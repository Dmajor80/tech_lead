
import * as React from 'react'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
// import ListSubheader from '@mui/material/ListSubheader'
import IconButton from '@mui/material/IconButton'
// import InfoIcon from '@mui/icons-material/Info'
// import Pagination from '@mui/material/Pagination'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Container, TextField } from '@mui/material'
import itemData from '../components/item'
// import ModalEdit from './Edit'
import { Button, FormControl, Input, InputLabel } from '@mui/material'
import axios from 'axios'
import api from '../config'


export default function PreviewPage() {
//   const [item, setItem] = React.useState()
//   const [itemList, setItemList] = React.useState([])
  const [isEditing, setIsEditing] = React.useState(false)
  const [currentItem, setCurrentItem] = React.useState({})
  const [todo, setTodo] = React.useState('')
  const [todos, setTodos] = React.useState(() => {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      return JSON.parse(savedTodos)
    } else {
      return []
    }
  })

  React.useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(itemData))
  }, [itemData])


  const  handleEditInputChange = (e) => {
    // set the new state value to what's currently in the edit input box
    setCurrentItem({ ...currentItem, text: e.target.value })
    console.log(currentItem)
  }


  const handleEditFormSubmit = async (e) => {
    e.preventDefault()
    const {data}=await api.put('/orde_items/:id',{

    },{
           param:{}
    })
       handleUpdateTodo(currentItem.id, currentItem)
}

  const handleDeleteClick = async(id) => {
    const removeItem = todos.filter((todo) => {
      return todo.id !== id
    })
    setTodos(removeItem)
   
  }

  // function to edit a todo item
  function handleUpdateTodo(id, updatedTodo) {
    // here we are mapping over the todos array - the idea is check if the todo.id matches the id we pass into the function
    // if the id's match, use the second parameter to pass in the updated todo object
    // otherwise just use old todo
    const updatedItem = todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo
    })
    // set editing to false because this function will be used inside a onSubmit function - which means the data was submited and we are no longer editing
    setIsEditing(false)
    // update the todos state with the updated todo
    setTodos(updatedItem)
  }

  // function to handle when the "Edit" button is clicked
  function handleEditClick(todo) {
    // set editing to true
    setIsEditing(true)
    // set the currentTodo to the todo item that was clicked
    setCurrentItem({ ...todo })
  }

//   function editItem(item) {
//     console.log('===> set items => ', item)
//     setItem(item)
//   }

//   function handleUpdate() {
//     console.log('===> item updated!!')
//     console.log('edit mode activated')
//     setItem(null)
//     //   getItem()
//   }

  return (
    <>
      <div className=''>
        <Container maxWidth=''>
          {isEditing ? (
            <div className='text-black'>
              <form onSubmit={handleEditFormSubmit}>
                {/* we've added an h2 element */}
                <h2>Edit Todo</h2>
                {/* also added a label for the input */}
                <label htmlFor='editTodo'>Edit todo: </label>
                {/* notice that the value for the update input is set to the currentTodo state */}
                {/* also notice the handleEditInputChange is being used */}
                <input
                  name='editTodo'
                  type='text'
                  placeholder='Edit todo'
                  //   value={currentItem.text}
                  onChange={handleEditInputChange}
                />
                <TextField
                  id='outlined-error'
                  label='Username'
                  // helpterText={message}
                  onChange={(e) => {
                    // setvalues({ ...values, [e.target.name]: e.target.value })
                  }}
                  name='username'
                />
                <TextField
                  id='outlined-error'
                  label='Username'
                  // helpterText={message}
                  onChange={(e) => {
                    // setvalues({ ...values, [e.target.name]: e.target.value })
                  }}
                  name='username'
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
                <ImageListItem key='Subheader' cols={2}>
                  {/* <ListSubheader component='div'>December</ListSubheader> */}
                </ImageListItem>
                {itemData.map((item) => (
                  <ImageListItem key={item.img}>
                    <img
                      src={`${item.img}?w=248&fit=crop&auto=format`}
                      srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                      alt={item.title}
                      loading='lazy'
                    />
                    <ImageListItemBar
                      title={item.title}
                      subtitle={item.author}
                      actionIcon={
                        <IconButton
                          sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                          aria-label={`info about ${item.title}`}
                        >
                          {/* <DeleteIcon onClick={() => removeItem(item)} /> */}
                          <DeleteIcon
                            onClick={() => handleDeleteClick(todo.id)}
                          />
                          <EditIcon onClick={() => handleEditClick(todo)} />
                          {/* {item && (
                      <ModalEdit item={item} updateTodo={handleUpdate} />
                    )} */}
                          {/* <InfoIcon /> */}
                        </IconButton>
                      }
                    />
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

