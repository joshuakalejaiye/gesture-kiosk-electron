import history from './history';
import React, {useState} from 'react';
import { Link } from "react-router-dom";
import { getSessionCookie, setSessionCookie } from './sessions';

const LoginHandler = ({ history }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    // NOTE request to api login here instead of this fake promise
    await new Promise(r => setTimeout(r(), 1000));
    setSessionCookie({ email });
    history.push("/");
    setLoading(false);
  };


  if (loading) {
    return <h4>Logging in...</h4>;
  }

  return (
    <div style={{ marginTop: "1rem" }}>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};
  
const LogoutHandler = () => {
    return (<div>Logging out!</div>);
};
  
const ProtectedHandler = () => {
    return (
      <div>
        <Link to="/logout">Logout here</Link>
      </div>
    );
};

  export { LogoutHandler, ProtectedHandler, LoginHandler };