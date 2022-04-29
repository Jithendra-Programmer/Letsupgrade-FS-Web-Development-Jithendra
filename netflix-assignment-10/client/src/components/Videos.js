import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

function Videos() {
    const [videos, setVideos] = useState('');

    let token = useRef(JSON.parse(localStorage.getItem('user_details')).token);
    useEffect(() => {
        fetch('http://localhost:8000/videos', {
            headers: {
                authorization: 'bearer ' + token.current,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setVideos(data);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <section className="bg">
            <Header />
            <h1 className="title">All Videos</h1>

            <div className="video-container">
                {videos.length === 0
                    ? null
                    : videos.map((video, key) => (
                          <div className="video-card" key={key}>
                              <div className="video-img">
                                  <img
                                      className="video-image"
                                      src={video.posterurl}
                                      alt={video.originalTitle}
                                  />
                              </div>
                              <div className="padd">
                                  <h1>{video.originalTitle}</h1>
                                  <p>
                                      {video.genres?.map((genre, index) => (
                                          <span key={index}> {genre} .</span>
                                      ))}
                                  </p>
                                  <p>IMDB : {video.imdbRating}</p>
                                  <Link to={`/player/${video._id}`}>
                                      <button className="btn video-btn">
                                          Watch
                                      </button>
                                  </Link>
                              </div>
                          </div>
                      ))}
            </div>
        </section>
    );
}

export default Videos;
