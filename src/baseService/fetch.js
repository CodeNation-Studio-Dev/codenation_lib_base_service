import axios from 'axios'
import jwtDecode from 'jwt-decode'

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
    return getCookie(TOKEN)
  } else {
    return localStorage.getItem(TOKEN)
  }
}

function hasExpiredToken(token) {
  const tokeDecode = jwtDecode(token)
  const expiredDate = tokeDecode.exp * 1000
  const currentDate = new Date().getTime()
  if (currentDate > expiredDate) {
    return true
  }
  return false
}

async function authFetch(url, params, logout) {
  const token = getToken()
  if (!token) {
    logout()
  } else {
    if (hasExpiredToken(token)) {
      logout()
    } else {
      const paramsTemp = {
        ...params,
        headers: {
          ...params?.headers,
          authorization: `jwt ${token}`
        }
      }
      try {
        const response = await axios(paramsTemp)
        return response
      } catch (error) {
        console.error(error)
        return error
      }
    }
  }
}

export default authFetch
