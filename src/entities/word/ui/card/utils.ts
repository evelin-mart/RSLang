export const play = async (arr: string[]) => {
  for (let i = 0; i < arr.length; i++) {
    const audio = new Audio(arr[i]);
    try {
      await playSong(audio);
    } catch {
      console.log('unexpected error in play', arr[i]);
    }
  }
};

const playSong = async (audio: HTMLAudioElement) => {
  audio.play();

  return new Promise<void>((resolve, reject) => {
    audio.addEventListener('ended', () => resolve());
    audio.addEventListener('error', () => reject());
  });
};

// export const play = (arr: string[]) => {
//   const audioElements: Array<HTMLAudioElement> = [];

//   for (let i = 0; i < arr.length; i++) {
//     const audio = new Audio(arr[i]);
//     audioElements.push(audio);

//     if (i === 0) {
//       audioElements[i].play();
//     } else {
//       audioElements[i - 1].addEventListener('ended', () => {
//         audioElements[i].play();
//       });
//     }
//   }
// }
