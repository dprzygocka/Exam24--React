import React, { Component } from "react";
import http from "../../services/httpService";
import "../../services/student.service";
import 'bootstrap/dist/css/bootstrap.min.css';


export default class AddStudent extends Component{
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeSupervisor = this.onChangeSupervisor.bind(this);
        this.saveStudent = this.saveStudent.bind(this);
        this.newStudent = this.newStudent.bind(this);
        this.retrieveSupervisor = this.retrieveSupervisor.bind(this);
        this.refresh=this.refresh.bind(this);
        this.state = {
            
                studentId : -1,
                studentName : "",
                studentEmail : "",
                supervisor : {
                    supervisorId : -1,
                },
        
            supervisors : [],
        }
    }


    componentDidMount(){
        this.retrieveSupervisor();
    }

    refresh(){
        this.props.refresh();
      }

    retrieveSupervisor() {
        http
          .get("/supervisors")
          .then((response) => {
            this.setState({
              supervisors: response.data,
            });
          })
          .catch((e) => {
            console.log(e);
          });
      }

    onChangeName(e) {
        this.setState({
          
              studentName: e.target.value,
          
        });
        {console.log(this.state.studentName)}
    }

    onChangeEmail(e) {
        this.setState({
          
              studentEmail: e.target.value,
          
        });
        {console.log(this.state.studentEmail)}
    }
    onChangeSupervisor(e) {
        {console.log(e)}
        this.setState({
          
            supervisor : {
              supervisorId : e.target.value
          
        }
        });
        {console.log(this.state)}
    }

    saveStudent() {
        var data = {
            studentName: this.state.studentName,
            studentEmail:this.state.studentEmail,
            supervisor:{
            supervisorId:this.state.supervisor.supervisorId,
                },
        }
    
        http
          .post("/students", data)
          .then((response) => {
            this.setState({
              studentId: response.data.studentId,
              studentName: response.data.studentName,
              studentEmail: response.data.studentEmail,
              supervisor : {
                  supervisorId: response.data.supervisor.supervisorId
              } 
            });
            
            console.log("my respone data: " + response.data);
            this.newStudent();
            this.refresh();
            
          })
          .catch((e) => {
            console.log(e);
          });
         
          
      }

      newStudent() {
        this.setState({
            studentId: -1,
            studentName: "",
            studentEmail: "",
            supervisor : {
                supervisorId: -1,
            } 
        });
      }

    render() {
        return (
            <div>
                <div className="form-group">
                    <label htmlFor="studentName">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="studentName"
                        required
                        value={this.state.studentName}
                        onChange={this.onChangeName}
                        name="studentName"
                    />
                </div>

                <div className="form-group">
                <label htmlFor="studentEmail">Email</label>
                <input
                    type="text"
                    className="form-control"
                    id="studentEmail"
                    required
                    value={this.state.studentEmail}
                    onChange={this.onChangeEmail}
                    name="studentEmail"
                />
                </div>

                <div className="form-group">
                <label htmlFor="supervisorId">Supervisor</label>
                <select
                    className="form-control"
                    id="supervisorId"
                    required
                    onChange={this.onChangeSupervisor}
                    name="supervisorId"
                >
                    {this.state.supervisors.map((supervisor) =>
                        <option value ={supervisor.supervisorId} >{supervisor.supervisorName}</option>
                    )}
                </select>
                </div>

                <button onClick={() => this.saveStudent()} className="btn btn-success">
                Add student
                </button>
            </div>
        );
      }

}

