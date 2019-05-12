export default new class NotificationsStore{
  constructor() {
    this.state = {
      count: 0
    }
  }

  increment() {
    this.state.count++;
  }

  decrement() {
    this.state.count--;
  }
}