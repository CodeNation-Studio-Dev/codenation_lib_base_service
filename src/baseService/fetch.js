import axios from 'axios'
import jwtDecode from 'jwt-decode'

function getToken() {
  const TOKEN = 'token'
  return localStorage.getItem(TOKEN)
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
