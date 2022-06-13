import React, { FC, useContext, useState} from 'react';
import { useForm} from "react-hook-form";
import {Context} from "../../index";
import "./LoginForm.css";
import {useNavigate} from "react-router-dom";



const LoginForm: FC = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    //const [firstname, setFirstName] = useState<string>('')
    //const [lastname, setLastName] = useState<string>('')
    const {store} = useContext(Context);

    type Email = string;
    type Password = string;

// This type will be used later in the form.
    type User = {
        email: Email;
        password: Password;
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<User>();


    const onSubmit = (data: User, e: any): void => {
        e.preventDefault();
        console.log(data);
        //debugger;
        store.login(email, password);

    };

    const onChange = (e: any) => {
        // eslint-disable-next-line
        if (e.target.name == 'email') {
            setEmail(e.target.value);
        }
        // eslint-disable-next-line
        if (e.target.name == 'password') {
            setPassword(e.target.value);
        }
    }

    const viewPassword = (e: any) => {
        let input: any;
        input = document.getElementById("password");
        // eslint-disable-next-line
        if(input.getAttribute('type') == 'password') {
            input.removeAttribute('type');
            input.setAttribute('type', 'text');
            e.target.src = "/img/okoline.png";
        } else {
            input.removeAttribute('type');
            input.setAttribute('type', 'password');
            e.target.src = "/img/oko.png";
        }

        //console.log(e);
        //debugger;
    }


    return (


        <section className="login">
            <div className="login__left">
                <img src="/img/hero-image.png" alt="big photo" />
            </div>
            <div className="login-right">
                <div className="login-logo">
                    <img src="/img/logotip.svg" alt="logo" />
                </div>
                <div className="login-title">
                    Login
                </div>



                <form onSubmit={handleSubmit(onSubmit)} onChange={onChange} className="request">

                    <ul className="login-form">

                        <li>
                            <div className="request-grid">
                                <label className={`request-label ${errors.email ? "border-error" : null}`}>
                                    <span className="r-text">Email</span>

                                    <input
                                        type="email"
                                        //name="email"
                                        className="request-input r-email"
                                        //onChange={e => setEmail(e.target.value)}
                                        //value="xfgdfg@fgfdfg.yy"
                                        placeholder='Email'
                                        {...register("email", {
                                            required: "Enter value",
                                            minLength: {
                                                value: 5,
                                                message: "min length is 5"
                                            },
                                            maxLength: 100,
                                            // eslint-disable-next-line
                                            pattern: {
                                                value: /\S+@\S+\.\S+/,
                                                message: "Entered value does not match email format"
                                            }
                                        })}
                                    />
                                </label>
                                {errors.email &&
                                    <div className="request-grid-label text-error">
                                        {errors.email.message}
                                    </div>
                                }
                            </div>
                        </li>
                        <li>
                            <div className="request-grid">
                                <label className={`request-label ${(errors.password  && !errors.email)? "border-error" : null}`}>
                                    <span className="r-text">Password</span>
                                    <div className="r-pass">

                                        <input
                                            id="password"
                                            type="password"
                                            //name="password"
                                            className="request-input r-password "
                                            //onChange={e => setPassword(e.target.value)}
                                            value={password}
                                            placeholder='Пароль'
                                            {...register('password', {
                                                required: "Enter value",
                                                minLength: {
                                                    value: 5,
                                                    message: "min length is 5"
                                                },
                                                maxLength: {
                                                    value: 40,
                                                    message: "max length is 40"
                                                }
                                            })}
                                        />


                                        <a onClick={viewPassword} className="r-oko">
                                            <img src="/img/oko.png" alt="img" className="r-img" />
                                        </a>
                                    </div>
                                </label>


                                {(errors.password  && !errors.email) &&
                                <div className="request-grid-label text-error">
                                    {errors.password.message}
                                </div>
                                }
                            </div>
                        </li>

                    </ul>

                    <div className="request__btn">
                        <button
                            type="submit"
                            className="request-btn"
                        >
                            Sign up
                        </button>
                    </div>
                </form>


                <div className="request__btn">
                    <button
                        onClick={async event => { navigate(`/registration`); }}
                        className="request-btn"
                    >
                        Registration
                    </button>
                </div>

            </div>


        </section>



    );
};

export default LoginForm;
