import CardGame from '../card-game/card-game';

const games = [
  {
    id: 1,
    title: 'Mobile Legends',
    thumbnail:
      'https://play-lh.googleusercontent.com/X4CgS6NWW7Q4YbiJP-PEqCsxqxXxM3TtCUIjKebYOBX66-24KsN9-ruUPsE7MW63G2E=s256-rw',
  },
  {
    id: 2,
    title: 'PUBGM',
    thumbnail:
      'https://play-lh.googleusercontent.com/JRd05pyBH41qjgsJuWduRJpDeZG0Hnb0yjf2nWqO7VaGKL10-G5UIygxED-WNOc3pg=s256-rw',
  },
  {
    id: 3,
    title: 'Free Fire',
    thumbnail:
      'https://play-lh.googleusercontent.com/WWcssdzTZvx7Fc84lfMpVuyMXg83_PwrfpgSBd0IID_IuupsYVYJ34S9R2_5x57gHQ=s256-rw',
  },
];

export default function SectionTopUp() {
  return (
    <section className="mt-8">
      <p className="mb-4 block font-bold uppercase underline decoration-primary underline-offset-4">
        Top Up Game
      </p>

      <div className="grid grid-cols-3 justify-items-stretch gap-4 rounded-lg md:flex md:justify-center">
        {games.map((game, i) => (
          <CardGame
            title={game.title}
            thumbnail={game.thumbnail}
            key={`game-${i}`}
          />
        ))}
      </div>
    </section>
  );
}
