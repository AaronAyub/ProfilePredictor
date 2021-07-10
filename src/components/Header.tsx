import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'

function Header (): JSX.Element {
    return (
        <div>
        <AppBar>
            <Toolbar className="toolbar" variant="dense">
                <Typography variant="h6">Profile Predictor</Typography>
                <Button href="https://github.com/AaronAyub/ProfilePredictor" color="inherit">GITHUB</Button>
            </Toolbar>
        </AppBar>
        <Toolbar variant="dense"></Toolbar> {/* This second toolbar is used to take up space and not hide elements of the page. */}
        </div>
    )
}

export default Header