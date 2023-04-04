import CardGame from '../card-game/card-game';

const games = [
  {
    id: 1,
    title: 'Mobile Legends: Bang Bang',
    thumbnail: 'https://picsum.photos/150/150',
  },
  {
    id: 2,
    title: 'PUBGM',
    thumbnail: 'https://picsum.photos/150/150',
  },
  {
    id: 3,
    title: 'Free Fire',
    thumbnail: 'https://picsum.photos/150/150',
  },
];

export default function SectionTopUp() {
  return (
    <section className="mt-8">
      <p className="mb-4 block font-bold uppercase underline decoration-emerald-500 underline-offset-4">
        Top Up Game
      </p>

      <div className="grid grid-cols-2 justify-items-center gap-4 rounded-lg bg-emerald-200 p-4 md:grid-cols-4">
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
