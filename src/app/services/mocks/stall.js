export default async (stallTime = 1000) => {
  await new Promise(resolve => setTimeout(resolve, stallTime));
}