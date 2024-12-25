class CalendarDay {
    id: string;
    date: Date;
    todos: string[];
  
    constructor(date: Date) {
      this.date = date;
      this.id = date.toISOString();
      this.todos = [];
    }
  
    addTodo(todo: string) {
      this.todos.push(todo);
    }
  
    removeTodo(index: number) {
      this.todos.splice(index, 1);
    }
  }
  