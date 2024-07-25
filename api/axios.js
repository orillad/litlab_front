import axios from 'axios'
import { BACKEND_URL } from '../CONSTS'

export default axios.create({
  baseURL: BACKEND_URL + '/api',
})