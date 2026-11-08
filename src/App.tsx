import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown, ArrowLeft, ArrowRight, Heart, Volume2, VolumeX, Sparkles, Play, Pause, Gift, MailOpen, Star } from 'lucide-react';

const photos = [
  { src: '/memories/IMG_20250914_214111_138.jpg', date: '14 September 2025', caption: 'The portrait that feels like a promise', tag: 'Dressed up, looking only at each other', story: 'Your red saree, my white kurta, and that quiet look we share. This feels like one of those frames that will always remind me how lucky I am to stand beside you.' },
  { src: '/memories/IMG_20251205_215719_165.jpg', date: '5 December 2025', caption: 'Our story, drawn by hand', tag: 'A little artwork with a lot of us', story: 'Someone turned us into a hand-drawn keepsake, complete with little hearts and our own playful details. It is such a sweet reminder that even a sketch can hold a whole lot of love.' },
  { src: '/memories/IMG-20251110-WA0001.jpg', date: '10 November 2025', caption: 'A playful hello', tag: 'One silly filter, two familiar smiles', story: 'The funny little filter, your bright smile, and me leaning in close make this feel like us at our most wonderfully silly. I would keep a thousand ordinary selfies like this.' },
  { src: '/memories/IMG20251027180800.jpg', date: '27 October 2025', caption: 'A little adventure, side by side', tag: 'A selfie from somewhere along the way', story: 'A shared seat, the view passing by, and your face right beside mine. Wherever we are headed, the journey feels sweeter when I get to share it with you.' },
  { src: '/memories/IMG-20251110-WA0007.jpg', date: '10 November 2025', caption: 'A soft little moment', tag: 'A smile I can find even in a blurry frame', story: 'This selfie may be a little dreamy and out of focus, but the warmth in it comes through perfectly. Your smile is still the first thing I notice.' },
  { src: '/memories/IMG-20251110-WA0000.jpg', date: '10 November 2025', caption: 'Our silly side, caught on camera', tag: 'Playful filters and a favorite face', story: 'Matching dog ears, a cozy table, and the two of us making each other laugh. I love that we can turn even a simple selfie into a tiny celebration.' },
  { src: '/memories/IMG20251027180807.jpg', date: '27 October 2025', caption: 'A little closer, a little happier', tag: 'The kind of closeness that feels like home', story: 'A quiet car selfie with our cheeks together and nowhere else I would rather be. These are the small, unplanned moments I wish I could pause.' },
  { src: '/memories/IMG20250516145610.jpg', date: '16 May 2025', caption: 'A sweet sip and your smile', tag: 'A little treat, a lovely day together', story: 'One shared drink, a playful grin, and a moment that makes me smile back every time. I love our little everyday dates just as much as the big occasions.' },
  { src: '/memories/IMG20251027180644.jpg', date: '27 October 2025', caption: 'The happiest seat is beside you', tag: 'A cozy ride and a familiar shoulder', story: 'A close-up from a quiet ride, with you leaning in and the world carrying on outside. Being near you has a way of making anywhere feel like our place.' },
  { src: '/memories/photo_6089374503533220004_y.jpg', date: 'A favourite portrait', caption: 'Timeless in monochrome', tag: 'A look that says more than words', story: 'In black and white, every little detail falls away except the way we look at each other. This portrait feels like a love note without a single word.' },
];

const petals = Array.from({ length: 22 }, (_, i) => ({
  left: `${(i * 47 + 9) % 100}%`,
  delay: `${(i % 9) * -1.7}s`,
  duration: `${12 + (i % 7) * 2}s`,
  size: `${9 + (i % 4) * 5}px`,
}));

const loveReasons = [
  {
    title: 'Your calm',
    text: 'You make even noisy days feel softer and kinder. Your presence has a way of making my heart slow down and breathe.',
  },
  {
    title: 'Your laughter',
    text: 'One laugh from you can change my whole mood. It is the kind of sound that makes a moment feel complete.',
  },
  {
    title: 'Your dreams',
    text: 'The way you care, hope, and imagine a beautiful future makes me fall in love with the life we are building together.',
  },
  {
    title: 'Your love',
    text: 'You are the warmth in my everyday life, the comfort in my hard days, and the best part of my happiest ones.',
  },
];

const promises = [
  { title: 'I will keep choosing you', text: 'Every ordinary day, every stubborn moment, every new chapter — I want to keep choosing us.' },
  { title: 'I will make room for joy', text: 'Even in busy life, I want to protect the little laughter, soft hugs, and sweet memories that make us us.' },
  { title: 'I will keep dreaming with you', text: 'Our future can be soft, honest, beautiful, and full of things we build together, one day at a time.' },
  { title: 'I will always celebrate you', text: 'Your wins, your growth, your peace, your happiness — all of it will always be worth celebrating.' },
];

const futurePlans = [
  { title: '🍽️ 1. Namma monthly once restaurant polam', text: 'Monthly oru dhadava namma rendu perum velila restaurant poi sapidalam. Adhu expensive-a irukkanum-nu avasiyam illa. Simple-a oru dinner, lunch illa street food-a irundhalum podhum. Andha konjam neram namma rendu perum work, stress, problems ellathayum marandhutu pesi sirichu enjoy pannalam. ❤️' },
  { title: '🚗 2. Six months-ku once namma local trip polam', text: 'Aaru maadhathukku oru murai pakkathula irukkura places-ku chinna trip polam. Beach, hill station, temple, resort, park edhu venalum polam. Ippadi travel pannumbodhu namakku pudhu memories create aagum, namma bonding innum strong aagum. 💕✨' },
  { title: '✈️ 3. One year once illa three years once namma foreign trip polam', text: 'Namma situation-ku yetha madhiri savings panni, one year once illa moonu varushathukku once foreign trip plan pannalam. Pudhu naadu, pudhu culture, pudhu places explore pannalam. Adhu namma life-la marakka mudiyadha memories-a irukum. 🌍❤️' },
  { title: '🎬 4. Weekly twice namma cinema pakkalam namma veetula', text: 'Weekly rendu naal namma veetula movie night vechukalam. Popcorn, snacks eduthutu sofa-la ukkandhu movie paathu enjoy pannalam. Theatre-ku pogama irundhalum, andha quality time namakku romba special-a irukum. 🍿🥰' },
  { title: '📸 5. Chinna chinna memories create pannalam', text: 'Periya periya vishayangal dhaan santhosham kudukkum-nu illa. Chinna surprises, selfies, late night talks, long walks, birthday celebrations, random gifts, cooking together maari chinna chinna moments dhaan life-la periya memories-a maarum. Andha ovvoru moment-um serndhu namma beautiful life-a create pannalam. ❤️✨🤗' },
];

const dreamCards = [
  { title: 'Slow sunset dinners', text: 'Long talks, warm food, quiet laughter, and a little bit of time that belongs only to us.' },
  { title: 'A home full of love', text: 'A place where we carry peace, comfort, and the kind of happiness that feels easy to live in.' },
  { title: 'A thousand little traditions', text: 'Holiday rituals, favorite meals, silly jokes, and memories we keep collecting without even trying.' },
  { title: 'A life that feels like us', text: 'Not perfect, just real, steady, and kind — a future shaped by love and tenderness.' },
];

export default function App() {
  const [started, setStarted] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [candleOut, setCandleOut] = useState(true);
  const [birthdaySongError, setBirthdaySongError] = useState(false);
  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const birthdaySongRef = useRef<HTMLAudioElement>(null);
  const candleOutRef = useRef(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!started) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('in-view');
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (activePhoto === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActivePhoto(null);
      if (event.key === 'ArrowLeft') setActivePhoto(index => index === null ? null : (index - 1 + photos.length) % photos.length);
      if (event.key === 'ArrowRight') setActivePhoto(index => index === null ? null : (index + 1) % photos.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhoto]);

  const startMusic = async () => {
    if (!audioRef.current) return;
    try { await audioRef.current.play(); setMusicOn(true); }
    catch { setMusicOn(false); }
  };

  const toggleMusic = async () => {
    if (!audioRef.current) return;
    if (musicOn) { audioRef.current.pause(); setMusicOn(false); }
    else await startMusic();
  };

  const playBirthdaySong = async () => {
    if (candleOutRef.current) return;
    audioRef.current?.pause();
    setMusicOn(false);
    setBirthdaySongError(false);
    const song = birthdaySongRef.current;
    if (!song) {
      setBirthdaySongError(true);
      return;
    }

    song.currentTime = 0;
    try {
      await song.play();
      if (candleOutRef.current) {
        song.pause();
        song.currentTime = 0;
      }
    } catch {
      if (!candleOutRef.current) setBirthdaySongError(true);
    }
  };

  useEffect(() => {
    void startMusic();
  }, []);

  const begin = () => {
    void startMusic();
    setStarted(true);
    window.setTimeout(() => document.getElementById('birthday')?.scrollIntoView({ behavior: 'smooth' }), 120);
  };

  const nextPhoto = (direction: number) => {
    if (activePhoto === null) return;
    setActivePhoto((activePhoto + direction + photos.length) % photos.length);
  };

  return (
    <main>
      <audio ref={audioRef} loop preload="none" src="/memories/Yedhayya%20Saami.mp3" />
      <audio
        ref={birthdaySongRef}
        preload="none"
        src="/memories/POOJA%20Birthday%20Song%20%E2%80%93%20Happy%20Birthday%20Pooja%20-%20Happy%20Birthday%20Song%20with%20Names.mp3"
        onPlay={event => {
          if (candleOutRef.current) {
            event.currentTarget.pause();
            event.currentTarget.currentTime = 0;
          }
        }}
      />
      <div className="grain" />
      <div className="petal-field" aria-hidden="true">
        {petals.map((p, i) => <span key={i} className="petal" style={{ left: p.left, animationDelay: p.delay, animationDuration: p.duration, width: p.size, height: p.size }} />)}
      </div>
      <button className={`music-button ${musicOn ? 'is-playing' : ''}`} onClick={toggleMusic} aria-label={musicOn ? 'Pause music' : 'Play music'}>
        {musicOn ? <Volume2 size={17} /> : <VolumeX size={17} />} <span>{musicOn ? 'Music on' : 'Music off'}</span>
      </button>

      <AnimatePresence>
        {!started && <motion.section className="opening" initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.04 }} transition={{ duration: 1 }}>
          <div className="opening-glow" />
          <motion.div className="opening-content" initial={{ y: 25, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: .25 }}>
            <span className="eyebrow"><Sparkles size={13} /> A LITTLE SURPRISE FOR YOU <Sparkles size={13} /></span>
            <div className="tiny-heart"><Heart fill="currentColor" size={23} /></div>
            <h1>For you,<br /><em>my love.</em></h1>
            <p>Some feelings are too beautiful for an ordinary message.<br />So I made you a little world of our memories.</p>
            <button className="primary-button" onClick={begin}>Open your surprise <Heart size={16} fill="currentColor" /></button>
            <span className="opening-foot">MADE WITH LOVE, JUST FOR PUJA</span>
          </motion.div>
          <div className="corner-note">A story written in little moments <span>♡</span></div>
        </motion.section>}
      </AnimatePresence>

      {started && <>
        <section className="hero" id="birthday">
          <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
          <motion.div className="hero-content" initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <div className="eyebrow"><span className="line" /> TODAY IS ALL ABOUT YOU <span className="line" /></div>
            <p className="script hero-script">Happy Birthday</p>
            <h1>Puja<span className="gold-dot">.</span></h1>
            <p className="hero-sub">To my favourite person, my sweetest blessing,<br />and the smile I never want to lose.</p>
            <div className="hero-heart"><Heart fill="currentColor" size={17} /></div>
            <a href="#memories" className="scroll-cue">SCROLL INTO OUR STORY <ArrowDown size={14} /></a>
          </motion.div>
          <div className="hero-side-text">CHAPTER 01 — A DAY FOR YOU</div>
        </section>

        <section className="intro section-pad">
          <div className="section-kicker reveal">A NOTE BEFORE THE MEMORIES</div>
          <h2 className="reveal">If I could give you one thing,<br /><em>it would be the ability to see yourself</em><br />through my eyes.</h2>
          <p className="intro-copy reveal">Then you would know how special you are, how much light you bring into ordinary days, and why your happiness means so much to me.</p>
          <div className="ornament reveal"><span /> <Heart size={13} fill="currentColor" /> <span /></div>
        </section>

        <section className="memories section-pad" id="memories">
          <div className="section-heading reveal">
            <div><div className="section-kicker">CHAPTER 02 · OUR LITTLE WORLD</div><h2>Collected <em>moments.</em></h2></div>
            <p>Not just photographs.<br />Little pieces of happiness<br />that I get to call ours.</p>
          </div>
          <div className="photo-grid">
            {photos.map((photo, i) => <motion.button key={photo.src} className={`photo-card photo-${i + 1} reveal`} onClick={() => setActivePhoto(i)} whileHover={{ y: -7, rotate: i % 2 ? 1 : -1 }} transition={{ duration: .25 }}>
              <div className="photo-frame"><img src={photo.src} alt={`${photo.caption}. ${photo.story}`} loading="lazy" /><span className="photo-index">{String(i + 1).padStart(2, '0')}</span></div>
              <span className="photo-date">{photo.date}</span><span className="photo-caption">{photo.caption}</span><span className="photo-tag">{photo.tag}</span><span className="photo-story">{photo.story}</span>
            </motion.button>)}
          </div>
          <div className="story-collage reveal">
            <div className="story-collage-copy">
              <div className="section-kicker">A KEEPSAKE MADE FROM OUR PHOTOS</div>
              <h3>Our little world,<br /><em>all in one frame.</em></h3>
              <p>A little collage of some of my favourite moments with you. Save it as a keepsake, or tap the picture to see it full size.</p>
              <a className="keepsake-link" href="/memories/our-story-collage.jpg" download="Puja-our-little-world.jpg">Save our photo <ArrowRight size={15} /></a>
            </div>
            <a className="story-collage-image" href="/memories/our-story-collage.jpg" target="_blank" rel="noreferrer" aria-label="Open our photo collage full size">
              <img src="/memories/our-story-collage.jpg" alt="A designed keepsake collage of our couple portrait, playful selfie, sweet drink date, and black-and-white portrait." loading="lazy" />
            </a>
          </div>
        </section>

        <section className="love-journey section-pad">
          <div className="section-kicker reveal">CHAPTER 03 · WHY I LOVE YOU</div>
          <h2 className="reveal">You are the kind of person<br /><em>who turns ordinary days into beautiful ones.</em></h2>
          <div className="love-grid">
            {loveReasons.map((reason, index) => (
              <motion.article
                key={reason.title}
                className="reason-card reveal"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <div className="reason-icon"><Heart fill="currentColor" size={16} /></div>
                <span className="reason-number">0{index + 1}</span>
                <h3>{reason.title}</h3>
                <p>{reason.text}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="promise-section section-pad">
          <div className="promise-header reveal">
            <div className="section-kicker">CHAPTER 04 · MY PROMISES</div>
            <h2>Some things I want to keep<br /><em>forever.</em></h2>
          </div>
          <div className="promise-grid">
            {promises.map((promise, index) => (
              <motion.div
                key={promise.title}
                className="promise-card reveal"
                initial={{ opacity: 0, x: index % 2 === 0 ? -18 : 18, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: index * 0.1 }}
              >
                <span className="promise-tag">Promise {index + 1}</span>
                <h3>{promise.title}</h3>
                <p>{promise.text}</p>
              </motion.div>
            ))}
          </div>
          <div className="future-plans">
            <div className="future-plans-heading">
              <span className="promise-tag">A FEW LITTLE DREAMS</span>
              <h3>❤️ Namma future pathi naan yosicha sila chinna chinna aasai...</h3>
            </div>
            <div className="future-plans-grid">
              {futurePlans.map((plan, index) => (
                <motion.article
                  key={plan.title}
                  className="future-plan-card reveal"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.07 }}
                >
                  <h4>{plan.title}</h4>
                  <p>{plan.text}</p>
                </motion.article>
              ))}
            </div>
            <p className="future-plans-quote"><strong>"Naan perfect illa, aana un kooda irukkura ovvoru naalayum special-a maathanum-nu dhaan aasai. Namma rendu perum serndhu neraiya azhagana memories create pannitu sandhoshama vaazhanum. ❤️💍"</strong> 🥹💕</p>
          </div>
        </section>

        <section className="sorry-section section-pad">
          <div className="sorry-content reveal">
            <div className="section-kicker">CHAPTER 05 · FROM MY HEART</div>
            <h2>One thing I want<br /><em>you to know.</em></h2>
            <p><strong>🥺 Un kooda naan neraiya time spend pannadhu illa. Nee ninaikkura madhiri naan irundhadhu illa. Nee enna expect pannuriyo, adha naan pannadhu illa. 😔</strong></p>
            <p><strong>Aana, unakkaaga naan neraiya yosichu yosichu dhaan ellaathayum pannuren. ❤️ Namma future-la santhoshama irukkanum-nu dhaan eppovum yosippen. 🥰</strong></p>
            <p><strong>Namma marriage apram enna enna problems varumnu enakku theriyadhu. 🤷‍♂️ Aana, naan open-a solluren, enna problem vandhaalum parava illa. 💪 Naan unna mattum dhaan marriage pannuven. 💍❤️</strong></p>
            <p><strong>Adhanaala nee bayappadaadha. 🤗 Marriage apram konjam konjam-a naan ellathayum kathukuren. 😊❤️✨</strong></p>
          </div>
        </section>

        <section className="film-section story-film-section section-pad">
          <div className="film-copy reveal"><div className="section-kicker">CHAPTER 06 · OUR PHOTO FILM</div><h2>A little movie<br /><em>made of us.</em></h2><p>Your favourite photos, brought together in a short film with gentle transitions and our song. Every frame is from the memories you shared.</p><a className="keepsake-link" href="/memories/our-little-movie.mp4" download="Puja-our-little-movie.mp4">Save our little movie <ArrowRight size={15} /></a><span className="film-label"><span className="live-dot" /> MADE WITH OUR PHOTOS & MUSIC</span></div>
          <div className="video-shell story-video-shell reveal"><video className="story-video" controls playsInline preload="metadata" poster="/memories/our-story-collage.jpg" onPlay={() => { audioRef.current?.pause(); setMusicOn(false); }} aria-label="A short photo film made from our memories"><source src="/memories/our-little-movie.mp4" type="video/mp4" />Your browser does not support the video element.</video><div className="video-caption">Ten little chapters, one big love. <Heart size={13} fill="currentColor" /></div></div>
        </section>

        <section className="film-section section-pad">
          <div className="film-copy reveal"><div className="section-kicker">CHAPTER 07 · THE ORIGINAL CLIP</div><h2>One more memory<br /><em>to hold close.</em></h2><p>Some moments are even sweeter when they move. Here's the original little piece of our story, saved just for us.</p><span className="film-label"><span className="live-dot" /> A LITTLE MEMORY, ON REPEAT</span></div>
          <div className="video-shell reveal"><video ref={videoRef} controls playsInline preload="metadata" poster="/memories/IMG20251027180644.jpg" onPlay={() => { audioRef.current?.pause(); setMusicOn(false); }}><source src="/memories/our-memory.mp4" type="video/mp4" />Your browser does not support the video element.</video><div className="video-caption">A moment with you is always a moment well spent. <Heart size={13} fill="currentColor" /></div></div>
        </section>

        <section className="birthday-wish section-pad">
          <div className="wish-glow" />
          <div className="section-kicker reveal">CHAPTER 08 · MAKE A WISH</div>
          <h2 className="reveal">A wish for <em>you.</em></h2>
          <div className="cake-wrap reveal">
            <div className={`flame ${candleOut ? 'out' : ''}`} />
            <div className="candle" />
            <div className="cake-top" /><div className="cake-body"><span /><span /><span /></div><div className="cake-plate" />
          </div>
          <p className="wish-instruction reveal">{candleOut ? 'Your wish is on its way. May it find you.' : 'Close your eyes, make a wish, and tap the candle.'}</p>
          <button className="wish-button reveal" onClick={() => {
            if (candleOut) {
              candleOutRef.current = false;
              setCandleOut(false);
              void playBirthdaySong();
              return;
            }

            candleOutRef.current = true;
            birthdaySongRef.current?.pause();
            if (birthdaySongRef.current) birthdaySongRef.current.currentTime = 0;
            setCandleOut(true);
          }}>{candleOut ? 'Light the candle again' : 'Blow out the candle'} <Sparkles size={15} /></button>
          {birthdaySongError && <p className="wish-small" role="status">Sorry, the birthday song could not be played. Please try again.</p>}
          <p className="wish-small reveal">May every little dream in your heart find its way home.</p>
        </section>

        <section className="dream-section section-pad">
          <div className="dream-intro reveal">
            <div className="section-kicker">CHAPTER 09 · OUR FUTURE</div>
            <h2>The life I want<br /><em>with you.</em></h2>
            <p>Some dreams are not loud. They are quiet and steady, built from little moments and a lot of love.</p>
          </div>
          <div className="dream-grid">
            {dreamCards.map((dream, index) => (
              <motion.article
                key={dream.title}
                className="dream-card reveal"
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <span className="dream-index">0{index + 1}</span>
                <h3>{dream.title}</h3>
                <p>{dream.text}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="letter-section section-pad">
          <div className="letter-layout">
            <div className="letter-intro reveal"><div className="section-kicker">CHAPTER 10 · FROM MY HEART</div><h2>Words I hope<br /><em>you always remember.</em></h2><p>There are things I may not say every day, but I hope you never doubt them.</p><div className="letter-stamp"><MailOpen size={21} /></div></div>
            <div className="envelope-area reveal">
              <motion.div className={`envelope ${letterOpen ? 'opened' : ''}`} onClick={() => setLetterOpen(!letterOpen)} whileHover={{ y: -5 }}>
                <div className="envelope-back" /><div className="letter-paper">
                  <div className="letter-topline">A LETTER FOR MY LOVE <Heart size={12} fill="currentColor" /></div>
                  <h3>My dearest Puja,</h3>
                  <p>Happy Birthday, my love! Today, I wish you a life filled with the kind of happiness that stays, the kind of peace that comforts you, and the kind of love that makes every day feel special.</p>
                  <p>I hope all the beautiful things we dream about find their way into our lives. Until then, please keep smiling, keep dreaming, and never forget how precious you are to me.</p>
                  <p className="letter-sign">Always yours, <span>♡</span></p>
                </div>
                <div className="envelope-flap" /><div className="envelope-seal"><Heart size={20} fill="currentColor" /></div>
              </motion.div>
              <button className="letter-open-button" onClick={() => setLetterOpen(!letterOpen)}>{letterOpen ? 'Close the letter' : 'Open your letter'} <ArrowRight size={15} /></button>
              <span className="tap-hint">A LITTLE NOTE, SEALED WITH LOVE</span>
            </div>
          </div>
          <div className="personal-message reveal">
            <div className="personal-label"><Star size={13} fill="currentColor" /> MY BIRTHDAY WISH FOR YOU</div>
            <p>🎉🎂 Wish you many more happy returns of the day, <strong>Puja Papa!</strong> 💖🥳</p>
            <p>Nee un life-la eppovum santhoshama irukkanum. 😊 Naa eppovume unna happy-ah irukuradha dhaan paakanum. ❤️ Ippo eppadi happy-ah irukkiyo, adha vida innum romba romba happy-ah irukkanum. ✨🌈</p>
            <p>Namma eppadi ellam happy-ah vaazhanum-nu nenachirukkomo, adha madhiri ellam nadakkanum. 🌟💐 So, nee edhukkum kavala padadha. 🤗💕</p>
            <p>Un life full-a niraivaana santhosham, nalla health, success, and lots of beautiful memories kidaikka vaazhthukkal! 🎁🎊🎈</p>
            <p className="last-wish">Happy Birthday once again! 🎂🥰💖</p>
          </div>
        </section>

        <section className="finale section-pad">
          <div className="finale-stars"><Sparkles /><Sparkles /><Sparkles /></div>
          <p className="script reveal">And finally...</p>
          <h2 className="reveal">Here's to you,<br /><em>to us,</em><br />and to all the tomorrows.</h2>
          <p className="finale-copy reveal">No matter how many birthdays come and go, I hope life keeps giving you reasons to smile. I'll always be cheering for your happiness.</p>
          <div className="final-heart reveal"><Heart fill="currentColor" size={28} /></div>
          <p className="final-sign reveal">With all my love, <span>♡</span></p>
          <p className="footer-note">MADE FOR PUJA · WITH LOVE, ALWAYS</p>
        </section>
      </>}

      <AnimatePresence>
        {activePhoto !== null && <motion.div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo details" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActivePhoto(null)}>
          <button className="lightbox-close" aria-label="Close photo details" onClick={() => setActivePhoto(null)}>×</button>
          <button className="lightbox-arrow left" aria-label="Previous photo" onClick={e => { e.stopPropagation(); nextPhoto(-1); }}><ArrowLeft /></button>
          <motion.div className="lightbox-content" initial={{ scale: .9, y: 20 }} animate={{ scale: 1, y: 0 }} onClick={e => e.stopPropagation()}>
            <img src={photos[activePhoto].src} alt={photos[activePhoto].caption} />
            <span className="lightbox-date">{photos[activePhoto].date}</span><p>{photos[activePhoto].caption}</p><span>{photos[activePhoto].tag}</span><p className="lightbox-story">{photos[activePhoto].story}</p>
          </motion.div>
          <button className="lightbox-arrow right" aria-label="Next photo" onClick={e => { e.stopPropagation(); nextPhoto(1); }}><ArrowRight /></button>
        </motion.div>}
      </AnimatePresence>
    </main>
  );
}
