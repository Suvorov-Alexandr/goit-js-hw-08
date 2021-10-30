import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const LOCAL_STORAGE_KEY = 'videoplayer-current-time';

function onPlay() {
  player
    .getCurrentTime()
    .then(second => localStorage.setItem(LOCAL_STORAGE_KEY, second))
    .catch(error => console.log(error));
}
player.on(
  'timeupdate',
  throttle(onPlay, 1000),
  player.setCurrentTime(localStorage.getItem(LOCAL_STORAGE_KEY)).catch(error => console.log(error)),
);

// player.on(
//   'timeupdate',
//   throttle(
//     () =>
//       player
//         .getCurrentTime()
//         .then(second => localStorage.setItem(LOCAL_STORAGE_KEY, second))
//         .catch(error => console.log(error)),
//     1000,
//   ),
//   player.setCurrentTime(localStorage.getItem(LOCAL_STORAGE_KEY)).catch(error => console.log(error)),
// );
