// @ts-ignore
import styled from 'styled-components';

type ToggleSidebarButtonProperties = {
    offset: number
};

const ButtonIcon = styled.div`
  margin-right: 5px;
  float: left
`

function ToggleSidebarButton({ offset }: ToggleSidebarButtonProperties) {
    const isOpen = offset > 0;
    return (
        <div
            className={isOpen ? 'toggle-btn' : 'toggle-btn close'}
            style={{left: Math.max(offset - 30, 0) + 'px'}}
        >
            <i
                className={isOpen ? 'fa-solid fa-angle-right ' : 'fa-solid fa-angle-right rotate-180'}
                style={{fontSize: '16px'}}
            ></i>
        </div>
    );
}

export default ToggleSidebarButton;
