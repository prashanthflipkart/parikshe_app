export type StudyVideo = {
  id: string;
  subjectId?: string;
  subjectName: string;
  title: string;
  youtubeUrl: string;
  thumbnailUrl: string;
  playlistUrl?: string;
};

export const studyVideos: StudyVideo[] = [
  {
    id: "embedded-demo",
    subjectName: "Demo",
    title: "Embedded Demo Video",
    youtubeUrl: "https://www.youtube.com/watch?v=pL87j6NNwNM",
    thumbnailUrl: "https://img.youtube.com/vi/pL87j6NNwNM/hqdefault.jpg",
    playlistUrl: "https://www.youtube.com/embed/pL87j6NNwNM"
  },
  {
    id: "bbb",
    subjectName: "Animation",
    title: "Big Buck Bunny (Blender Foundation)",
    youtubeUrl: "https://www.youtube.com/watch?v=YE7VzlLtp-4",
    thumbnailUrl: "https://img.youtube.com/vi/YE7VzlLtp-4/hqdefault.jpg",
    playlistUrl: "https://www.youtube.com/watch?v=YE7VzlLtp-4"
  },
  {
    id: "sintel",
    subjectName: "Animation",
    title: "Sintel - Open Movie by Blender Foundation",
    youtubeUrl: "https://www.youtube.com/watch?v=eRsGyueVLvQ",
    thumbnailUrl: "https://img.youtube.com/vi/eRsGyueVLvQ/hqdefault.jpg",
    playlistUrl: "https://www.youtube.com/watch?v=eRsGyueVLvQ"
  },
  {
    id: "tears-of-steel",
    subjectName: "Animation",
    title: "Tears of Steel (Blender Foundation)",
    youtubeUrl: "https://www.youtube.com/watch?v=OHOpb2fS-cM",
    thumbnailUrl: "https://img.youtube.com/vi/OHOpb2fS-cM/hqdefault.jpg",
    playlistUrl: "https://www.youtube.com/watch?v=OHOpb2fS-cM"
  },
  {
    id: "sintel-trailer",
    subjectName: "Animation",
    title: "Sintel Trailer (Embeddable)",
    youtubeUrl: "https://www.youtube.com/watch?v=ac7KhViaVqc",
    thumbnailUrl: "https://img.youtube.com/vi/ac7KhViaVqc/hqdefault.jpg",
    playlistUrl: "https://www.youtube.com/watch?v=ac7KhViaVqc"
  }
];
