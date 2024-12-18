export async function fetchHelloMessage() {
  const response = await fetch('/api/hello');
  const data = await response.json();
  return data.message;
}