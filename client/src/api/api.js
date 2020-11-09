import axios from 'axios'

const url = 'http://localhost:5000/notes'

export const getNotes = () => axios.get(url)
export const filterNotes = (item) => axios.get(`${url}/category/${item}`)
export const createNotes = (note) => axios.post(url, note)
export const updateNotes = (id, note) => axios.post(`${url}/${id}`, note)
export const deleteNote = (id) => axios.delete(`${url}/${id}`)