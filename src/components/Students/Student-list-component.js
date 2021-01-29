import React, { Component } from "react";
import http from "../../services/httpService";
import "../../services/student.service";
import 'bootstrap/dist/css/bootstrap.min.css';

import UpdateStudent from './updateStudent'
import AddStudent from "./addStudent";

export default class StudentList extends Component {
  constructor(props) {
    super(props);
    this.retrieveStudents = this.retrieveStudents.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveStudent = this.setActiveStudent.bind(this);
    this.removeStudent = this.removeStudent.bind(this);
    this.updateStudent=this.updateStudent.bind(this);
    

    this.state = {
      students: [],
      currentStudent: null,
      currentIndex: -1,
      studentToUpDate: {
        studentId: -1,
        studentName: "",
        studentEmail: "",
        supervisor : {
            supervisorId: -1,
        } 
      },
    };
  }

  updateStudent(upstudent){
      {console.log(upstudent.studentId)}
     this.setState({
     studentToUpDate: upstudent,
      })  
  }
  
  

  componentDidMount() {
    this.retrieveStudents();
  }

  retrieveStudents() {
    http
      .get("/students")
      .then((response) => {
        this.setState({
          students: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveStudents();
    this.setState({
      currentStudent: null,
      currentIndex: -1,
    });
  }

  setActiveStudent(student, index) {
    this.setState({
      currentstudent: student,
      currentIndex: index,
    });
  }

  removeStudent(id) {
    http
      .delete(`/students/${id}`)
      .then((response) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { students } = this.state;

    return (
      <div>
        <button onClick={this.retrieveStudents}>Get students</button>
        <div className="customers-list row">
            <div className="col-md-10">
            <h4>Students List</h4>

            <table className="table table-bordered table-hover">
                <thead className="thead-dark">
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Supervisor</th>
                </tr>
                </thead>
                <tbody>
                {
                    students.map((student, index) => (
                    <tr
                        key={index}
                    >
                        <th>{student.studentName}</th>
                        <th>{student.studentEmail}</th>
                        <th>{`${student.supervisor.supervisorName} ${student.supervisor.supervisorSurname}`}</th>
                        <th>
                            <button onClick={() => this.removeStudent(student.studentId)} >Delete</button>
                            <button onClick={() => this.updateStudent(student)} >Update</button>
                        </th>
                    </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
        <UpdateStudent StudentdataToUpdate={this.state.studentToUpDate} refresh={this.refreshList} />
        <AddStudent refresh={this.refreshList} />
    </div>

    );
  }
}
