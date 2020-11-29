import axios from 'axios'

const urlNotes = 'http://localhost:5000/notes'

export const getNotes = (config) => axios.get(urlNotes, config)
export const getNotesForUser = (config, id) => axios.get(`${urlNotes}/createdBy/${id}`, config)
export const getFollowedNotes = (config, id) => axios.get(`${urlNotes}/${id}/followed`, config)
export const filterNotes = (config, id, item ) => axios.get(`${urlNotes}/createdBy/${id}/category/${item}`, config )
export const filterTimeline = (config, id, item ) => axios.get(`${urlNotes}/${id}/category/${item}`, config )
export const createNotes = (note, id, config) => axios.post(`${urlNotes}/${id}`, note, config)
export const updateNotes = (id, note) => axios.put(`${urlNotes}/${id}`, note)
export const deleteNote = (id, config) => axios.delete(`${urlNotes}/${id}`, config)


const urlAuth = 'http://localhost:5000/auth'
//get tokn from loaclStorage

export const loadUser = (config) => axios.get(`${urlAuth}/user`, config)
export const login = (body, config) => axios.post(urlAuth, body, config)



const urlUsers = 'http://localhost:5000/users'

export const getUsers = () => axios.get(urlUsers)
export const register = (body, config) => axios.post(urlUsers, body, config)
export const followUser = (id, follower) => axios.post(`${urlUsers}/${id}`, follower)