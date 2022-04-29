import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Header from './Header';

export default function Videoplayer() {
    const params = useRef(useParams().videoid);
    let token = useRef(JSON.parse(localStorage.getItem('user_details')).token);
    let userid = useRef(
        JSON.parse(localStorage.getItem('user_details')).user_id,
    );
    const [video, setVideo] = useState('');
    let videoTime = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(
            `http://localhost:8000/videos/${params.current}/${userid.current}`,
            {
                headers: {
                    Authorization: `Bearer ${token.current}`,
                },
            },
        )
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setVideo(data);

                if (data.currentTime !== undefined) {
                    videoTime.current.currentTime = data.currentTime;
                }
            })
            .catch((err) => console.log(err));
    }, []);

    const handleVideoElement = (e) => {
        videoTime.current = e;
    };

    const closePlayer = () => {
        fetch(
            `http://localhost:8000/trackTime/${userid.current}/${params.current}`,
            {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token.current}`,
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    currentTime: videoTime?.current.currentTime - 5.0,
                }),
            },
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    navigate('/videos');
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="bg video_player_container">
            <Header />

            <h1 className="title" style={{ fontSize: '28px' }}>
                {video.originalTitle}
            </h1>
            <div className="video_player">
                <div className="video_player_btn_container">
                    <button
                        onClick={closePlayer}
                        type="button"
                        className="video_player_btn"
                    >
                        &#10005;
                    </button>
                </div>

                {video.videoPath !== undefined ? (
                    <video
                        width="100%"
                        controls
                        autoPlay
                        ref={handleVideoElement}
                    >
                        <source
                            src={`http://localhost:8000/stream/${video.videoPath}`}
                            type="video/mp4"
                        />
                    </video>
                ) : null}

                <div className="video_content">
                    <div className="storyline">
                        <h1
                            className="title"
                            style={{ fontFamily: 'sans-serif' }}
                        >
                            Story Line
                        </h1>
                        <p
                            style={{
                                fontWeight: 'lighter',
                                color: 'lightgray',
                                fontSize: '15px',
                                marginTop: '5px',
                                fontFamily: 'monospace',
                            }}
                        >
                            {video?.storyline}
                        </p>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginTop: '20px',
                        }}
                    >
                        <div className="rating">
                            <h1
                                className="title"
                                style={{
                                    fontFamily: 'sans-serif',
                                    fontSize: '24px',
                                }}
                            >
                                IMDB Rating
                            </h1>
                            <p
                                style={{
                                    color: 'lightgray',
                                    fontFamily: 'monospace',
                                    fontSize: '16px',
                                    fontWeight: '400',
                                }}
                            >
                                {video?.imdbRating}
                            </p>
                        </div>

                        <div className="genre">
                            <h1
                                className="title"
                                style={{
                                    fontFamily: 'sans-serif',
                                    fontSize: '24px',
                                }}
                            >
                                Genre
                            </h1>
                            {video.genres?.map((genre, index) => (
                                <span
                                    key={index}
                                    style={{
                                        color: 'lightgray',
                                        fontFamily: 'monospace',
                                        fontSize: '16px',
                                        fontWeight: '400',
                                    }}
                                >
                                    {genre} .{' '}
                                </span>
                            ))}
                        </div>

                        <div className="duration">
                            <h1
                                className="title"
                                style={{
                                    fontFamily: 'sans-serif',
                                    fontSize: '24px',
                                }}
                            >
                                Duration
                            </h1>
                            <p
                                style={{
                                    color: 'lightgray',
                                    fontFamily: 'monospace',
                                    fontSize: '16px',
                                    fontWeight: '400',
                                }}
                            >
                                {video?.duration} minutes
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
