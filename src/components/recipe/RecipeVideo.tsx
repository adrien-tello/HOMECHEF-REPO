import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  Settings
} from 'lucide-react';
import { Recipe } from '../../types';
import { useTheme } from '../../context/ThemeContext';
interface RecipeVideoProps {
  recipe: Recipe;
}

interface VideoState {
  playing: boolean;
  played: number;
  loaded: number;
  duration: number;
  volume: number;
  muted: boolean;
  playbackRate: number;
  fullscreen: boolean;
  showControls: boolean;
  buffering: boolean;
  ready: boolean;
}

const RecipeVideo: React.FC<RecipeVideoProps> = ({ recipe }) => {
  const { theme } = useTheme();

  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const [videoState, setVideoState] = useState<VideoState>({
    playing: false,
    played: 0,
    loaded: 0,
    duration: 0,
    volume: 0.8,
    muted: false,
    playbackRate: 1.0,
    fullscreen: false,
    showControls: true,
    buffering: false,
    ready: false
  });

  const [showSettings, setShowSettings] = useState(false);

  const handlePlayPause = useCallback(() => {
    setVideoState(prev => ({ ...prev, playing: !prev.playing }));
  }, []);

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = parseFloat(e.target.value);
    setVideoState(prev => ({ 
      ...prev, 
      volume, 
      muted: volume === 0 
    }));
  }, []);

  const handleMute = useCallback(() => {
    setVideoState(prev => ({ ...prev, muted: !prev.muted }));
  }, []);

  const handleSkip = useCallback((seconds: number) => {
    if (playerRef.current && videoState.duration > 0) {
      const currentTime = videoState.played * videoState.duration;
      const newTime = Math.max(0, Math.min(videoState.duration, currentTime + seconds));
      const seekTo = newTime / videoState.duration;
      
      setVideoState(prev => ({ ...prev, played: seekTo }));
      playerRef.current.seekTo(seekTo);
    }
  }, [videoState.played, videoState.duration]);

  const handleFullscreen = useCallback(() => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen().then(() => {
        setVideoState(prev => ({ ...prev, fullscreen: true }));
      }).catch(console.error);
    } else if (document.fullscreenElement) {
      document.exitFullscreen().then(() => {
        setVideoState(prev => ({ ...prev, fullscreen: false }));
      }).catch(console.error);
    }
  }, []);

  const handleMouseMove = useCallback(() => {
    setVideoState(prev => ({ ...prev, showControls: true }));
    
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    
    if (videoState.playing) {
      controlsTimeoutRef.current = setTimeout(() => {
        setVideoState(prev => ({ ...prev, showControls: false }));
      }, 3000);
    }
  }, [videoState.playing]);

  const handleProgress = useCallback((state: { played: number; loaded: number }) => {
    setVideoState(prev => ({ ...prev, played: state.played, loaded: state.loaded }));
  }, []);

  const handleDuration = useCallback((duration: number) => {
    setVideoState(prev => ({ ...prev, duration }));
  }, []);

  const handleReady = useCallback(() => {
    setVideoState(prev => ({ ...prev, ready: true, buffering: false }));
  }, []);

  const handleBuffer = useCallback(() => {
    setVideoState(prev => ({ ...prev, buffering: true }));
  }, []);

  const handleBufferEnd = useCallback(() => {
    setVideoState(prev => ({ ...prev, buffering: false }));
  }, []);

  const handleEnded = useCallback(() => {
    setVideoState(prev => ({ ...prev, playing: false, played: 0 }));
  }, []);

  const handleError = useCallback((error: any) => {
    console.error('Video player error:', error);
    setVideoState(prev => ({ ...prev, buffering: false }));
  }, []);

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setVideoState(prev => ({ 
        ...prev, 
        fullscreen: !!document.fullscreenElement 
      }));
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (videoState.fullscreen) {
        switch (e.code) {
          case 'Space':
            e.preventDefault();
            handlePlayPause();
            break;
          case 'ArrowLeft':
            e.preventDefault();
            handleSkip(-10);
            break;
          case 'ArrowRight':
            e.preventDefault();
            handleSkip(10);
            break;
          case 'ArrowUp':
            e.preventDefault();
            setVideoState(prev => ({ 
              ...prev, 
              volume: Math.min(1, prev.volume + 0.1) 
            }));
            break;
          case 'ArrowDown':
            e.preventDefault();
            setVideoState(prev => ({ 
              ...prev, 
              volume: Math.max(0, prev.volume - 0.1) 
            }));
            break;
          case 'KeyM':
            e.preventDefault();
            handleMute();
            break;
          case 'KeyF':
            e.preventDefault();
            handleFullscreen();
            break;
          case 'Escape':
            if (document.fullscreenElement) {
              document.exitFullscreen();
            }
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [videoState.fullscreen, handlePlayPause, handleSkip, handleMute, handleFullscreen]);

  if (!recipe.videoUrl || !ReactPlayer.canPlay(recipe.videoUrl)) {
    return (
      <div>
        <div className={`aspect-w-16 aspect-h-9 mb-6 rounded-lg flex items-center justify-center ${
          theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
        }`}>
          <div className="text-center p-4">
            <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center mx-auto mb-4">
              <Play className="h-8 w-8 text-white ml-1" />
            </div>
            <p className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              Video demonstration for {recipe.name}
            </p>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              (Video would play here in the actual application)
            </p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-bold text-xl mb-4">Key Steps</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-orange-50'}`}>
                  <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold mb-3">
                    {step}
                  </div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    {recipe.instructions[step - 1] || `Step ${step} instructions would be displayed here.`}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-xl mb-4">Chef's Tips</h3>
            <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-orange-50'}`}>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                • Make sure to use fresh ingredients for the best flavor.<br />
                • You can adjust the spiciness according to your preference.<br />
                • This dish pairs well with a side of rice or plantains.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div 
        ref={containerRef}
        className={`relative rounded-lg overflow-hidden ${
          videoState.fullscreen ? 'fixed inset-0 z-50 rounded-none' : ''
        } ${theme === 'dark' ? 'bg-gray-900' : 'bg-black'}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          if (!videoState.fullscreen) {
            setVideoState(prev => ({ ...prev, showControls: false }));
          }
        }}
      >
        <div className={`relative ${videoState.fullscreen ? 'h-full' : 'aspect-video'}`}>

















          {React.createElement(ReactPlayer, {
            ref: playerRef,
            url: recipe.videoUrl,
            width: "100%",
            height: "100%",
            playing: videoState.playing,
            volume: videoState.volume,
            muted: videoState.muted,
            playbackRate: videoState.playbackRate,
            onProgress: handleProgress,
            onDuration: handleDuration,
            onReady: handleReady,
            onBuffer: handleBuffer,
            onBufferEnd: handleBufferEnd,
            onEnded: handleEnded,
            onError: handleError,
            config: {
              youtube: {
                playerVars: {
                  showinfo: 0,
                  controls: 0,
                  modestbranding: 1,
                  rel: 0,
                  iv_load_policy: 3
                }
              },
              vimeo: {
                playerOptions: {
                  controls: false
                }
              }


            }
          })}

          {(videoState.buffering || !videoState.ready) && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
          )}

          {!videoState.playing && videoState.ready && !videoState.buffering && (
            <div 
              className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer group"
              onClick={handlePlayPause}
            >
              <div className="w-20 h-20 rounded-full bg-orange-500/90 flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                <Play className="h-10 w-10 text-white ml-1" />
              </div>
            </div>
          )}

          <div 
            className={`absolute bottom-0 left-0 right-0 p-2 bg-black/50 flex items-center justify-between ${
              videoState.showControls ? 'opacity-100' : 'opacity-0'
            } transition-opacity duration-300`}
          >
            <div className="flex items-center">
              <button className="p-2" onClick={handlePlayPause}>
                {videoState.playing ? <Pause className="h-6 w-6 text-white" /> : <Play className="h-6 w-6 text-white" />}
              </button>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value={videoState.volume} 
                onChange={handleVolumeChange} 
                className="w-24"
              />
              <button className="p-2" onClick={handleMute}>
                {videoState.muted ? <VolumeX className="h-6 w-6 text-white" /> : <Volume2 className="h-6 w-6 text-white" />}
              </button>
              <button className="p-2" onClick={() => setShowSettings(!showSettings)}>
                <Settings className="h-6 w-6 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );


};

export default RecipeVideo;