import EventHub from "../src/index";

type TestCase = (message: string) => void;
// 测试监听并且触发
const test1: TestCase = message => {
  const eventHub = new EventHub(); // EventHub 可以创建对象
  let called = false;
  // 监听
  eventHub.on("xxx", data => {
    called = true;
    console.log("called:", called);
    console.log("data:", data);
  });
  eventHub.emit("xxx", "data"); // 触发
  console.log(message);
};

// 测试触发之前断开监听
const test2: TestCase = message => {
  const eventHub = new EventHub();
  let called2 = false;
  const fn2 = () => {
    called2 = true;
  };
  eventHub.on("yyy", fn2);
  eventHub.off("yyy", fn2); // emit(触发)之前先 off(断开), on(监听)里面的 fn2 就不会执行
  eventHub.emit("yyy");
  setTimeout(() => {
    console.log("called2:", called2); // called2: false
    console.log(message);
  }, 1000);
};

test1("监听并且触发");
test2("emit(触发)之前先 off(断开), on(监听)里面的 fn2 就不会执行");
