import axios from 'axios'

const urlNotes = 'http://localhost:5000/notes'

export const getNotes = (config) => axios.get(urlNotes, config)
export const filterNotes = (item, config) => axios.get(`${urlNotes}/category/${item}`, config)
export const createNotes = (note, config) => axios.post(urlNotes, note, config)
export const updateNotes = (id, note, config) => axios.post(`${urlNotes}/${id}`, note, config)
export const deleteNote = (id, config) => axios.delete(`${urlNotes}/${id}`, config)


const urlAuth = 'http://localhost:5000/auth'
//get tokn from loaclStorage

export const loadUser = (config) => axios.get(`${urlAuth}/user`, config)
export const login = (body, config) => axios.post(urlAuth, body, config)



const urlUsers = 'http://localhost:5000/users'

export const register = (body, config) => axios.post(urlUsers, body, config)