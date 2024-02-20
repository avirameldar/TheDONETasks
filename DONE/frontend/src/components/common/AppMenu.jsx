import { Drawer } from '@mui/material'

const AppMenu = (props) => {
    const { openMenu, close, menuBody } = props

    return (
        <Drawer
            anchor='left'
            open={openMenu}
            onClose={close}
        >
            {menuBody}
        </Drawer>
    )
}

export default AppMenu