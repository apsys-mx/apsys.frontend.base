## Install vitejs

- Clone the repository with `https://github.com/apsys-mx/apsys.frontend.base.turkey.git`
- Change to `apsys.frontend.base.turkey`
- Run the command `npm create vite@latest .`
- Run the command `npm install`
- Run the command `npm run dev`

Check that the project is running correctly

## Install and configure redux store with redux-toolkit

### Set initial files structure

Remove files `App.css` and `index.css`
Rename files `App.jsx` to `app.jsx`
Change the `main.jsx` content as show below

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

- Change the `app.jsx` content as show below

```jsx
import React from "react";

const App = () => {
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
};

export default App;
```

- Install redux `npm install react-redux` and redux-toolkit `npm install @reduxjs/toolkit`
