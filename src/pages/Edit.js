import React from 'react'
import { Button, FormControl, Input, InputLabel } from '@mui/material';

export default function ModalEdit(props) {

  const [edit, setEdit] = React.useState(props.edit)
  console.log('todo =>', edit)
  function handleChange(key, value) {
    console.log('===> todo changed!')
    setEdit({
      ...edit,
      [key]: value,
    })
  }

  function handleSubmit() {
    // api PUT on todo
    console.log('===> item  edit submit!!')
    props.updateTodo()
  }

  return (
    <div>
      {/* <form onSubmit={handleSubmit}>
        <label htmlFor='title'>
          <input
            value={edit.title}
            onChange={(e) => handleChange('title', e.target.value)}
          />
        </label>
        <button type='submit'>Edit</button>
      </form> */}
      <FormControl onSubmit={handleSubmit}>
        <div className=''>
          <InputLabel htmlFor='my-input'>Email address</InputLabel>
          <Input
            id='my-input'
            aria-describedby='my-helper-text'
            value={edit.title}
            onChange={(e) => handleChange('title', e.target.value)}
          />
        </div>
        <div className=''>
          <InputLabel htmlFor='my-input'>Email address</InputLabel>
          <Input
            id='my-input'
            aria-describedby='my-helper-text'
            value={edit.title}
            onChange={(e) => handleChange('title', e.target.value)}
          />
        </div>
        <div className=''>
          <InputLabel htmlFor='my-input'>Email address</InputLabel>
          <Input
            id='my-input'
            aria-describedby='my-helper-text'
            value={edit.title}
            onChange={(e) => handleChange('title', e.target.value)}
          />
        </div>
        <div className=''>
          <Button type='submit'>Edit</Button>
        </div>
      </FormControl>
    </div>
  )
}
