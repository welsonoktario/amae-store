export const unslugify = (slug: string) =>
  slug.replace('-', ' ').replace(/(^\w|\s\w)/g, (text) => text.toUpperCase());
