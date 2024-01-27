import Navigation from "pages/Dashboard/Components/Navigation"
import { UserContext } from "providers/UserProvider";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardLayout(props) {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, []);

    return (
        <>
            <Navigation />
            {props.children}
        </>
    )
}
