import React, { useState } from 'react'
import * as base from 'base-service'
import './index.css'
import { LoginApiService, UserManages, Suppliers } from './api/userLogin'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import { SnackbarProvider, useSnackbar } from 'notistack'

const App = () => {
  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const action = (
    <React.Fragment>
      <Button color='secondary' size='small' onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size='small'
        aria-label='close'
        color='inherit'
        onClick={handleClose}
      ></IconButton>
    </React.Fragment>
  )

  let url = []

  function logout() {
    console.log('logout')
  }

  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const [response, setResponse] = useState('')

  function getCookie(name) {
    const nameEQ = name + '='
    const ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === ' ') {
        // Remove leading whitespace
        c = c.substring(1, c.length)
      }
      if (c.indexOf(nameEQ) === 0) {
        // Check if this cookie starts with the desired name
        return c.substring(nameEQ.length, c.length)
      }
    }
    return null // Return null if the cookie is not found
  }

  function getToken() {
    const TOKEN = 'token'
    if (getCookie(TOKEN) !== null) {
      console.log('cookie', getCookie(TOKEN))
      return getCookie(TOKEN)
    } else {
      console.log('local', localStorage.getItem(TOKEN))
      return localStorage.getItem(TOKEN)
    }
  }

  async function login() {
    let getUsers = new LoginApiService()
    let response = await getUsers.postData({
      email: 'francisco.marmolejo.martinez@gmail.com',
      password: 'joelo123'
    })

    localStorage.setItem(
      'token',
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0LCJ1c2VybmFtZSI6Im1lbW8iLCJleHAiOjE2NTMwMTEwMTMsImVtYWlsIjoib21lbS5lbWFudWVsKzFAZ21haWwuY29tIiwib3JpZ19pYXQiOjE2NTE3MTUwMTN9.lNRm02eFOBKwun2rky6Tst-Rn71a4TOo4k-aW4mVhHs'
    )
    // document.cookie =
    //   'token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0LCJ1c2VybmFtZSI6Im1lbW8iLCJleHAiOjE2NTMwMTEwMTMsImVtYWlsIjoib21lbS5lbWFudWVsKzFAZ21haWwuY29tIiwib3JpZ19pYXQiOjE2NTE3MTUwMTN9.lNRm02eFOBKwun2rky6Tst-Rn71a4TOo4k-aW4mVhHs; path=/; max-age=3600; secure; samesite=strict'

    // let irequestFilter = []
    // irequestFilter.push({'key':'page', 'value': '1'})
    // irequestFilter.push({'key':'items', 'value': '1'})
    // let getUsers = new Suppliers();
    // let response = await getUsers.filter(irequestFilter);
    console.log('respuesta', response)
    enqueueSnackbar(response)
  }

  //

  return (
    <>
      <div>
        <Button onClick={() => login()}>Show snackbar</Button>
      </div>
      <div>
        <Button onClick={() => getToken()}>Show token</Button>
      </div>
    </>
  )
}

export default App
