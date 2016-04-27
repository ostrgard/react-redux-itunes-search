const ADD_SONG = 'player/ADD_SONG';
const PLAY_SONG = 'player/PLAY_SONG';
const NEXT_SONG = 'player/NEXT_SONG';

function getNext(playing, queue) {
  for (let i = 0; i < queue.length; i++) {
    if (queue[i - 1] && queue[i - 1].id === playing.id) {
      return queue[i];
    }
  }

  return queue[0];
}

let ids = 0;
const initialState = {
  queue: [],
  playing: {}
};

export default function player(state = initialState, action) {
  switch(action.type) {
    case ADD_SONG:
      return {
        ...state,
        queue: [].concat(state.queue, [{
          id: ids++,
          song: action.song
        }])
      };
    case PLAY_SONG:
      return {
        ...state,
        playing: state.queue.find((song) => song.id === action.id)
      };
    case NEXT_SONG:
      return {
        ...state,
        playing: getNext(state.playing, state.queue)
      };
    default:
      return state;
  }
}

export function addSong(song){
  return {
    type: ADD_SONG,
    song: song
  };
}

export function playSong(id){
  return {
    type: PLAY_SONG,
    id: id
  };
}

export function nextSong(){
  return {
    type: NEXT_SONG
  };
}
