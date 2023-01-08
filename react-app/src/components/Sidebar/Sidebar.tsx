import SidebarLayout from './SidebarLayout';
import SidebarButton from './SidebarButton';
import ToggleSidebarButton from './ToggleSidebarButton';

import './Sidebar.css';


export type SidebarLinkProperties = {
    route: string,
    icon: JSX.Element,
    text: string
};


type SidebarProperties = {
    currentRoute: string,
    width: number,
    routing: SidebarLinkProperties[]
};



function Sidebar({currentRoute, width, routing}: SidebarProperties) {

    return (
        <SidebarLayout width={width}>
            <>
                <a
                    href="/"
                    className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
                >
                    <img
                        alt="CodeCommitVisualizer logo"
                        src={process.env.PUBLIC_URL + '/codecommit.png'}
                        style={{width: "18px", marginRight: "5px"}}
                    />
                    <span className="fs-5">CodeCommit-Visualizer </span>
                </a>
                <hr/>
                <ul className="nav nav-pills flex-column mb-auto">

                    {routing.map((entry, index) => {
                        return (
                            <li className="nav-item" key={entry.route}>
                                <SidebarButton
                                    isSelected={currentRoute === entry.route }
                                    route={entry.route}
                                    icon={entry.icon}
                                    label={entry.text}
                                />
                            </li>
                        )
                    })}
                </ul>

                <ToggleSidebarButton offset={width}/>
            </>
        </SidebarLayout>

    )
}

export default Sidebar;
