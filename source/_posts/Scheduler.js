class Scheduler {
  constructor () {
    this.count = 0
    this.waitQueue = [];
  }
  add(promiseCreator) {
      if (this.count < 2) {
          this.count += 1;
          return this.run(promiseCreator)
      } else {
          return new Promise(resolve => {
              this.waitQueue.push(() => promiseCreator().then(resolve));
          })
      }
  }
  run(promiseCreator) {
      return promiseCreator().then(() => {
          this.count -= 1;
          if (this.waitQueue.length) {
              this.run(this.waitQueue.shift())
          }
      });
  }
}
const timeout = (time) => new Promise(resolve => {
  setTimeout(resolve, time)
})
const scheduler = new Scheduler();

const addTask = (time, order) => {
  scheduler.add(() => timeout(time)).then(() => console.log(time, 'time, order', order))
}

addTask(1000, '1');
addTask(500, '2');
addTask(300, '3');
addTask(400, '4');
// output: 2 3 1 4
// 一开始，1、2两个任务进入队列
// 500ms时，2完成，输出2，任务3进队
// 800ms时，3完成，输出3，任务4进队
// 1000ms时，1完成，输出1
// 1200ms时，4完成，输出4

var a = {n:10};
function out(obj){
    var b = obj;
    var c = b;
    b.n = 30;
    c = {n : 40};
    console.log(a.n);
    console.log(b.n);
    console.log(c.n);
}
out(a)
