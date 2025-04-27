import { Pause, Play, SkipBack, SkipForward, Volume2 } from 'lucide-react'
import { useRef, useState } from 'react'
import { Slider } from './components/ui/slider'
import { Card, CardContent } from './components/ui/card'
import { Button } from './components/ui/button'

const songs = [
  {
    id: 1,
    title: 'シャイニングスター',
    artist: '詩歩',
    coverUrl: '/shining_star.jpg',
    musicUrl: '/shining_star.mp3',
  },
  {
    id: 2,
    title: 'Burning Heart',
    artist: 'KEI',
    coverUrl: '/burning_heart.jpg',
    musicUrl: '/burning_heart.mp3',
  },
  {
    id: 3,
    title: '12345',
    artist: 'Mary',
    coverUrl: '/12345.jpg',
    musicUrl: '/12345.mp3',
  },
  {
    id: 4,
    title: 'ハルジオン',
    artist: 'KEI',
    coverUrl: '/halzion.jpg',
    musicUrl: '/halzion.mp3',
  },
  {
    id: 5,
    title: 'Bipolar Disorder Outside var.',
    artist: '森田交一',
    coverUrl: '/outside.jpg',
    musicUrl: '/outside.mp3',
  },
]

function App() {
  const [currentSong, setCurrentSong] = useState(songs[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(50)
  const audioRef = useRef<HTMLAudioElement>(null)

  const handleNext = () => {
    setCurrentSong((prevSong) => {
      const currentIndex = songs.findIndex((song) => song.id === prevSong.id)
      const nextIndex = (currentIndex + 1) % songs.length // 最後まで行ったら最初に戻る
      return songs[nextIndex]
    })
    setIsPlaying(false)
  }
  const handlePrevious = () => {
    setCurrentSong((prevSong) => {
      const currentIndex = songs.findIndex((song) => song.id === prevSong.id)
      const prevIndex = (currentIndex - 1 + songs.length) % songs.length // 最初なら最後に戻る
      return songs[prevIndex]
    })
    setIsPlaying(false)
  }
  const togglePlayPause = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }
  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0])
    if (audioRef.current) {
      audioRef.current.volume = value[0] / 100
    }
  }

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-gray-900">
        <Card className="w-full max-w-md bg-gradient-to-br from-gray-900 to-gray-900 text-white shadow-xl">
          <CardContent className="p-6">
            <div className="relative aspect-square mb-6 overflow-hidden rounded-lg shadow-2xl">
              <img
                src={currentSong.coverUrl}
                alt="cover"
                className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-110"
              />
            </div>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-1">{currentSong.title}</h2>
              <p className="text-gray-400">{currentSong.artist}</p>
            </div>
            <div className="flex justify-between items-center mb-6">
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrevious}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <SkipBack className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={togglePlayPause}
                className="text-white hover:text-gray-300 transition-colors"
              >
                {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-6 w-6" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNext}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <SkipForward className="h-6 w-6" />
              </Button>
            </div>
            <div className="mt-6 flex items-center">
              <Volume2 className="h-4 w-4 text-gray-400 mr-2" />
              <Slider value={[volume]} max={100} step={1} className="w-full" onValueChange={handleVolumeChange} />
            </div>
            <audio ref={audioRef} src={currentSong.musicUrl} onEnded={handleNext} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default App
