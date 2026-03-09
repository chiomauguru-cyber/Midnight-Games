import { useState, useEffect } from 'react';
import { Gamepad2, Search, ArrowLeft, Maximize2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gamesData from './data/games.json';

export default function App() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredGames, setFilteredGames] = useState(gamesData);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const filtered = gamesData.filter(game =>
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredGames(filtered);
  }, [searchQuery]);

  const handleGameClick = (game) => {
    setSelectedGame(game);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeGame = () => {
    setSelectedGame(null);
    setIsFullscreen(false);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-emerald-500/30">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-neutral-950/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={closeGame}
          >
            <div className="p-2 bg-emerald-500 rounded-lg group-hover:rotate-12 transition-transform">
              <Gamepad2 className="w-6 h-6 text-black" />
            </div>
            <h1 className="text-xl font-bold tracking-tight hidden sm:block">
              UNBLOCKED<span className="text-emerald-500">GAMES</span>
            </h1>
          </div>

          <div className="flex-1 max-w-md mx-4">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 group-focus-within:text-emerald-500 transition-colors" />
              <input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-900 border border-white/5 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-neutral-500 hidden md:block uppercase tracking-widest">
              v1.0.0
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {selectedGame ? (
            <motion.div
              key="player"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <button
                  onClick={closeGame}
                  className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors group"
                >
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  <span>Back to Games</span>
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="p-2 hover:bg-neutral-900 rounded-lg transition-colors text-neutral-400 hover:text-white"
                    title="Toggle Fullscreen"
                  >
                    <Maximize2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={closeGame}
                    className="p-2 hover:bg-neutral-900 rounded-lg transition-colors text-neutral-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className={`relative bg-neutral-900 rounded-2xl overflow-hidden border border-white/5 shadow-2xl transition-all duration-500 ${isFullscreen ? 'fixed inset-0 z-50 rounded-none border-none' : 'aspect-video w-full'}`}>
                {isFullscreen && (
                  <button
                    onClick={() => setIsFullscreen(false)}
                    className="absolute top-4 right-4 z-[60] p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-black/80 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                )}
                <iframe
                  src={selectedGame.iframeUrl}
                  className="w-full h-full border-none"
                  allow="fullscreen; autoplay; encrypted-media"
                  title={selectedGame.title}
                />
              </div>

              <div className="mt-4">
                <h2 className="text-3xl font-bold">{selectedGame.title}</h2>
                <p className="text-neutral-400 mt-2 max-w-2xl">{selectedGame.description}</p>
              </div>

              <div className="mt-12">
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <div className="w-1 h-6 bg-emerald-500 rounded-full" />
                  More Games
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {gamesData.filter(g => g.id !== selectedGame.id).slice(0, 6).map((game) => (
                    <GameCard key={game.id} game={game} onClick={() => handleGameClick(game)} />
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-12"
            >
              {/* Hero Section */}
              <section className="relative h-64 md:h-80 rounded-3xl overflow-hidden border border-white/5 flex items-center px-8 md:px-16">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-transparent z-0" />
                <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/gaming/1920/1080')] bg-cover bg-center opacity-20 z-[-1]" />
                <div className="relative z-10 max-w-xl">
                  <span className="inline-block px-3 py-1 bg-emerald-500/10 text-emerald-500 text-xs font-bold rounded-full mb-4 tracking-widest uppercase">
                    Featured Game
                  </span>
                  <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
                    PLAY THE BEST <br />
                    <span className="text-emerald-500">UNBLOCKED</span> GAMES
                  </h2>
                  <p className="text-neutral-400 text-sm md:text-base mb-6">
                    Fast, free, and always accessible. No downloads required.
                  </p>
                </div>
              </section>

              {/* Games Grid */}
              <section>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold flex items-center gap-3">
                    <div className="w-1.5 h-8 bg-emerald-500 rounded-full" />
                    All Games
                  </h3>
                  <div className="text-sm text-neutral-500">
                    Showing {filteredGames.length} games
                  </div>
                </div>

                {filteredGames.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                    {filteredGames.map((game) => (
                      <GameCard key={game.id} game={game} onClick={() => handleGameClick(game)} />
                    ))}
                  </div>
                ) : (
                  <div className="py-20 text-center">
                    <div className="inline-block p-4 bg-neutral-900 rounded-full mb-4">
                      <Search className="w-8 h-8 text-neutral-700" />
                    </div>
                    <h4 className="text-xl font-medium text-neutral-400">No games found</h4>
                    <p className="text-neutral-600 mt-2">Try searching for something else</p>
                  </div>
                )}
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="border-t border-white/5 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 opacity-50 grayscale hover:grayscale-0 transition-all">
            <Gamepad2 className="w-5 h-5" />
            <span className="font-bold text-sm tracking-tight">UNBLOCKED GAMES</span>
          </div>
          <div className="flex gap-8 text-sm text-neutral-500">
            <a href="#" className="hover:text-emerald-500 transition-colors">About</a>
            <a href="#" className="hover:text-emerald-500 transition-colors">Privacy</a>
            <a href="#" className="hover:text-emerald-500 transition-colors">Terms</a>
            <a href="#" className="hover:text-emerald-500 transition-colors">Contact</a>
          </div>
          <p className="text-xs text-neutral-600 font-mono">
            &copy; {new Date().getFullYear()} UNBLOCKED GAMES HUB
          </p>
        </div>
      </footer>
    </div>
  );
}

function GameCard({ game, onClick }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-900 border border-white/5 mb-3">
        <img
          src={game.thumbnail}
          alt={game.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
          <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Play Now</span>
        </div>
      </div>
      <h4 className="font-bold text-neutral-200 group-hover:text-emerald-500 transition-colors truncate">
        {game.title}
      </h4>
      <p className="text-xs text-neutral-500 line-clamp-1 mt-1">
        {game.description}
      </p>
    </motion.div>
  );
}
