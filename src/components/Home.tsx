import React, { useEffect } from 'react'
import { Box, Link, Button } from '@mui/material'
import { fetchMeme } from '../actions'
import { connect } from 'react-redux'
import CustomLoading from './CustomLoading'

type Props = {
    fetchMeme: () => any,
    url: string,
    title: string,
    postLink: string,
    fetching: boolean
}

const Home: React.FC<Props> = ({
    fetchMeme, url, title, postLink, fetching
}: Props) => {
    useEffect(() => {
        fetchMeme()
    }, [fetchMeme])

    return (
        <Box sx={{
            width: 'min(90vw, 400px)',
            display: 'flex',
            flexDirection: 'column',
            margin: 'auto',
            alignItems: 'center',

        }}>
            <p style={{ margin: 0, padding: 0, textAlign: 'center' }}>Náhodný meme zde:</p>
            {fetching
                ? <CustomLoading />
                : (<>
                    <Link
                        sx={{ fontSize: '1.5rem' }}
                        href={postLink}
                        target="_blank"
                        rel="noreferrer">{title}</Link>
                    <img src={url} alt={title} style={{ maxWidth: '100%' }} title={title} />
                    <Button
                        sx={{ marginTop: '1rem' }}
                        onClick={() => fetchMeme()}>
                        Další prosím
                    </Button>
                </>)}
        </Box>
    )
}

const mapStateToProps = (state: any) => {
    return {
        url: state.meme.url,
        title: state.meme.title,
        postLink: state.meme.postLink,
        fetching: state.meme.fetching
    }
}
export default connect(mapStateToProps, { fetchMeme })(Home)
