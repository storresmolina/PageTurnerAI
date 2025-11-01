// Tell TypeScript that ?url imports exist and resolve to string
declare module "*?url" {
  const value: string;
  export default value;
}