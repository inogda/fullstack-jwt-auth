import React, {useContext, useState} from 'react';
import "./Header.css"
import {Context} from "../../index";


function Header() {

    const [viewLogaut, setViewLogaut] = useState(false);
    const {store} = useContext(Context);


    const vLogaut = (e: any) => {

        if(viewLogaut) {
            setViewLogaut(false);
        } else {
            setViewLogaut(true);
        }

        //console.log(e);
        //debugger;
    }

    return (
        <header className="header">
            <div className="container">
                <div className="header-row">
                    <div className="header-row__left">
                        <a href="#" className="header-menu">
                            <img src="/img/Vector.svg" alt="menu" />
                        </a>
                        <div className="header-logo">
                            <a href="/" className="a-btn a-btn-active">Voypost</a>
                        </div>
                    </div>
                    <div className="header-row__right">
                        <a onClick={vLogaut}  title="Home" className="avatar">
                            {store.user.firstname && store.user.lastname &&
                                <>{store.user.firstname[0]}{store.user.lastname[0]}</>
                            }
                            {!store.user.firstname && !store.user.lastname &&
                            <>U</>
                            }
                        </a>
                        <ul className="header-menu-right">

                            {viewLogaut &&
                                <li className="header-menu-right__li">
                                    <button onClick={() => store.logout()}>Logout</button>

                                </li>
                            }

                        </ul>

                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;