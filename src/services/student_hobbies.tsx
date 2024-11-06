import axios from "axios"
const url = `${import.meta.env.VITE_SUPABASE_API_URL}/functions/v1/student-hobbies`
export const StudentHobbies = {
  async addCustomStudentHobby(studentId: string, userId: string) {
    const res = await axios.put(`${url}/`, null, {
      params:  {
        studentId: studentId,
        userId: userId
      }
    })
  },
  async addStudentHobby(studentId: string, hobbyId: string, userId: string) {
    const res = await axios.put(`${url}/`, null, {
      params:  {
        studentId: studentId,
        hobbyId: hobbyId,
        userId: userId
      }
    })
  },
  async deleteStudentHobby(studentId: string, hobbyId: string, userId: string) {
    const res = await axios.delete(`${url}/`, {
      params:  {
        studentId: studentId,
        hobbyId: hobbyId,
        userId: userId
      }
    })
  }
}