export const chunk = <T>(items: T[], size: number) =>
  items.reduce((chunks: T[][], item: T, index) => {
    const chunk = Math.floor(index / size);
    chunks[chunk] = ([] as T[]).concat(chunks[chunk] || [], item);

    return chunks;
  }, []);
