import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, Link } from '@material-ui/core'
import React, { useState } from 'react'

function Header (): JSX.Element {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <div>
        <AppBar>
            <Toolbar className="toolbar" variant="dense">
                <Typography variant="h6">Profile Predictor</Typography>
                <div>
                    <Button color="inherit" aria-controls="apis" aria-haspopup="true" onClick={handleClick}>
                        APIs
                    </Button>
                    <Button href="https://github.com/AaronAyub/ProfilePredictor" color="inherit">GITHUB</Button>
                </div>
            </Toolbar>
        </AppBar>
        <Toolbar variant="dense"></Toolbar> {/* This second toolbar is used to take up space and not hide elements of the page. */}
        
        {/* This menu contains links to all apis used. */}
        <Menu id="apis"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>
            <MenuItem onClick={handleClose}>
                <Link href="https://agify.io/">
                    agify.io
                </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
                <Link href="https://genderize.io/">
                    genderize.io
                </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
                <Link href="https://nationalize.io/">
                    nationalize.io
                </Link>
            </MenuItem>
        </Menu>
        </div>
    )
}

export default Header