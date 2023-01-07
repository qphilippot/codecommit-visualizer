type SidebarLayoutProperties = {
    width: number,
    children: JSX.Element
};

function SidebarLayout({width, children}: SidebarLayoutProperties) {
    const divStyle = {
        width: width + 'px',
    };

    const isOpen = width > 0;


    return (
        <div className="d-flex flex-column flex-shrink-0 text-white bg-dark sidebar"
             style={divStyle}
        >
            {isOpen ? children : ''}
        </div>
    )
}

export default SidebarLayout;
