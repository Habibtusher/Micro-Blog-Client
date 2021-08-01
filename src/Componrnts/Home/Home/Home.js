import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../../../App';
import AddBlog from '../../AddBlog/AddBlog';
import Login from '../../Login/Login';
import Navbar from '../Navbar/Navbar';
import ViewBlogs from '../ViewBlogs/ViewBlogs';

const Home = () => {

    const [ loggedInUser, setLoggedInUser ] = useContext(UserContext)
    return (
        <div>       
            {
                loggedInUser.email  ?
                    <div>
                        <Navbar />
                        <AddBlog/>
                        <ViewBlogs/>
                    </div>
                    :
                    <div>
                        <Login/>                       
                    </div>
            }
        </div>
    );
};

export default Home;