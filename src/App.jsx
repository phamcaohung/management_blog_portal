import { Route, Routes } from "react-router-dom"
import GeneralRouter from "./router/GeneralRouter";
import AdminRouter from "./router/AdminRouter";

function App() {
    return (
        <Routes>
            <Route path='/*' element={<GeneralRouter/>}></Route>
            <Route path='/admin/*' element={<AdminRouter/>}></Route>
        </Routes>  
    )
}

export default App
