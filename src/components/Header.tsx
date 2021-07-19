import { Container, Divider, AppBar, Toolbar, Typography, Button, Menu, MenuItem, Link, Dialog, DialogTitle, DialogActions } from '@material-ui/core'
import React, { useState } from 'react'

function Header (): JSX.Element {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
    const [open, setOpen] = useState<boolean>(false)

    // Functions used to open/close the API menu
    const handleApiOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleApiClose = () => {
        setAnchorEl(null)
    }

    // Functions used to open/close the About dialog
    const handleAboutOpen = () => {
        setOpen(true)
    }
    const handleAboutClose = () => {
        setOpen(false)
    }

    return (
        <div>
        <AppBar>
            <Toolbar className="toolbar" variant="dense">
                <Typography variant="h6">Profile Predictor</Typography>
                <div>
                    <Button color="inherit" aria-controls="about" aria-haspopup="true" onClick={handleAboutOpen}>
                        About
                    </Button>
                    <Button color="inherit" aria-controls="apis" aria-haspopup="true" onClick={handleApiOpen}>
                        APIs
                    </Button>
                    <Button href="https://github.com/AaronAyub/ProfilePredictor" color="inherit">GITHUB</Button>
                </div>
            </Toolbar>
        </AppBar>
        <Toolbar variant="dense"></Toolbar> {/* This second toolbar is used to take up space and not hide elements of the page. */}
        
        {/* A dialog popup with some information on the project. */}
        <Dialog onClose={handleAboutClose} aria-labelledby="aboutTitle" open={open}>
            <DialogTitle id="aboutTitle">About</DialogTitle>
            <Container>
                <p>Profile Predictor is a web-based interface used to predict certain attributes associated with names.
                These attributes include age, gender, and nationality.</p>
                <p>Upon entering a name, the query will return a predicted age, gender, probability of that name being associated with the given gender, and the three most likely countries this name belongs to.</p>
                <p>You may also narrow down predictions by providing a country. You can either enter a name, or a two-letter ISO 3166-1 alpha country code.</p>
                <p><Link href="https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements">List of supported countries and country codes</Link></p>
                <p>Predictions are performed by querying three APIs,&nbsp;
                <Link href="https://agify.io/">
                    agify.io
                </Link>,&nbsp;
                <Link href="https://genderize.io/">
                    genderize.io
                </Link>, and&nbsp;
                <Link href="https://nationalize.io/">
                    nationalize.io
                </Link>.
                    These APIs are provided by Demographix ApS.</p>
            </Container>
            <Divider/>
            <DialogTitle id="disclaimer">Disclaimer</DialogTitle>
            <Container>
                This website and the developers are not associated with Demografix ApS in any way. Demografix ApS provides public APIs used by this website to make predictions, as noted above. This software does not provide any guarantees regarding the accuracy or completeness of returned predictions.
                <DialogActions>
                <Button onClick={handleAboutClose} color="primary">
                    Okay
                </Button>
            </DialogActions>
            </Container>
            
        </Dialog>

        {/* This menu contains links to all apis used. */}
        <Menu id="apis"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleApiClose}>
            <MenuItem onClick={handleApiClose}>
                <Link href="https://agify.io/">
                    agify.io
                </Link>
            </MenuItem>
            <MenuItem onClick={handleApiClose}>
                <Link href="https://genderize.io/">
                    genderize.io
                </Link>
            </MenuItem>
            <MenuItem onClick={handleApiClose}>
                <Link href="https://nationalize.io/">
                    nationalize.io
                </Link>
            </MenuItem>
        </Menu>
        </div>
    )
}

export default Header