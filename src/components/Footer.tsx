import { Container, Link } from '@material-ui/core'

function Footer (): JSX.Element  {
    return (
        <Container className="footer">
            This website is not associated with Demografix ApS, which provides the services used for predictions, nor does it make any guarantees regarding the accuracy or completeness of predictions.&nbsp;
            <Link href="https://github.com/AaronAyub/ProfilePredictor/blob/main/LICENSE">
                This software is provided under the MIT License.
            </Link>
        </Container>
    )
}

export default Footer