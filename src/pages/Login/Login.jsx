import { navigate } from "@store";
import stiles from "./Login.module.css";

import { useStoreon } from 'storeon/react'
import { useApi } from "@hooks";
import axios from "axios";
import { useState } from "react";

const Login = () => {

  const { apiUrl } = useApi();
  const { dispatch } = useStoreon('user')

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios
      .post(`${apiUrl}/usuarios/login`, {
        correo: username,
        contra: password,
      })
      .then((response) => {
        console.log(response.data, (typeof response.data));
        if (response.data !== false) {
          dispatch('user/login', { correo: response.data['correo'], nombre: response.data['nombre'], apellido: response.data['apellido'], edad: response.data['edad'], pais: response.data['pais'], genero: response.data['genero'], preferencias: response.data['preferencias'] });
          navigate("/main");
        }
      })
      .catch((error) => {
        // Handle the error
        console.log("An error occurred while sending data", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      <button type="submit">Log in</button>
    </form>
  );
};

export default Login;
