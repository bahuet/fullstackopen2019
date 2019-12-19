import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async content => {
  const object = {
    content: content,
    votes: 0
  }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const addVote = async id => {
  const url = `${baseUrl}/${id}`
  const a = await axios.get(url)

  const newA = { ...a.data, votes: a.data.votes + 1 }
  const response = await axios.put(url, newA)
  return response.data.id
}


export default { getAll, createNew, addVote }