import http from "../http-common";
class SupervisorDataService {
    getSupervisors() {
      return http.get("/supervisors");
    }
}
export default new SupervisorDataService();