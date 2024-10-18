import { BrowserRouter, Routes, Route } from "react-router-dom";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import Update from "./pages/Update";
import Create from "./pages/Create";
import Undefined from "./pages/Undefined";
import Sidebar from "./component/Sidebar";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 bg-gray-200 p-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tarif/:id" element={<Detail />} />
            <Route path="/ekle" element={<Create />} />
            <Route path="/düzenle/:id" element={<Update />} />
            <Route path="/*" element={<Undefined />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
