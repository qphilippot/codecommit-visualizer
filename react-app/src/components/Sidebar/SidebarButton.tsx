import {Link} from 'react-router-dom';
import styled from 'styled-components';

type SidebarButtonProperties = {
    isSelected: boolean,
    icon: JSX.Element,
    label: string,
    route: string
};

const ButtonIcon = styled.div`
  margin-right: 5px;
  float: left
`

function SidebarButton({icon, label, route, isSelected}: SidebarButtonProperties) {

    return (
        // <p>toto</p>
        <Link
            to={route}
            className={isSelected ? 'nav-link active' : 'nav-link text-white'}
            aria-current={isSelected ? 'page' : undefined}
        >
            <ButtonIcon>{icon}</ButtonIcon>
            {label}
        </Link>
    )
}

export default SidebarButton;
