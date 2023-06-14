import clsx from 'clsx';
import CardGame from '../card-game/card-game';
import { useWindowSize } from '@/hooks';
import { chunk } from '@/lib/utils/chunk';

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
  const { width } = useWindowSize();

  return (
    <section className="mt-8">
      <p className="mb-4 block font-bold uppercase underline decoration-primary underline-offset-4">
        Top Up Game
      </p>

      {width &&
        width < 786 &&
        chunk(games, 3).map((chunk, i) => {
          return (
            <div
              className="flex items-center justify-center gap-4"
              key={`chunk-${i}`}
            >
              {chunk.map((game) => (
                <CardGame
                  key={game.id}
                  thumbnail={game.thumbnail}
                  title={game.title}
                  className="flex-1"
                />
              ))}
            </div>
          );
        })}

      {width &&
        width >= 786 &&
        chunk(games, 6).map((chunk, i) => {
          return (
            <div
              className="flex items-center justify-center gap-4"
              key={`chunk-${i}`}
            >
              {chunk.map((game) => (
                <CardGame
                  key={game.id}
                  thumbnail={game.thumbnail}
                  title={game.title}
                />
              ))}
            </div>
          );
        })}
    </section>
  );
}
