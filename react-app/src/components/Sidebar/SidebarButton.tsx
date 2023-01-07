// @ts-ignore
import styled from 'styled-components';

type SidebarButtonProperties = {
    isSelected: boolean,
    icon: JSX.Element,
    label: string
};

const ButtonIcon = styled.div`
    margin-right: 5px;
    float: left
`

function SidebarButton({isSelected, icon, label}: SidebarButtonProperties) {
    return (
        <a
            className={isSelected ? 'nav-link active' : 'nav-link text-white'}
            aria-current={isSelected ? 'page' : undefined}
        >
            <ButtonIcon>{ icon }</ButtonIcon>
            { label }
        </a>
    )
}

export default SidebarButton;
