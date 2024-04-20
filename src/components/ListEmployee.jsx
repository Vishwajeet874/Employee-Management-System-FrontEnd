import React, { useEffect, useState } from 'react'
import { deleteEmployee, listEmployees } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'

const ListEmployee = () => {

   const [employee, setEmployee] = useState([])
    const Navigator= useNavigate();
    const [cnt,setcnt]=useState(1);
    useEffect(()=>{
        getAllemployees();
    },[])

    function getAllemployees(){
        listEmployees().then((response) =>{
            setEmployee(response.data);
        }).catch(error=>{
            console.error(error);
        })
    }

    function addNewEmployee() {
        Navigator('/add-employee');
    }

    function updateEmployee(id){
        Navigator(`edit-employee/${id}`)
    }
    function removeEmployee(id){
        deleteEmployee(id).then((response)=>{
            getAllemployees();
            console.log(response.data)
        }).catch(errors=>{
            console.error(errors)
        })
        
    }

  return (
    <div className='container'>
      <h1>List of Employees</h1>
      <button className='btn btn-secondary mb-2' onClick={addNewEmployee}>Add Employee</button>
      <table className='table table-striped table-bordered'>
        <thead>
            <tr>
                <th>Serial No.</th>
                <th>FirstName</th>
                <th>LastName</th>
                <th>EmailId</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {
                employee.map((employee,index) =>
                    <tr key={employee.id}>
                        <td>{index+1}</td>
                        <td>{employee.firstName}</td>
                        <td>{employee.lastName}</td>
                        <td>{employee.email}</td>
                        <td><button className='btn btn-primary me-2' onClick={() => updateEmployee(employee.id)}>Update</button>
                        <button className='btn btn-primary' onClick={() => removeEmployee(employee.id)}>Delete</button>
                        </td>
                        
                        
                    </tr>
                     
                )
                
            }
            <tr>

            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ListEmployee
