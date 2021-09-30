a = ['asdf'];

const b = () => {
  console.log(a);
  a.push('dsaf');
};
const c = func => {
  func();
};

a.push('something new');
console.log(a);
c(b);
b();
console.log(a);
