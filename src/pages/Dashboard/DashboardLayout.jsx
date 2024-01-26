import Navigation from "pages/Dashboard/Components/Navigation"

export default function DashboardLayout(props) {
    return (
        <>
            <Navigation />
            {props.children}
        </>
    )
}
