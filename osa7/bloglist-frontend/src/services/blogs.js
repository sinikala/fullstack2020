import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (newObject, id) => {
  console.log('nO', newObject, id)
  const url = baseUrl.concat(`/${id}`)
  const response = await axios.put(url, newObject)
  return response.data
}

const remove = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const url = baseUrl.concat(`/${newObject.id}`)
  await axios.delete(url, config)
}

export default { getAll, create, setToken, update, remove }