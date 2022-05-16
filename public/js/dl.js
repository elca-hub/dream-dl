const ws = new WebSocket('ws://localhost:8080');

ws.onopen = () => {
  console.log('connected');
}

ws.onmessage = (event) => {
  console.log(event);
}