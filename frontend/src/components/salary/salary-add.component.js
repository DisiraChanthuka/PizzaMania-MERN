import React, { Component } from 'react';
import axios from 'axios';
import * as Swal from "sweetalert2";
import Select from 'react-select'

export class CreateSalary extends Component {
    constructor(props) {
        super(props);
        this.onChangeempID = this.onChangeempID.bind(this);
        this.onChangeempName = this.onChangeempName.bind(this);
        this.onChangebasicSalary = this.onChangebasicSalary.bind(this);
        this.onChangeotRate = this.onChangeotRate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            empId: '',
            basicSalary: '',
            otRate: '',
            FullDataSet: [], //change to id
            IDset: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/employee/')
            .then(response => {
                this.setState({
                    FullDataSet: response.data,
                })
                const tempOptions = [
                ]
                response.data.forEach((id) => {
                    let tempObject = {
                        value: id.empID,
                        label: id.empID
                    }
                    console.log(tempObject.value, tempObject.label)
                    tempOptions.push(tempObject);
                })
                this.setState({
                    IDset: tempOptions
                })
            })
            .catch(function (error) {
                console.log(error);
            })

    }

    onChangeempID(choice) {
        this.setState({
            empId: choice.value
        });
    }

    onChangeempName(e) {
        this.setState({
            empName: e.target.value
        });
    }

    onChangebasicSalary(e) {
        this.setState({
            basicSalary: e.target.value
        });
    }

    onChangeotRate(e) {
        this.setState({
            otRate: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const salary = {
            empId: this.state.empId,
            basicSalary: this.state.basicSalary,
            otRate: this.state.otRate
        }

        console.log(salary);

        if (this.state.empId.length < 10 || this.state.empId.length > 10) {
            this.setState({ empIDError: "Employee ID should be 10 characters long" })
        } else if (this.state.basicSalary === 0) {
            this.setState({ basicSalaryError: "Basic Salary Can not be zero" })
        } else if (this.state.otRate === 0) {
            this.setState({ otError: "OT rate Can not be zero" })
        } else {
            axios.post('http://localhost:5000/salary/', salary)
                .then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        this.clearData();
                        Swal.fire({
                            icon: 'success',
                            title: 'Successful',
                            text: 'Salary has been added!!',
                            background: '#fff',
                            confirmButtonColor: '#333533',
                            iconColor: '#60e004'
                        })
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Error in adding!',
                            background: '#fff',
                            confirmButtonColor: '#333533',
                            iconColor: '#e00404'
                        })
                    }
                })
        }
    }

    clearData = () => {
        this.setState({
            empId: '',
            basicSalary: '',
            otRate: ''
        })
    }

    render() {
        return (
            <div className="flex flex-col px-5 pt-2 ">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className='items-center overflow-hidden'>
                            <div className=''>
                                <div class="grid grid-cols-1 gap-4 content-start pt-5 px-20">
                                    <form className='px-12 py-12 border-2 rounded-lg shadow-md bg-gray-50' onSubmit={this.onSubmit}>
                                        <div class="">
                                            <p className='text-4xl font-semibold text-black uppercase'>
                                                Add Salary Details
                                            </p>
                                            {/* <div class="">
                                                <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Employee ID</label>
                                                <input type="text"
                                                    required
                                                    className="form-control "
                                                    value={this.state.empId}
                                                    onChange={this.onChangeempID}
                                                />
                                                <p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.empIDError}</p>
                                            </div> */}

                                            <div className="form-group ">
                                                <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white' for="grid-state">Employee ID : </label>
                                                <Select
                                                    options={this.state.IDset}
                                                    // onChange={this.onChangeempID} 
                                                    onChange={(choice) => this.onChangeempID(choice)}
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 form-group">
                                                <div class="">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white' >Basic Salary</label>
                                                    <input type="text"
                                                        required
                                                        className="form-control"
                                                        value={this.state.basicSalary}
                                                        onChange={this.onChangebasicSalary}
                                                    />
                                                    <p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.basicSalaryError}</p>
                                                </div>
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Over Time Rate</label>
                                                    <select type="text"
                                                        required
                                                        className="form-control"
                                                        value={this.state.otRate}
                                                        onChange={this.onChangeotRate}
                                                    >
                                                        <option>Select From Here</option>
                                                        <option>400 LKR</option>
                                                    </select>
                                                    <p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.otError}</p>
                                                </div>
                                            </div>
                                            <div className="text-center align-middle form-group">
                                                <input className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' type="submit" value="Add Salary" />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}