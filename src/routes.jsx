import { Route, Routes } from "react-router-dom";

import Home from "./views/Home";
import Algorithm from "./views/Algorithm";

export default function MyRoutes(){
    return(
        <Routes>
            <Route index element={<Home/>}></Route>
            <Route path="algorithm/:id" element={<Algorithm/>}></Route>
        </Routes>
    )
}