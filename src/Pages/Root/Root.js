import {Outlet} from "react-router-dom";
import Header from "../../Components/Header/Header";
import OfflinePopup from "../../Components/OfflinePopup/OfflinePopup";

function RootLayout () {
    return(<>
        <Header />
        <main>
            <Outlet  />
        </main>
        <OfflinePopup />
    </>)
}

export default RootLayout