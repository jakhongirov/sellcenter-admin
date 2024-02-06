import { Routes, Route } from "react-router-dom";

import Sidebar from "../../Containers/SideBar/Sidebar";
import Admins from "../Admins/Admins";
import Users from "../Users/Users";
import Cars from "../Cars/Cars";
import CarsMarks from "../Cars/CarsMarks/CarsMarks";
import CarsOthers from "../Cars/CarsOthers";
import Motorcycle from "../Motorcycle/Motorcycle";
import SingleCarsMarks from "../Cars/CarsMarks/SingleCarsMarks";
import UsersCompany from "../Users/UsersCompany";
import Slider from "../Slider/Slider";
import Ads from "../Ads/Ads";
import MotorcycleMarks from "../Motorcycle/MotorcycleMarks/MotorcycleMarks";
import MotorHome from "../MotorHome/MotorHome";
import MotorHomeMarks from "../MotorHome/MotorHomeMarks/MotorHomeMarks";
import VanMarks from "../Van/VanMarks/VanMarks";
import TrailerMarks from "../Trailer/TrailerMarks/TrailerMarks";
import TruckMarks from "../Truck/TruckMarks/TruckMarks";
import SemiTreilerTruckMarks from "../SemiTrailerTruck/SemiTrailerTruckMarks/SemiTrailerTruckMarks";
import SemiTrailerMarks from "../SemiTrailer/SemiTrailerMarks/SemiTrailerMarks";
import CoacheMarks from "../Coache/CoacheMarks/CoacheMarks";
import AgriculturalVehicleMarks from "../AgriculturalVehicle/AgriculturalVehicleMarks/AgriculturalVehicleMarks";
import ConstructionMachineMarks from "../ConstructionMachine/ConstructionMachineMarks/ConstructionMachineMarks";
import ForkliftMarks from "../Forklift/ForkliftMarks/ForkliftMarks";
import SingleMotorcycleMarks from "../Motorcycle/SingleMotorcycleMars";
import SingleMotorHomeMarks from "../MotorHome/MotorHomeMarks/SingleMotorHomeMarks";
import SingleVanMarks from "../Van/VanMarks/SingleVanMarks";
import SingleTruckMarks from "../Truck/TruckMarks/SingleTruckMarks";
import SingleTrailerMarks from "../Trailer/TrailerMarks/SingleTrailerMarks";
import SingleSemiTrailerTruckMarks from "../SemiTrailerTruck/SemiTrailerTruckMarks/SingleSemiTrailerTruckMarks";
import SingleSemiTreilerMarks from "../SemiTrailer/SemiTrailerMarks/SingleSemiTrailerMarks";
import SingleCoacheMarks from "../Coache/CoacheMarks/SingleCoacheMarks";
import SingleAgriculturalMarks from "../AgriculturalVehicle/AgriculturalVehicleMarks/SingleAgriculturalVehicleMarks";
import SingleConstructionMachineMarks from "../ConstructionMachine/ConstructionMachineMarks/SingleConstructionMachineMarks";
import SingleForkliftMarks from "../Forklift/ForkliftMarks/SingleForkliftMarks";
import News from "../News/News";
import AddPage from "../AddPage/AddPage";
import EditNews from "../../Components/EditModal/EditNews/EditNews";
import Van from "../Van/Van";
import SemiTrailerTruck from "../SemiTrailerTruck/SemiTrailerTruck";
import SemiTrailer from "../SemiTrailer/SemiTrailer";
import Coache from "../Coache/Coache";
import AgriculturalVehicle from "../AgriculturalVehicle/AgriculturalVehicle";
import ConstructionMachine from "../ConstructionMachine/ConstructionMachine";
import Forklift from "../Forklift/Forklift";
import Payment from "../Payment/Payment";
import AddPayment from "../../Components/AddModal/AddPayment/AddPayment";
import Trailer from "../Trailer/Trailer";
import Truck from "../Truck/Truck";

function Admin() {
  return (
    <div className="app">
      <div>
        <Sidebar />
      </div>
      <div>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/users/company" element={<UsersCompany />} />
          <Route path="/admins" element={<Admins />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/cars/marks" element={<CarsMarks />} />
          <Route path="/cars/marks/:name/:id" element={<SingleCarsMarks />} />
          <Route path="/cars/others" element={<CarsOthers />} />
          <Route path="/motorcycle" element={<Motorcycle />} />
          <Route path="/motorcycle/marks" element={<MotorcycleMarks />} />
          <Route
            path="/motorcycle/marks/:name/:id"
            element={<SingleMotorcycleMarks />}
          />
          <Route path="/slider" element={<Slider />} />
          <Route path="/ads" element={<Ads />} />
          <Route path="/motorhome" element={<MotorHome />} />
          <Route path="/motorhome/marks" element={<MotorHomeMarks />} />
          <Route
            path="/motorhome/marks/:name/:id"
            element={<SingleMotorHomeMarks />}
          />
          <Route path="/van" element={<Van />} />
          <Route path="/van/marks" element={<VanMarks />} />
          <Route path="/van/marks/:name/:id" element={<SingleVanMarks />} />
          <Route path="/truck" element={<Truck />} />
          <Route path="/truck/marks" element={<TruckMarks />} />
          <Route path="/truck/marks/:name/:id" element={<SingleTruckMarks />} />
          <Route path="/trailer" element={<Trailer />} />
          <Route path="/trailer/marks" element={<TrailerMarks />} />
          <Route
            path="/trailer/marks/:name/:id"
            element={<SingleTrailerMarks />}
          />
          <Route path="/semitruck" element={<SemiTrailerTruck />} />
          <Route path="/semitruck/marks" element={<SemiTreilerTruckMarks />} />
          <Route
            path="/semitruck/marks/:name/:id"
            element={<SingleSemiTrailerTruckMarks />}
          />
          <Route path="/semi-trailer" element={<SemiTrailer />} />
          <Route path="/semi-trailer/marks" element={<SemiTrailerMarks />} />
          <Route
            path="/semi-trailer/marks/:name/:id"
            element={<SingleSemiTreilerMarks />}
          />
          <Route path="/coache" element={<Coache />} />
          <Route path="/coache/marks" element={<CoacheMarks />} />
          <Route
            path="/coache/marks/:name/:id"
            element={<SingleCoacheMarks />}
          />
          <Route
            path="/agricultural-vehicle"
            element={<AgriculturalVehicle />}
          />
          <Route
            path="/agricultural-vehicle/marks"
            element={<AgriculturalVehicleMarks />}
          />
          <Route
            path="/agricultural-vehicle/marks/:name/:id"
            element={<SingleAgriculturalMarks />}
          />
          <Route
            path="/construction-machines/"
            element={<ConstructionMachine />}
          />
          <Route
            path="/construction-machines/marks"
            element={<ConstructionMachineMarks />}
          />
          <Route
            path="/construction-machines/marks/:name/:id"
            element={<SingleConstructionMachineMarks />}
          />
          <Route path="/forklift" element={<Forklift />} />
          <Route path="/forklift/marks" element={<ForkliftMarks />} />
          <Route
            path="/forklift/marks/:name/:id"
            element={<SingleForkliftMarks />}
          />
          <Route path="/news" element={<News />} />
          <Route path="/news/add" element={<AddPage />} />
          <Route path="/news/edit/:id" element={<EditNews />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/payment/add" element={<AddPayment />} />
        </Routes>
      </div>
    </div>
  );
}

export default Admin;
