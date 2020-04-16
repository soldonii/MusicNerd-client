import React from 'react';
import { mount } from 'enzyme';
import TrackCard from '../TrackCard';

describe('<TrackCard /> component', () => {
  // const options = {
  //   mockTrack: {
  //     _id: '5e93253811efad2323e18b93',
  //     title: ['beautiful', '뷰티풀'],
  //     spotify_track_id: '6mzF8HvHdVrzJNd8M1uFCS',
  //     album_type: 'single',
  //     thumbnail: {
  //       height: 640,
  //       url: 'https://i.scdn.co/image/ab67616d0000b2733321fdb436c8c61308207658',
  //       width: 640
  //     },
  //     release_date: '2016-12-17',
  //     artist: '5e93253811efad2323e18b92',
  //     audio_url: 'https://musicnerd.s3.ap-northeast-2.amazonaws.com/tracks/1-01+Beautiful.mp3'
  //   },
  //   isTrackEnded: true
  // };

  it('should be rendered when isTrackEnded state is true', () => {
    const wrapper = mount(<TrackCard />);
    console.log(wrapper.debug());
    // wrapper.find()
  });
});
