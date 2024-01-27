
import { FaBookmark, FaCogs } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa6";
import { MdGroups2 } from "react-icons/md";
import { BiSolidCard } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
const  NavBar=()=> {
	return (
		<>
			<div className="top-0 left-0 m-0 flex flex-auto h-screen fixed flex-col justify-between bg-bgUi shadow-lg">
				<div>
					<Link to="/dashboard">
						<NavBaricon icon={<FaUserAlt size={40} text="home"/>} />
						</Link>
						<Link to="/dashboard/your-spaces">
							
						<NavBaricon icon={<FaBookOpen size={40} />} text="book"/> {/*book*/}
						</Link>
						<Link to="/dashboard/your-spaces"> 
						<NavBaricon icon={ <MdGroups2 size={40}/>} text="spaces"/>{/*groups*/}
						</Link>
						<Link to="/dashboard/your-spaces">

							<NavBaricon icon={<FaBookmark size={40} />} text="hiligited notes" />{/*hilighted*/}
						</Link>
						<Link to="/dashboard/your-flashcards">				
						<NavBaricon icon={<BiSolidCard size={40} />} text="flashcards"/>{/*flashcard*/}
					</Link>
				</div>
				<Link to="/setting/">
				<NavBaricon icon={<FaCogs size={40} />} text="setting" /> {/*setting*/}
				</Link>
			</div>
		</>
	)
}
const NavBaricon = ({ icon, text }) => (
	<div className="NavBar-Icons group">
		{icon}
		<span class="sidebar-tooltip group-hover:scale-100">
      {text}
    </span>
	</div>

)
export default NavBar