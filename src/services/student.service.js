import http from "../http-common";


class StudentDataService {
  getStudents() {
    return http.get("/students");
  }

  createStudent(data) {
    return http.post("/students", data);
  }

  updateStudent(id, data) {
    return http.put(`/students/${id}`, data);
  }

  deleteStudent(id) {
    return http.delete(`/students/${id}`);
  }
}

export default new StudentDataService();
