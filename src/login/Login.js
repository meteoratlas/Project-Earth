import React, { Component } from "react";
import "./login.css";
import fetch_functions from "../fetch/fetch_functions";
import { DataServer } from "../fetch/DataServer";
import App from "../App";
import Facebook from "../components/ui/Facebook";

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
    let valid = true;

    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });

    // validate the form was filled out
    Object.values(rest).forEach(val => {
        val === null && (valid = false);
    });

    console.log("valid:", valid);
    return valid;
};

const loginFormValid = ({ formErrors, ...rest }) => {
    // let valid = true;
    console.log("formErrors", formErrors);

    let valid =
        formErrors.email.length > 0 ||
        formErrors.password.length > 0 ||
        rest.email === null ||
        rest.password === null
            ? false
            : true;
    // // validate form errors being empty
    // Object.values(formErrors).forEach(val => {
    //     console.log("val.length", val.length)
    //     val.length > 0 && (valid = false);
    // });

    // // validate the form was filled out
    // Object.values(rest).forEach(val => {
    //     val === null && (valid = false);
    // });

    console.log("valid:", valid);
    return valid;
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.content = "";
        this.debug = true;
        // this.wantToLogin = false;
        this.state = {
            firstName: null,
            lastName: null,
            email: null,
            password: null,
            formErrors: {
                firstName: "",
                lastName: "",
                email: "",
                password: ""
            },
            isLoggedIn: false,
            wantToLogin: false,
            serverMsg: ""
        };

        //fetch
        this.fetchData = "";
        this.dataserver = new DataServer();
        this.newCountKey = 2;
        this.authEmail = ["pitsini@gmail.com"];
        this.user1 = {
            email: "sarah@gmail.com",
            firstName: "Sarah",
            lastName: "Bowman",
            password: "1111"
        };
        this.user2 = {
            email: "pitsini@gmail.com",
            firstName: "New",
            lastName: "Pitsini",
            password: "1111"
        };
    }

    createAccSubmit = async e => {
        e.preventDefault();

        if (formValid(this.state)) {
            console.log(`
                --SUBMITTING--
                First Name: ${this.state.firstName}
                Last Name: ${this.state.lastName}
                Email: ${this.state.email}
                Password: ${this.state.password}
            `);
            // email already exists
            if (await this.checkEmailExist(this.state.email)) {
                console.log("Sorry, this email already exists!");
                let formErrors = { ...this.state.formErrors };
                formErrors.email = "This email already exists";
                this.setState(
                    {
                        formErrors,
                        [formErrors.email]: "This email already exists"
                    },
                    () => console.log(this.state)
                );
            } else {
                // add new user in Database
                console.log("create account: it's a new one!");
                await this.addNewUser(this.state);
                this.setState({
                    isLoggedIn: true
                });
            }
        } else {
            console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
        }
    };

    logInSubmit = async e => {
        e.preventDefault();

        if (loginFormValid(this.state)) {
            console.log(`
                --SUBMITTING--
                Email: ${this.state.email}
                Password: ${this.state.password}
            `);

            if (
                await this.checkEmailPasswd(
                    this.state.email,
                    this.state.password
                )
            ) {
                this.setState({
                    isLoggedIn: true
                });
            } else {
                // wrong email or password
                console.log("wrong username/password");
                let formErrors = { ...this.state.formErrors };
                formErrors.password = "Invalid email or password";
                this.setState(
                    {
                        formErrors,
                        [formErrors.password]: "Invalid email or password"
                    },
                    () => console.log(this.state)
                );
            }
        } else {
            console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
        }
    };

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };

        switch (name) {
            case "firstName":
                formErrors.firstName =
                    value.length < 3 ? "minimum 3 characters required" : "";
                break;
            case "lastName":
                formErrors.lastName =
                    value.length < 3 ? "minimum 3 characters required" : "";
                break;
            case "email":
                formErrors.email = emailRegex.test(value)
                    ? ""
                    : "invalid email address";
                break;
            case "password":
                formErrors.password =
                    value.length < 4 ? "minimum 4 characters required" : "";
                break;
            default:
                break;
        }

        this.setState({ formErrors, [name]: value }, () =>
            console.log(this.state)
        );
    };

    onClickLogin = () => {
        this.setState({ wantToLogin: true });
        console.log("set wanttologin = true");
    };

    onClickCreateAcc = () => {
        this.setState({ wantToLogin: false });
        console.log("set wanttologin = false");
    };

    //fetch
    checkEmailExist = async email => {
        let duplicate = false;
        this.fetchData = await fetch_functions.getData(1);
        this.fetchData[0].users.forEach(each => {
            if (email === each.email) {
                duplicate = true;
            }
        });
        return duplicate;
    };

    checkEmailPasswd = async (email, password) => {
        let correctEmailPasswd = false;

        this.fetchData = await fetch_functions.getData(1);
        this.fetchData[0].users.forEach(each => {
            if (email === each.email && password === each.password) {
                correctEmailPasswd = true;
                this.setState({
                    firstName: each.firstName,
                    lastName: each.lastName
                });
            }
        });
        return correctEmailPasswd;
    };

    addNewUser = async newUser => {
        this.fetchData = await fetch_functions.getData(1);
        console.log("this.fetchData", this.fetchData[0]);
        await fetch_functions.addNewUser(this.fetchData[0], newUser);
    };

    checkServer = async () => {
        this.setState({ serverMsg: "Connecting..." });
        try {
            this.fetchData = await fetch_functions.getAllData();
            switch (true) {
                case this.fetchData.status === 200:
                    this.message = "Successfully Connected to Server!";
                    break;
                default:
                    this.message = "";
            }
        } catch (error) {
            this.message = `Connection Failed!`;
            console.log("message: ", error);
        }
    };

    loadServer = async () => {
        // if it's not the right DB or no data in DB
        if (
            this.fetchData.length === 0 ||
            this.fetchData[0].countKey === undefined ||
            this.fetchData[0].authEmail === undefined
        ) {
            console.log("Reset Database");
            this.fetchData = await fetch_functions.clearData();
            this.fetchData = await fetch_functions.resetCountKey();
            this.fetchData = await fetch_functions.getData(0);
            console.log(this.fetchData[0]);
            this.fetchData = await fetch_functions.addAuthUser(
                this.fetchData[0],
                this.authEmail
            );
            if (this.fetchData === 200) {
                this.dataserver.setCountKey(this.newCountKey);
            }

            this.fetchData = await fetch_functions.resetUsers();

            // add user1
            this.fetchData = await fetch_functions.getData(1);
            await this.addNewUser(this.user1);

            // add user2
            this.fetchData = await fetch_functions.getData(1);
            await this.addNewUser(this.user2);
        } else if (this.fetchData.length === 1) {
            // has only countKey data
            console.log("has only countKey data");
            console.log(this.fetchData[0]);

            this.newCountKey = this.fetchData[0].countKey;
            await fetch_functions.addAuthUser(
                this.fetchData[0],
                this.authEmail
            );
            this.dataserver.setCountKey(this.fetchData[0].countKey);
        } else {
            // has the right data in DB
            console.log("has the right data in DB");
            this.dataserver.allData = []; // clear array
            this.newCountKey = this.fetchData[0].countKey;
            this.dataserver.setCountKey(this.fetchData[0].countKey);
        }
        this.setState({ serverMsg: this.message });
    };

    async componentDidMount() {
        await this.checkServer();
        await this.loadServer();
    }

    render() {
        if (this.state.isLoggedIn || this.debug) {
            // show game page
            this.content = (
                <App
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                    email={this.state.email}
                />
            );
        } else if (this.state.wantToLogin) {
            // show login page
            this.content = (
                <div className="wrapper">
                    <div className="form-wrapper">
                        <h1>Log In</h1>
                        <form onSubmit={this.logInSubmit} noValidate>
                            <div className="email">
                                <label htmlFor="email">Email</label>
                                <input
                                    className={
                                        this.state.formErrors.email.length > 0
                                            ? "error"
                                            : null
                                    }
                                    placeholder="Email"
                                    type="email"
                                    name="email"
                                    noValidate
                                    onChange={this.handleChange}
                                />
                                {this.state.formErrors.email.length > 0 && (
                                    <span className="errorMessage">
                                        {this.state.formErrors.email}
                                    </span>
                                )}
                            </div>
                            <div className="password">
                                <label htmlFor="password">Password</label>
                                <input
                                    className={
                                        this.state.formErrors.password.length >
                                        0
                                            ? "error"
                                            : null
                                    }
                                    placeholder="Password"
                                    type="password"
                                    name="password"
                                    noValidate
                                    onChange={this.handleChange}
                                />
                                {this.state.formErrors.password.length > 0 && (
                                    <span className="errorMessage">
                                        {this.state.formErrors.password}
                                    </span>
                                )}
                            </div>
                            <div className="createAccount">
                                <button type="submit">Log In</button>
                                <small
                                    className="link"
                                    onClick={this.onClickCreateAcc}
                                >
                                    Create New Account
                                </small>
                            </div>
                        </form>
                    </div>
                </div>
            );
        } else {
            console.log("create account page...");
            // show create account page
            this.content = (
                <div>
                    <div id="serverMsg" className="server">
                        {this.state.serverMsg}
                    </div>
                    <div className="wrapper">
                        <div className="form-wrapper">
                            <div>
                                <h1>Create Account</h1>
                                <form
                                    onSubmit={this.createAccSubmit}
                                    noValidate
                                >
                                    <div className="firstName">
                                        <label htmlFor="firstName">
                                            First Name
                                        </label>
                                        <input
                                            className={
                                                this.state.formErrors.firstName
                                                    .length > 0
                                                    ? "error"
                                                    : null
                                            }
                                            placeholder="First Name"
                                            type="text"
                                            name="firstName"
                                            noValidate
                                            onChange={this.handleChange}
                                        />
                                        {this.state.formErrors.firstName
                                            .length > 0 && (
                                            <span className="errorMessage">
                                                {
                                                    this.state.formErrors
                                                        .firstName
                                                }
                                            </span>
                                        )}
                                    </div>
                                    <div className="lastName">
                                        <label htmlFor="lastName">
                                            Last Name
                                        </label>
                                        <input
                                            className={
                                                this.state.formErrors.lastName
                                                    .length > 0
                                                    ? "error"
                                                    : null
                                            }
                                            placeholder="Last Name"
                                            type="text"
                                            name="lastName"
                                            noValidate
                                            onChange={this.handleChange}
                                        />
                                        {this.state.formErrors.lastName.length >
                                            0 && (
                                            <span className="errorMessage">
                                                {this.state.formErrors.lastName}
                                            </span>
                                        )}
                                    </div>
                                    <div className="email">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            id="email"
                                            className={
                                                this.state.formErrors.email
                                                    .length > 0
                                                    ? "error"
                                                    : null
                                            }
                                            placeholder="Email"
                                            type="email"
                                            name="email"
                                            noValidate
                                            onChange={this.handleChange}
                                        />
                                        {this.state.formErrors.email.length >
                                            0 && (
                                            <span className="errorMessage">
                                                {this.state.formErrors.email}
                                            </span>
                                        )}
                                    </div>
                                    <div className="password">
                                        <label htmlFor="password">
                                            Password
                                        </label>
                                        <input
                                            className={
                                                this.state.formErrors.password
                                                    .length > 0
                                                    ? "error"
                                                    : null
                                            }
                                            placeholder="Password"
                                            type="password"
                                            name="password"
                                            noValidate
                                            onChange={this.handleChange}
                                        />
                                        {this.state.formErrors.password.length >
                                            0 && (
                                            <span className="errorMessage">
                                                {this.state.formErrors.password}
                                            </span>
                                        )}
                                    </div>
                                    <div className="createAccount">
                                        <button type="submit">
                                            Create Account
                                        </button>
                                        <small
                                            className="link"
                                            onClick={this.onClickLogin}
                                        >
                                            Already Have an Account?
                                        </small>
                                        <div>-OR-</div>
                                        <Facebook />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return <div>{this.content}</div>;
    }
}

export default Login;
