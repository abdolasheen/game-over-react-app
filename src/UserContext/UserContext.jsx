import jwtDecode from "jwt-decode";
import React, { createContext, useContext, useState } from "react";

export const UserContext = React.createContext(null);

function UserContextProvider(props) {
  const [user, setUser] = useState(null);
  function getUser() {
    if (localStorage.getItem("user")) {
      let encodedToken = localStorage.getItem("user");
      let decodedToken = jwtDecode(encodedToken);
      setUser(decodedToken);
    } else {
      return;
    }
  }

  return (
    <UserContext.Provider value={{ user, setUser, getUser }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
